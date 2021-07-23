const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: {
		type: String,
		require: true,
		min: 1,
		max: 32,
	},
	icon: String,
	banner: String,
	participants: {
		type: [String],
		require: true,
	},
	messages: [
		{
			_id: mongoose.Schema.Types.ObjectId,
			user_id: mongoose.Schema.Types.ObjectId,
			text: [String],
			image: String,
			read_by: [mongoose.Schema.Types.ObjectId],
			date: { type: Date, default: Date.now },
		},
	],
	lastMessage: {
		nickname: String,
		text: String,
	},
});

module.exports = mongoose.model("Chat", ChatSchema);
