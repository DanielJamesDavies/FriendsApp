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
			return res.status(200).send({ message: "You are already friends with this user." });
		case "Request Sent":
			return res.status(200).send({ message: "A friend request has already been sent." });
		case "Request Received":
			user_sent.friendships.requests.received.splice(user_sent.friendships.requests.received.indexOf(user_received._id), 1);
			user_received.friendships.requests.sent.splice(user_received.friendships.requests.sent.indexOf(user_sent._id), 1);
			user_sent.friendships.friends.push(user_received._id);
			user_received.friendships.friends.push(user_sent._id);
			await user_sent.save();
			await user_received.save();
			return res.status(200).send({ message: "You are now friends." });
		case "Stranger":
			user_sent.friendships.requests.sent.push(user_received._id);
			user_received.friendships.requests.received.push(user_sent._id);
			await user_sent.save();
			await user_received.save();
			return res.status(200).send({ message: "A friend request has been sent." });
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
			if (user_sent.friendships.favourite.includes(user_received._id))
				user_sent.friendships.favourite.splice(user_sent.friendships.favourite.indexOf(user_received._id), 1);
			if (user_received.friendships.favourite.includes(user_sent._id))
				user_received.friendships.favourite.splice(user_received.friendships.favourite.indexOf(user_sent._id), 1);
			await user_sent.save();
			await user_received.save();
			return res.status(200).send({ message: "You are no longer friends with this user." });
		case "Request Sent":
			user_sent.friendships.requests.sent.splice(user_sent.friendships.requests.sent.indexOf(user_received._id), 1);
			user_received.friendships.requests.received.splice(user_received.friendships.requests.received.indexOf(user_sent._id), 1);
			await user_sent.save();
			await user_received.save();
			return res.status(200).send({ message: "A friend request has been removed." });
		case "Request Received":
			return res.status(200).send({ message: "A friend request has been received." });
		case "Stranger":
			return res.status(200).send({ message: "You are not friends with this user." });
	}
});

// Favourite Friend
router.post("/favourite/:user_sent/:user_received", authenticate, async (req, res) => {
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
	if (!user_sent.friendships.favourite.includes(user_received._id)) {
		user_sent.friendships.favourite.push(user_received._id);
		await user_sent.save();
		return res.status(200).send({ message: "Friend is now a favourite.", favouriteFriends: user_sent.friendships.favourite });
	} else {
		user_sent.friendships.favourite.splice(user_sent.friendships.favourite.indexOf(user_received._id), 1);
		await user_sent.save();
		return res.status(200).send({ message: "Friend is no longer a favourite.", favouriteFriends: user_sent.friendships.favourite });
	}
});

function FriendshipStatus(user1, user2) {
	if (user1.friendships.friends.includes(user2._id) || user2.friendships.friends.includes(user1._id)) {
		return "Friends";
	}
	if (user1.friendships.requests.sent.includes(user2._id) || user2.friendships.requests.received.includes(user1._id)) {
		return "Request Sent";
	}
	if (user1.friendships.requests.received.includes(user2._id) || user2.friendships.requests.sent.includes(user1._id)) {
		return "Request Received";
	}
	return "Stranger";
}

module.exports = router;
