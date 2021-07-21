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
	profilePicture: {
		type: String,
		require: true,
	},
	banner: {
		type: String,
		require: true,
	},
	friendships: {
		friends: {
			type: [mongoose.Schema.Types.ObjectId],
		},
		favouriteFriends: {
			type: [mongoose.Schema.Types.ObjectId],
		},
		friendRequests: {
			sent: {
				type: [mongoose.Schema.Types.ObjectId],
			},
			received: {
				type: [mongoose.Schema.Types.ObjectId],
			},
		},
	},
});

module.exports = mongoose.model("Profile", ProfileSchema);
