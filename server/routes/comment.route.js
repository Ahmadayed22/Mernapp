const express = require("express");
const { createComment ,getPostComment,likeComment} = require("../controllers/comment.controller");
const verifyTokenn = require("../utils/verfiyUser");
const router = express.Router()

router.post('/create', verifyTokenn, createComment);
router.get('/getPostComments/:postId',  getPostComment);

router.put('/likeComment/:commentId', verifyTokenn,likeComment);

module.exports = router