const express = require("express")
const router = express.Router();
const {create,getposts, deletepost} = require("../controllers/post.controller");
const verifyToken = require("../utils/verfiyUser");

router.post("/create", verifyToken,create)
router.get('/getposts',getposts)
router.delete('/deletepost/:postId/:userId',verifyToken,deletepost)
module.exports = router