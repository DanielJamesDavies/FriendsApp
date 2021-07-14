const port = 3001;
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(express.json());
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

app.listen(port, () => {
	console.log(port);
});

app.get("/", (req, res) => {
	res.status(200).send("Server running on port " + port);
});
