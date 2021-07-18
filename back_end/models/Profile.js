const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	username: {
		type: String,
		require: true,
		min: 1,
		max: 32,
	},
	nickname: {
		type: String,
		require: true,
		min: 1,
		max: 32,
	},
	shortDescription: {
		type: String,
		require: true,
		min: 1,
		max: 32,
	},
	description: {
		type: [String],
	},
	profilePicture: {
		type: String,
		require: true,
	},
	backgroundImage: {
		type: String,
		require: true,
	},
});

module.exports = mongoose.model("Profile", ProfileSchema);
