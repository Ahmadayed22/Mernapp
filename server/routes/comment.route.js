const express = require("express");
const { createComment ,getPostComment} = require("../controllers/comment.controller");
const verifyTokenn = require("../utils/verfiyUser");
const router = express.Router()

router.post('/create', verifyTokenn, createComment);
router.get('/getPostComments/:postId',  getPostComment);


module.exports = router