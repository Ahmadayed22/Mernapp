const express = require("express");
const { createComment } = require("../controllers/comment.controller");
const verifyTokenn = require("../utils/verfiyUser");
const router = express.Router()

router.post('/create', verifyTokenn, createComment);


module.exports = router