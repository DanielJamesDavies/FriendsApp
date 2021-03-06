const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");

const User = require("../models/User");
const Profile = require("../models/Profile");
const authenticate = require("../services/TokenAuthentication");

// Create New User
router.post("/", async (req, res) => {
	// User Register Input Validation
	const userSchema = Joi.object({
		username: Joi.string().min(1).max(32).required(),
		email: Joi.string().min(1).max(255).required().email(),
		password: Joi.string().min(6).max(255).required(),
	});
	const userValidationError = userSchema.validate(req.body.user).error;
	if (userValidationError) return res.status(200).send({ error: userValidationError });

	// Profile Register Input Validation
	const profileSchema = Joi.object({
		username: Joi.string().min(1).max(32).required(),
		nickname: Joi.string().min(1).max(32).required(),
		briefDescription: Joi.string().min(1).max(32).required(),
	});
	const profileToValidate = {
		username: req.body.user.username,
		nickname: req.body.profile.nickname,
		briefDescription: req.body.profile.briefDescription,
	};
	const profileValidationError = profileSchema.validate(profileToValidate).error;
	if (profileValidationError) return res.status(200).send({ error: profileValidationError });

	// Check if username is used
	const usernameUsed = await User.findOne({
		username: req.body.user.username,
	}).exec();

	// Check if email is used
	const emailUsed = await User.findOne({ email: req.body.user.email }).exec();

	// If username or email is used, return error
	if (usernameUsed || emailUsed) {
		var output = { error: {} };
		if (usernameUsed) output.error.usernameUsed = true;
		if (emailUsed) output.error.emailUsed = true;
		return res.status(200).send(output);
	}

	// Hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.user.password, salt);

	const profile_id = new mongoose.Types.ObjectId();

	// New user
	const user = new User({
		_id: new mongoose.Types.ObjectId(),
		username: req.body.user.username,
		email: req.body.user.email,
		password: hashedPassword,
		profile_id: profile_id,
	});
	user.save()
		.then((result) => {
			// New profile
			const profile = new Profile({
				_id: profile_id,
				username: req.body.user.username,
				nickname: req.body.profile.nickname,
				briefDescription: req.body.profile.briefDescription,
				fullDescription: req.body.profile.fullDescription,
				profilePicture: req.body.profile.profilePicture,
				banner: req.body.profile.banner,
			});
			profile
				.save()
				.then((result2) => {
					return res.status(200).send({ message: "User and Profile Created." });
				})
				.catch((err) => {
					console.log(err);
					return res.status(200).send({ message: "Error: " + err });
				});
		})
		.catch((err) => {
			console.log(err);
			return res.status(200).send({ message: "Error: " + err });
		});
});

// Login
router.post("/login", async (req, res) => {
	// Login Input Validation
	const schema = Joi.object({
		username: Joi.string().min(1).required(),
		password: Joi.string().min(6).required(),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(200).send({ error: error });

	// Check if user with username exists
	const user = await User.findOne({
		username: req.body.username,
	}).exec();
	if (!user) return res.status(200).send({ error: "There is no account with this username." });

	// Check if profile with username exists
	const profile = await Profile.findOne({
		_id: user.profile_id,
	}).exec();
	if (!profile) return res.status(200).send({ error: "This account has no profile." });

	// Check if password is correct
	const isCorrectPassword = await bcrypt.compare(req.body.password, user.password);
	if (!isCorrectPassword) return res.status(200).send({ error: "Incorrect Password." });

	// Create token
	const token = jwt.sign({ user_id: user._id }, process.env.TOKEN_SECRET);

	res.header("token", token).send({
		message: "Logged in.",
		token: token,
		id: user.profile_id,
		profilePicture: profile.profilePicture,
		favouriteFriends: profile.friendships.favourite,
	});
});

router.post("/username-available", authenticate, async (req, res) => {
	if (!req.body.username) return res.status(200).send({ error: "Username not found." });
	var usernameExists = await User.findOne({
		username: req.body.username,
	}).exec();
	if (usernameExists) return res.status(200).send({ error: "Username already taken." });
	return res.status(200).send({ message: "Username available." });
});

router.post("/change-username", authenticate, async (req, res) => {
	if (!req.body.username || req.body.username.split(" ").join("") === "") return res.status(200).send({ error: "Username not found." });
	var usernameExists = await User.findOne({
		username: req.body.username,
	}).exec();
	if (usernameExists) return res.status(200).send({ error: "Username already taken." });

	try {
		var { user_id } = jwt_decode(req.header("token"));
	} catch (error) {
		res.status(200).send({ error: "Authentication Error." });
	}
	var user = await User.findById(user_id)
		.exec()
		.catch((err) => {
			console.log(err);
			res.status(500).send({ message: "Error: " + err });
		});
	if (!user) return res.status(200).send({ error: "User not found." });

	const profile = await Profile.findById(user.profile_id)
		.exec()
		.catch((err) => {
			console.log(err);
			res.status(500).send({ message: "Error: " + err });
		});
	if (!profile) return res.status(200).send({ error: "Profile not found." });

	user.username = req.body.username;
	profile.username = req.body.username;
	if (user.username === profile.username) {
		user.save();
		profile.save();
	}

	res.status(200).send({ profile: profile });
});

module.exports = router;
