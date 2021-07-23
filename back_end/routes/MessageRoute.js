const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Chat = require("../models/Chat");
const Profile = require("../models/Profile");
const authenticate = require("../services/TokenAuthentication");

// Read Message
router.post("/read/:chat_id/:message_id", authenticate, async (req, res) => {
	const chat = await Chat.findById(req.params.chat_id)
		.exec()
		.catch((err) => {
			console.log(err);
			res.status(500).send({ message: "Error: " + err });
		});
	var messageIndex = chat.messages.findIndex((message) => message._id === req.params.message_id);
	if (messageIndex && !chat.messages[messageIndex].readBy.includes(req.params.user_id))
		chat.messages[messageIndex].readBy.push(req.params.user_id);
	await chat.save();

	res.status(200).send({ message: "Message Read." });
});

// Edit Message
router.post("/edit/:chat_id/:message_id", authenticate, async (req, res) => {
	const chat = await Chat.findById(req.params.chat_id)
		.exec()
		.catch((err) => {
			console.log(err);
			res.status(500).send({ message: "Error: " + err });
		});
	var messageIndex = chat.messages.findIndex((message) => message._id.toString() === req.params.message_id);
	if (messageIndex && chat.messages[messageIndex] && chat.messages[messageIndex].user_id.toString() === req.body.user_id) {
		if (req.body.text) chat.messages[messageIndex].text = req.body.text;
		if (req.body.image) chat.messages[messageIndex].image = req.body.image;
	}
	await chat.save();

	let profile_ids = chat.participants.map((profile_id) => mongoose.Types.ObjectId(profile_id));
	const profiles = await Profile.find()
		.where("_id")
		.in(profile_ids)
		.exec()
		.catch((err) => {
			console.log(err);
			res.status(500).send({ message: "Error: " + err });
		});

	res.status(200).send({ message: "Message Edited.", chat: chat, participants: profiles });
});

// Delete Message
router.post("/delete/:chat_id/:message_id", authenticate, async (req, res) => {
	const chat = await Chat.findById(req.params.chat_id)
		.exec()
		.catch((err) => {
			console.log(err);
			res.status(500).send({ message: "Error: " + err });
		});
	var messageIndex = chat.messages.findIndex((message) => message._id === req.params.message_id);
	if (messageIndex) chat.messages.splice(messageIndex, 1);
	await chat.save();

	let profile_ids = chat.participants.map((profile_id) => mongoose.Types.ObjectId(profile_id));
	const profiles = await Profile.find()
		.where("_id")
		.in(profile_ids)
		.exec()
		.catch((err) => {
			console.log(err);
			res.status(500).send({ message: "Error: " + err });
		});

	res.status(200).send({ message: "Message Deleted.", chat: chat, participants: profiles });
});

// Send Message
router.post("/:id/", authenticate, async (req, res) => {
	const chat = await Chat.findById(req.params.id)
		.exec()
		.catch((err) => {
			console.log(err);
			res.status(500).send({ message: "Error: " + err });
		});
	req.body._id = new mongoose.Types.ObjectId();
	chat.messages.push(req.body);
	await chat.save();

	let profile_ids = chat.participants.map((profile_id) => mongoose.Types.ObjectId(profile_id));
	const profiles = await Profile.find()
		.where("_id")
		.in(profile_ids)
		.exec()
		.catch((err) => {
			console.log(err);
			res.status(500).send({ message: "Error: " + err });
		});

	res.status(200).send({ message: "Message Sent.", chat: chat, participants: profiles });
});

module.exports = router;
