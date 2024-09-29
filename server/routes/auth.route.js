const express = require("express");
const {login,google,SignUp} = require("../controllers/auth.conroller");
const verifyToken = require("../utils/verfiyUser");

const router = express.Router();

router.post("/signup", SignUp)
router.post("/signin", login)

router.post("/google",google )

module.exports = router;
// export default router