const express = require("express");
const { updateUser } = require("../controllers/user.controller");
const verifyToken = require("../utils/verfiyUser");

const router = express.Router();

router.get("/test", (req, res) => {
    res.send("Test route");
});
router.put('/:id', verifyToken, updateUser);

module.exports = router;
