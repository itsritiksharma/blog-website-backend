require("dotenv").config();
const express = require("express");
// const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

// const User = require("./models/user");

const app = express();

const blogRoutes = require("./routes/blog");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");

// app.set("view engine", "ejs");
// app.set("views", "views");

const MONGODB_URI = process.env.MONGO_URI;
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Method", "GET, POST, DELETE, PUT, PATCH");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	// res.setHeader("Access-Control-Allow-Expose-Headers", "Set-Cookie");
	next();
});
// app.use(cors);

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use(blogRoutes);

app.listen(process.env.PORT || 8080, (err) => {
	if (err) {
		console.log("Error in spinning up the server")
		return
	}

	console.log("Server listening on port", process.env.PORT || 8080);
})

module.exports = app;
