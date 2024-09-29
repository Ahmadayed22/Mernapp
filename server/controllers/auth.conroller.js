const User = require("../models/user.model")
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken")
require("dotenv").config()
const createToken = (user) => {
   return jwt.sign({ userId: user._id,IsAdmin:user.IsAdmin }, process.env.SECRET, { expiresIn: "3d" })
    
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
    const { email, password } = req.body;
    try {
        const user = await User.signIn(email, password);
        const { password: pass, ...rest } = user._doc; // separate password from information
        const token = createToken(user);
        // console.log("Generated Token:", token);
        res.status(200).cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        }).json(rest);


    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const google = async (req, res) => {
    const { name, email, googlePhotoUrl } = req.body;
    
    try {
        const user = await User.findOne({email})
        if (user) {
        const token = createToken(user);
         const { password: pass, ...rest } = user._doc; // separate password from information
        res.status(200).cookie("access_token", token, {
            httpOnly:true,
        }).json(rest)  
    }
    else {
    const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.IsAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = newUser._doc;
      res.status(200).cookie('access_token', token, {
          httpOnly: true,
        }).json(rest);
        }
     
    }
       catch (err) {
            res.status(400).json({error:err.message})
        }
    
}
module.exports = {SignUp,login,google}