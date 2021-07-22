const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const Chat = require("../models/Chat");
const Profile = require("../models/Profile");
const authenticate = require("../services/TokenAuthentication");

// Get Chats for Messages Page
router.get("/messages/:id/", authenticate, async (req, res) => {
	const user = await Profile.findById(req.params.id)
		.exec()
		.catch((err) => {
			console.log(err);
			res.status(500).send({ message: "Error: " + err });
		});
	const chats = await Chat.find().where("_id").in(user.chats).exec();
	res.status(200).send(chats);
});

// Get Chat
router.get("/:id/", authenticate, async (req, res) => {
	const chat = await Chat.findById(req.params.id)
		.exec()
		.catch((err) => {
			console.log(err);
			res.status(500).send({ message: "Error: " + err });
		});
	res.status(200).send(chat);
});

// Create Chat
router.post("/", authenticate, async (req, res) => {
	// Create Chat Input Validation
	const chatSchema = Joi.object({
		name: Joi.string().min(1).max(32).required(),
	});
	const chatValidationError = chatSchema.validate({
		name: req.body.name,
	}).error;
	if (chatValidationError) return res.status(200).send({ error: chatValidationError });

	const chat_id = new mongoose.Types.ObjectId();

	req.body.participants.forEach(async (participant_id) => {
		const participant = await Profile.findOne({
			_id: participant_id,
		}).exec();
		if (!participant) return res.status(200).send({ error: "A participant's profile was not found." });
		participant.chats.push(chat_id);
		await participant.save();
	});

	const chat = new Chat({
		_id: chat_id,
		name: req.body.name,
		icon: req.body.icon,
		banner: req.body.banner,
		participants: req.body.participants,
		messages: [],
	});
	chat.save();

	res.status(200).send({ message: "New Chat Created." });
});

module.exports = router;
