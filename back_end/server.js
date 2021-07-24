const port = 3001;
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(express.json({ limit: "500mb" }));
app.use(cors());

// Mongoose Connection
mongoose
	.connect(process.env.URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((res) => {
		console.log("Connected to MongoDB");
	});

// User Routes
const userRoute = require("./routes/UserRoute");
app.use("/user", userRoute);

// Profile Routes
const profileRoute = require("./routes/ProfileRoute");
app.use("/profile", profileRoute);

// Friendship Routes
const friendshipRoute = require("./routes/FriendshipRoute");
app.use("/friendship", friendshipRoute);

// Chat Routes
const chatRoute = require("./routes/ChatRoute");
app.use("/chat", chatRoute);

// Message Routes
const messageRoute = require("./routes/MessageRoute");
app.use("/message", messageRoute);

const server = app.listen(port, () => {
	console.log("Listening on port: " + port);
});

const Chat = require("./models/Chat");
const Profile = require("./models/Profile");

const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		transports: ["websocket", "polling"],
		credentials: true,
	},
	allowEIO3: true,
});

io.on("connection", (socket) => {
	var date = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toUTCString();
	console.log(date + " | socket.io connected established.");
	// Message Update
	socket.on("send-message", ({ message, chat_id }) => {
		io.emit("receive-sent-message", message);
		chatUpdate(chat_id);
	});
	socket.on("edit-message", ({ message, chat_id }) => {
		io.emit("receive-edited-message", message);
		chatUpdate(chat_id);
	});
	socket.on("delete-message", ({ message, chat_id }) => {
		io.emit("receive-deleted-message", message);
		chatUpdate(chat_id);
	});
});

async function chatUpdate(chat_id) {
	const chat = await Chat.findById(chat_id)
		.exec()
		.catch((err) => {
			console.log(err);
			res.status(500).send({ message: "Error: " + err });
		});

	if (chat.messages.length !== 0) {
		var profile = await Profile.findById(chat.messages[chat.messages.length - 1].user_id)
			.exec()
			.catch((err) => {
				console.log(err);
				res.status(500).send({ message: "Error: " + err });
			});
		var text = "";
		if (chat.messages[chat.messages.length - 1].text.length > 0) text = chat.messages[chat.messages.length - 1].text[0];
		chat.lastMessage = { nickname: profile.nickname, text: text };
	}

	io.emit("receive-chat-update", chat);
}
