const express = require("express");
const { updateUser,deleteUser,signOut } = require("../controllers/user.controller");
const verifyToken = require("../utils/verfiyUser");

const router = express.Router();

router.get("/test", (req, res) => {
    res.send("Test route");
});

router.put('/update/:id', verifyToken, updateUser);

router.delete("/delete/:id", verifyToken,deleteUser)

router.post("/signout",signOut)

module.exports = router;
