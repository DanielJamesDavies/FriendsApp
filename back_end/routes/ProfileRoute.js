const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Profile = require("../models/Profile");
const Interest = require("../models/Interest");
const authenticate = require("../services/TokenAuthentication");

// Get Profile
router.get("/", authenticate, (req, res) => {
	if (req.query.username) {
		Profile.findOne({
			username: req.query.username,
		})
			.exec()
			.then((result) => {
				if (result) {
					return res.status(200).send(result);
				} else {
					return res.status(404).send({ message: "Error: Profile not Found" });
				}
			})
			.catch((err) => {
				console.log(err);
				return res.status(500).send({ message: "Error: " + err });
			});
	}
});

// Get all Profiles for Meet Page
router.get("/meet/:id/", authenticate, async (req, res) => {
	const user = await Profile.findById(req.params.id)
		.exec()
		.catch((err) => {
			console.log(err);
			res.status(500).send({ message: "Error: " + err });
		});
	const users = await Profile.find().where("_id").nin(user.friendships.friends).ne(req.params.id).exec();
	res.status(200).send(users);
});

// Get all Friends Profiles
router.get("/friends/:id", authenticate, async (req, res) => {
	const user = await Profile.findById(req.params.id)
		.exec()
		.catch((err) => {
			console.log(err);
			res.status(500).send({ message: "Error: " + err });
		});
	const favourites = await Profile.find().where("_id").in(user.friendships.favourite).exec();
	const nonFavourites = await Profile.find().where("_id").in(user.friendships.friends).nin(user.friendships.favourite).exec();
	const friends = favourites.concat(nonFavourites);
	res.status(200).send(friends);
});

// Get Multiple Profiles by Array of Ids
router.post("/get-multiple", authenticate, async (req, res) => {
	const profiles = await Profile.find().where("_id").in(req.body.ids).exec();
	res.status(200).send(profiles);
});

// Add interest to user profile
router.post("/add-interest/:user_id/:interest_id", authenticate, async (req, res) => {
	const profile = await Profile.findById(req.params.user_id)
		.exec()
		.catch((err) => {
			console.log(err);
			res.status(500).send({ message: "Error: " + err });
		});

	if (!profile) return res.status(404).send({ message: "Error: Profile not Found" });

	const interest = await Interest.findById(req.params.interest_id)
		.exec()
		.catch((err) => {
			console.log(err);
			res.status(500).send({ message: "Error: " + err });
		});

	if (!interest) return res.status(404).send({ message: "Error: Interest not Found" });

	if (!profile.interests) profile.interests = [];
	while (!profile.interests.includes(interest._id)) profile.interests.push(interest._id);
	profile.save();

	res.status(200).send({ profileInterests: profile.interests });
});

// Remove interest from user profile
router.post("/remove-interest/:user_id/:interest_id", authenticate, async (req, res) => {
	const profile = await Profile.findById(req.params.user_id)
		.exec()
		.catch((err) => {
			console.log(err);
			res.status(500).send({ message: "Error: " + err });
		});

	if (!profile) return res.status(404).send({ message: "Error: Profile not Found" });

	const interest = await Interest.findById(req.params.interest_id)
		.exec()
		.catch((err) => {
			console.log(err);
			res.status(500).send({ message: "Error: " + err });
		});

	if (!interest) return res.status(404).send({ message: "Error: Interest not Found" });

	if (!profile.interests) profile.interests = [];
	while (profile.interests.includes(interest._id)) {
		var interestIndex = profile.interests.findIndex((id) => id.toString() === interest._id.toString());
		if (interestIndex !== -1) profile.interests.splice(interestIndex, 1);
	}
	profile.save();

	res.status(200).send({ profileInterests: profile.interests });
});

// Get Profile by Id
router.get("/:id", authenticate, async (req, res) => {
	const profile = await Profile.findById(req.params.id)
		.exec()
		.catch((err) => {
			console.log(err);
			res.status(500).send({ message: "Error: " + err });
		});

	if (!profile) return res.status(404).send({ message: "Error: Profile not Found" });
	res.status(200).send({ profile: profile });
});

// Change Profile by Id
router.post("/:id", authenticate, async (req, res) => {
	const profile = await Profile.findById(req.params.id)
		.exec()
		.catch((err) => {
			console.log(err);
			res.status(500).send({ message: "Error: " + err });
		});
	if (!profile) return res.status(404).send({ message: "Error: Profile not Found" });

	if (req.body.nickname) profile.nickname = req.body.nickname;

	if (req.body.profilePicture) {
		var imageLength = req.body.profilePicture.split(",")[1].split("=")[0].length;
		var imageSize = Math.floor(imageLength - (imageLength / 8) * 2);
		if (imageSize <= 1500000) profile.profilePicture = req.body.profilePicture;
	}

	if (req.body.banner) {
		var imageLength = req.body.banner.split(",")[1].split("=")[0].length;
		var imageSize = Math.floor(imageLength - (imageLength / 8) * 2);
		if (imageSize <= 1500000) profile.banner = req.body.banner;
	}

	if (req.body.briefDescription) profile.briefDescription = req.body.briefDescription;
	if (req.body.fullDescription) profile.fullDescription = req.body.fullDescription;
	if (req.body.interests) {
		const interestPromises = req.body.interests
			.map(async (interest) => {
				const interestExists = await Interest.exists({ _id: interest });
				if (interestExists) return interest;
				return -1;
			})
			.filter((interest) => interest !== -1);
		profile.interests = await Promise.all(interestPromises);
	}

	Profile.updateOne({ _id: profile._id }, profile, { upsert: true }, (err) => {
		if (err) console.log(err);
	});

	res.status(200).send({ profile: profile });
});

module.exports = router;
