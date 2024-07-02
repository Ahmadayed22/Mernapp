const User = require("../models/user.model")
const SignUp = async (req, res) => {
    const { email, password, username } = req.body
    try {
        const user = await User.signup(email, password, username)
        res.status(200).json({user})
    }
    catch (err) {
        res.status(400).json({err : err.message})
    }
}
module.exports = SignUp