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

app.listen(port, () => {
	console.log(port);
});

app.get("/", (req, res) => {
	res.status(200).send("Server running on port " + port);
});
