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
	var messageIndex = chat.messages.findIndex((message) => message._id.toString() === req.params.message_id);
	if (messageIndex !== -1 && chat.messages[messageIndex] && !chat.messages[messageIndex].read_by.includes(req.body.user_id))
		chat.messages[messageIndex].read_by.push(req.body.user_id);
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
	var message = {};
	if (messageIndex !== -1 && chat.messages[messageIndex] && chat.messages[messageIndex].user_id.toString() === req.body.user_id) {
		if (req.body.text) chat.messages[messageIndex].text = req.body.text;
		if (req.body.image) chat.messages[messageIndex].image = req.body.image;
		message = chat.messages[messageIndex];
	}
	await chat.save();

	res.status(200).send({ message: message });
});

// Delete Message
router.post("/delete/:chat_id/:message_id", authenticate, async (req, res) => {
	const chat = await Chat.findById(req.params.chat_id)
		.exec()
		.catch((err) => {
			console.log(err);
			res.status(500).send({ message: "Error: " + err });
		});
	var messageIndex = chat.messages.findIndex((message) => message._id.toString() === req.params.message_id);
	var message = {};
	if (messageIndex !== -1 && chat.messages[messageIndex] && chat.messages[messageIndex].user_id.toString() === req.body.user_id) {
		message = chat.messages.splice(messageIndex, 1)[0];
	}
	await chat.save();

	res.status(200).send({ message: message });
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
	var message = {};
	message = chat.messages.find((e) => e._id === req.body._id);

	let profile_ids = chat.participants.map((profile_id) => mongoose.Types.ObjectId(profile_id));
	const profiles = await Profile.find()
		.where("_id")
		.in(profile_ids)
		.exec()
		.catch((err) => {
			console.log(err);
			res.status(500).send({ message: "Error: " + err });
		});

	res.status(200).send({ message: message, chat: chat, participants: profiles });
});

module.exports = router;
