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
			user_id: mongoose.Schema.Types.ObjectId,
			text: String,
			image: String,
			date: { type: Date, default: Date.now },
		},
	],
});

module.exports = mongoose.model("Chat", ChatSchema);
