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

module.exports = router;
