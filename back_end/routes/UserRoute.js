const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { RegisterValidation, LoginValidation } = require("../Validation");

// Get all Users
router.get("/", (req, res) => {
	User.find()
		.then((result) => {
			if (result) {
				res.status(200).send(result);
			} else {
				res.status(404).send({ message: "Error: Users not Found" });
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send({ message: "Error: " + err });
		});
});

// Get User by Id
router.get("/:id", (req, res) => {
	User.findById(req.params.id)
		.exec()
		.then((result) => {
			if (result) {
				res.status(200).send(result);
			} else {
				res.status(404).send({ message: "Error: User not Found" });
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send({ message: "Error: " + err });
		});
});

// Create New User
router.post("/", async (req, res) => {
	// Register Input Validation
	const schema = Joi.object({
		username: Joi.string().min(1).required(),
		nickname: Joi.string().min(1).required(),
		email: Joi.string().min(1).required().email(),
		password: Joi.string().min(6).required(),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).send(error);

	// Check if username is used
	const usernameUsed = await User.findOne({
		username: req.body.username,
	}).exec();

	// Check if email is used
	const emailUsed = await User.findOne({ email: req.body.email }).exec();

	// If username or email is used, return error
	if (usernameUsed || emailUsed) {
		var output = { error: {} };
		if (usernameUsed) output.error.usernameUsed = true;
		if (emailUsed) output.error.emailUsed = true;
		return res.status(400).send(output);
	}

	// Hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	// New user
	const user = new User({
		_id: new mongoose.Types.ObjectId(),
		username: req.body.username,
		nickname: req.body.nickname,
		email: req.body.email,
		password: hashedPassword,
	});
	user.save()
		.then((result) => {
			return res.status(200).send({ message: "User Created." });
		})
		.catch((err) => {
			console.log(err);
			return res.status(500).send({ message: "Error: " + err });
		});
});

// Delete a User
router.delete("/:id", (req, res) => {
	User.deleteOne({ _id: req.params.id })
		.exec()
		.then((result) => {
			res.status(200).send({ message: "User Deleted." });
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send({ message: "Error: " + err });
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
	if (error) return res.status(400).send(error);

	// Check if user with username exists
	const user = await User.findOne({
		username: req.body.username,
	}).exec();
	if (!user)
		return res
			.status(400)
			.send({ error: "There is no account with this username." });

	// Check if password is correct
	const isCorrectPassword = await bcrypt.compare(
		req.body.password,
		user.password
	);
	if (!isCorrectPassword)
		return res.status(400).send({ error: "Incorrect Password." });

	res.send({ message: "Logged in." });
});

// Change Username
router.patch("/:id", (req, res) => {
	User.update({ _id: req.params.id }, { $set: req.body })
		.exec()
		.then((result) => {
			res.status(200).send({ message: "User Updated." });
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send({ message: "Error: " + err });
		});
});

module.exports = router;
