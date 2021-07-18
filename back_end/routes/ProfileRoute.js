const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Profile = require("../models/Profile");
const authenticate = require("./TokenAuthentication");

// Get all Profiles
router.get("/", authenticate, (req, res) => {
	Profile.find()
		.then((result) => {
			if (result) {
				res.status(200).send(result);
			} else {
				res.status(404).send({ message: "Error: Profiles not Found" });
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send({ message: "Error: " + err });
		});
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
