const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Interest = require("../models/Interest");
const Profile = require("../models/Profile");
const authenticate = require("../services/TokenAuthentication");

// Get Interests
router.get("/", authenticate, async (req, res) => {
	const interests = await Interest.find()
		.exec()
		.catch((err) => {
			console.log(err);
			res.status(500).send({ message: "Error: " + err });
		});
	res.status(200).send(interests);
});

// Create Interest
router.post("/", authenticate, async (req, res) => {
	const interest = new Interest({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		banner: req.body.banner,
		description: req.body.description,
		popularity: req.body.popularity,
	});
	interest.save();

	res.status(200).send({ message: "New Interest Created.", interest_id: interest._id });
});

// Get Recommended Interests for User
router.get("/find-new/:user_id", authenticate, async (req, res) => {
	const user = await Profile.findById(req.params.user_id)
		.exec()
		.catch((err) => {
			console.log(err);
			res.status(500).send({ message: "Error: " + err });
		});
	const interests = await Interest.find()
		.where("_id")
		.nin(user.interests)
		.exec()
		.catch((err) => {
			console.log(err);
			res.status(500).send({ message: "Error: " + err });
		});
	res.status(200).send(interests);
});

// Get a Profile's Interests List
router.get("/profile-list/:id", authenticate, async (req, res) => {
	const profile = await Profile.findById(req.params.id)
		.exec()
		.catch((err) => {
			console.log(err);
			res.status(500).send({ message: "Error: " + err });
		});
	res.status(200).send(profile.interests);
});

// Get a List of Interests with all data
router.post("/get-all/", authenticate, async (req, res) => {
	if (!req.body.interests) return res.status(200).send({ message: "No Interests" });
	const interestPromises = req.body.interests.map(async (interest) => {
		var interest = await Interest.findById(interest)
			.exec()
			.catch((err) => {
				console.log(err);
				res.status(500).send({ message: "Error: " + err });
				return {};
			});
		return interest;
	});
	const interests = await Promise.all(interestPromises);
	res.status(200).send({ interests: interests });
});

// Get Interest by Id
router.get("/:id/", authenticate, async (req, res) => {
	const interest = await Interest.findById(req.params.id)
		.exec()
		.catch((err) => {
			console.log(err);
			res.status(500).send({ message: "Error: " + err });
		});
	res.status(200).send(interest);
});

module.exports = router;
