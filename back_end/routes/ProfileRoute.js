const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Profile = require("../models/Profile");
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

// Get Profile by Id
router.get("/:id", authenticate, (req, res) => {
	Profile.findById(req.params.id)
		.exec()
		.then((result) => {
			if (result) {
				res.status(200).send(result);
			} else {
				res.status(404).send({ message: "Error: Profile not Found" });
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send({ message: "Error: " + err });
		});
});

module.exports = router;
