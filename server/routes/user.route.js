const express = require("express");
const { updateUser,deleteUser } = require("../controllers/user.controller");
const verifyToken = require("../utils/verfiyUser");

const router = express.Router();

router.get("/test", (req, res) => {
    res.send("Test route");
});

router.put('/update/:id',  updateUser);

router.delete("/delete/:id",deleteUser)

module.exports = router;
