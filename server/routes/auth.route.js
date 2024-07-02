const express = require("express");
const signup = require("../controllers/auth.conroller");
const router = express.Router();

router.post("/signup", signup)

module.exports = router;