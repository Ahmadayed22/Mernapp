const User = require("../models/user.model")
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');


const updateUser = async (req, res) => {
    const { id } = req.params
    // if (req.user.userId !== id.split(":")[1]) {
        
    //     return res.status(404).json({error: 'No such workout'})
    // }
    if (!mongoose.Types.ObjectId.isValid(id.split(":")[1])) {
    return res.status(404).json({error: 'You are not allowed to updated this user'})
  }
    const { username, email, password,googlePhotoUrl } = req.body
    if (password < 6) {
           return res.status(404).json({error: 'Password must be at least 6 characters'}) 
    }
        const update = { username, email,googlePhotoUrl }
        const hash =  bcryptjs.hashSync(password, 10)
        update.password = hash
    try {
        
        const user = await User.findByIdAndUpdate({ _id: id.split(":")[1] }, update,{ new: true })
        const {password,...rest} = user._doc
            res.status(200).json({rest})
        
    } catch (error) {
        
        res.status(400).json({error:"Failed to Update"})
        }

}


const deleteUser = async (req, res) => {
    const { id } = req.params;
    const userId = id.split(":")[1];

    if (!userId) {
        return res.status(400).json({ error: "Invalid user ID format" });
    }

    // if (await User._id !== userId) {
    //     console.log(User._id ,userId)
    //     return res.status(403).json({ error: "You are not allowed to delete this account" });
    // }

    try {
        const user = await User.findByIdAndDelete({_id:userId});
        return res.status(200).json("User has been deleted");
    } catch (error) {
        // console.error(error);
        return res.status(500).json({ error: "Failed to delete the account" });
    }
};

const signOut = (req, res) => {
   try {
     res.clearCookie('access_token').status(200).json('User has been signed out')
   } catch (error) {
    res.status(401).json({error: "Failed to SingOut"})
    }
    
}
module.exports ={updateUser,deleteUser,signOut};