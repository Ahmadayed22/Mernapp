const express = require("express");
const { createComment ,getPostComment,likeComment,deleteComment,editComment,getcomments} = require("../controllers/comment.controller");
const verifyTokenn = require("../utils/verfiyUser");
const router = express.Router()

router.post('/create', verifyTokenn, createComment);
router.get('/getPostComments/:postId',  getPostComment);
router.put('/likeComment/:commentId', verifyTokenn,likeComment);
router.put('/editComment/:commentId', verifyTokenn,editComment);
router.delete('/deleteComment/:commentId', verifyTokenn, deleteComment);
router.get('/getcomments', verifyTokenn, getcomments);
module.exports = router