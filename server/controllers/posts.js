const postsFilePath = "../routes/posts.js";
const createPostFilePath = "../routes/posts.js";
const fs = require("fs");
const { default: mongoose } = require("mongoose");
const PostMessage = require("../models/postMessage");

// users, whether logged in or not, will be able to see the posts
const getPosts = async (req, res) => {
	try {
		const postMessages = await PostMessage.find();

		console.log(postMessages);

		res.status(200).json(postMessages);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const getPost = async (req, res) => {
	const { id } = req.params;

	try {
		const post = await PostMessage.findById(id);

		res.status(200).json(post);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const createPost = async (req, res) => {
	const post = req.body;

	const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

	try {
		await newPostMessage.save();

		res.status(201).json(newPostMessage);
	} catch {
		res.status(409).json({ message: error.message });
	}
};

const updatePost = async (req, res) => {
	const { id: _id } = req.params;
	const post = req.body;

	if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that ID");

	const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

	res.json(updatedPost);
};

const deletePost = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that ID");

	await PostMessage.findByIdAndRemove(id);

	res.json({ message: "Post deleted successfully" });
};

const likePost = async (req, res) => {
	const { id } = req.params;

	if (!req.userId) {
		return res.json({ message: "Unauthenticated" });
	}

	if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

	const post = await PostMessage.findById(id);

	const index = post.likes.findIndex((id) => id === String(req.userId));

	if (index === -1) {
		post.likes.push(req.userId);
	} else {
		post.likes = post.likes.filter((id) => id !== String(req.userId));
	}
	const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
	res.status(200).json(updatedPost);
};

module.exports = { getPost, getPosts, createPost, updatePost, deletePost, likePost };
