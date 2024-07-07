const User = require("../models/user.model")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const createToken = (id) => {
   return jwt.sign({ userId: id }, process.env.SECRET, { expiresIn: "3d" })
    
}
const SignUp = async (req, res) => {
    const { email, password, username } = req.body
    try {
        const user = await User.signup(email, password, username)
        res.status(200).json({user})
    }
    catch (err) {
        res.status(400).json({error : err.message})
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.signIn(email, password)
        const { password: pass, ...rest } = user._doc; // separate password from information
        const token = createToken(user._id)
        // res.status(200).json({rest,token})
        res.status(200).cookie("access_token", token, {
            httpOnly: true,
        }).json(rest)
    } catch (err) {
           res.status(400).json({error : err.message})
    }
}
module.exports = {SignUp,login}