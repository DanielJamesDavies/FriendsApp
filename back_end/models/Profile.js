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
	bio: {
		type: String,
		require: true,
		min: 1,
		max: 32,
	},
	description: {
		type: [String],
	},
});

module.exports = mongoose.model("Profile", ProfileSchema);
