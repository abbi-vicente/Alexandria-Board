const express = require("express");
const posts = require("../controllers/posts");
const getPost = require("../controllers/posts");
const getPosts = require("../controllers/posts");
const createPost = require("../controllers/posts");
const updatePost = require("../controllers/posts");
const deletePost = require("../controllers/posts");
const likePost = require("../controllers/posts");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.get("/", posts.getPosts);
router.get("/:id", posts.getPost);
router.post("/", verifyToken, posts.createPost);
router.patch("/:id", verifyToken, posts.updatePost);
router.patch("/:id/likePost", verifyToken, posts.likePost);
router.delete("/:id", verifyToken, posts.deletePost);

module.exports = router;
