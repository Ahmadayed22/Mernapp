const express = require("express")
const router = express.Router();
const {create,getposts} = require("../controllers/post.controller");
const verifyToken = require("../utils/verfiyUser");

router.post("/create", verifyToken,create)
router.get('/getposts',getposts)

module.exports = router