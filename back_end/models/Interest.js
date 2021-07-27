const mongoose = require("mongoose");

const InterestSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: {
		type: String,
		require: true,
		min: 1,
		max: 64,
	},
	banner: String,
	description: {
		type: [String],
	},
	popularity: String,
});

module.exports = mongoose.model("Interest", InterestSchema);
