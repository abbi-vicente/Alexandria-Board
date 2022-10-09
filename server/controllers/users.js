const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const existingUser = await User.findOne({ email });

		if (!existingUser) return res.status(404).json({ message: "User doesn't exist." });

		const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

		if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials." });

		const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, "secretKey");

		res.status(200).json({ result: existingUser, token });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong." });
	}
};

const signup = async (req, res) => {
	const { email, password, firstName, lastName } = req.body;

	try {
		const existingUser = await User.findOne({ email });

		if (existingUser) return res.status(400).json({ message: "User already exists." });

		const hashPassword = await bcrypt.hash(password, 12);

		const result = await User.create({ email, password: hashPassword, name: `${firstName} ${lastName}` });

		const token = jwt.sign({ email: result.email, id: result._id }, "secretKey");

		res.status(200).json({ result, token });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong." });
	}
};

module.exports = { login, signup };
