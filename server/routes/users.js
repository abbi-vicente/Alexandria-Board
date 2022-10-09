const express = require("express");
const users = require("../controllers/users");
const login = require("../controllers/users");
const signup = require("../controllers/users");

const router = express.Router();

router.post("/login", users.login);
router.post("/signup", users.signup);

module.exports = router;
