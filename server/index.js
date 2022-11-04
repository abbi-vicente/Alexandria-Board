const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/users");

const port = 8000;

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
	res.send("App is running");
});

// const CONNECTION_URL = "mongodb+srv://p6-mern:p6-mern123@cluster0.pqt4dgk.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 8000;

try {
	mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
} catch (e) {
	console.log(e.message);
}

app.use(cors());

app.listen(port, () => {
	console.log(`${PORT}`);
});
