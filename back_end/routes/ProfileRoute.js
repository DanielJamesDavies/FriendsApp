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

// Get Profile by Id
router.get("/:id", authenticate, async (req, res) => {
	const profile = await Profile.findById(req.params.id)
		.exec()
		.catch((err) => {
			console.log(err);
			res.status(500).send({ message: "Error: " + err });
		});

	if (!profile) return res.status(404).send({ message: "Error: Profile not Found" });
	if (!profile.interests) return res.status(200).send({ profile: profile, interests: [] });

	const interestPromises = profile.interests.map(async (interest) => {
		var interest = await Interest.findById(interest)
			.exec()
			.catch((err) => {
				console.log(err);
				res.status(500).send({ message: "Error: " + err });
			});
		return interest;
	});
	const interests = await Promise.all(interestPromises);

	res.status(200).send({ profile: profile, interests: interests });
});

module.exports = router;
