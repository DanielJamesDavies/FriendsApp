const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");
const authenticate = require("../services/TokenAuthentication");

// Add Friend
router.post("/request/:user_sent/:user_received", authenticate, async (req, res) => {
	const user_sent = await Profile.findById(req.params.user_sent)
		.exec()
		.catch((err) => {
			console.log(err);
			res.status(500).send({ message: "Error: " + err });
		});
	const user_received = await Profile.findById(req.params.user_received)
		.exec()
		.catch((err) => {
			console.log(err);
			res.status(500).send({ message: "Error: " + err });
		});
	switch (FriendshipStatus(user_sent, user_received)) {
		case "Friends":
			return res.status(200).send({ Message: "You are already friends with this user." });
		case "Request Sent":
			return res.status(200).send({ Message: "A friend request has already been sent." });
		case "Request Received":
			user_sent.friendships.friendRequests.received.splice(user_sent.friendships.friendRequests.received.indexOf(user_received._id), 1);
			user_received.friendships.friendRequests.sent.splice(user_received.friendships.friendRequests.sent.indexOf(user_sent._id), 1);
			user_sent.friendships.friends.push(user_received._id);
			user_received.friendships.friends.push(user_sent._id);
			await user_sent.save();
			await user_received.save();
			return res.status(200).send({ Message: "You are now friends." });
		case "Stranger":
			user_sent.friendships.friendRequests.sent.push(user_received._id);
			user_received.friendships.friendRequests.received.push(user_sent._id);
			await user_sent.save();
			await user_received.save();
			return res.status(200).send({ Message: "A friend request has been sent." });
	}
});

// Remove Friend
router.post("/remove/:user_sent/:user_received", authenticate, async (req, res) => {
	const user_sent = await Profile.findById(req.params.user_sent)
		.exec()
		.catch((err) => {
			console.log(err);
			return res.status(500).send({ message: "Error: " + err });
		});
	if (!user_sent) return res.status(500).send({ message: "Error: user_sent not found." });
	const user_received = await Profile.findById(req.params.user_received)
		.exec()
		.catch((err) => {
			console.log(err);
			return res.status(500).send({ message: "Error: " + err });
		});
	if (!user_received) return res.status(500).send({ message: "Error: user_received not found." });
	switch (FriendshipStatus(user_sent, user_received)) {
		case "Friends":
			user_sent.friendships.friends.splice(user_sent.friendships.friends.indexOf(user_received._id), 1);
			user_received.friendships.friends.splice(user_received.friendships.friends.indexOf(user_sent._id), 1);
			if (user_sent.friendships.favouriteFriends.includes(user_received._id))
				user_sent.friendships.favouriteFriends.splice(user_sent.friendships.favouriteFriends.indexOf(user_received._id), 1);
			if (user_received.friendships.favouriteFriends.includes(user_sent._id))
				user_received.friendships.favouriteFriends.splice(user_received.friendships.favouriteFriends.indexOf(user_sent._id), 1);
			await user_sent.save();
			await user_received.save();
			return res.status(200).send({ Message: "You are no longer friends with this user." });
		case "Request Sent":
			user_sent.friendships.friendRequests.sent.splice(user_sent.friendships.friendRequests.sent.indexOf(user_received._id), 1);
			user_received.friendships.friendRequests.received.splice(user_received.friendships.friendRequests.received.indexOf(user_sent._id), 1);
			await user_sent.save();
			await user_received.save();
			return res.status(200).send({ Message: "A friend request has been removed." });
		case "Request Received":
			return res.status(200).send({ Message: "A friend request has been received." });
		case "Stranger":
			return res.status(200).send({ Message: "You are not friends with this user." });
	}
});

function FriendshipStatus(user1, user2) {
	if (user1.friendships.friends.includes(user2._id) || user2.friendships.friends.includes(user1._id)) {
		return "Friends";
	}
	if (user1.friendships.friendRequests.sent.includes(user2._id) || user2.friendships.friendRequests.received.includes(user1._id)) {
		return "Request Sent";
	}
	if (user1.friendships.friendRequests.received.includes(user2._id) || user2.friendships.friendRequests.sent.includes(user1._id)) {
		return "Request Received";
	}
	return "Stranger";
}

module.exports = router;
