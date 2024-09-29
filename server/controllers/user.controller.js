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
    // const userId = id.split(":")[1];
    
    if (!id) {
        return res.status(400).json({ error: `Invalid user ID format ${id}` });
    }

    if ( !req.user.IsAdmin) {
       
        return res.status(403).json({ error: "You are not allowed to delete this account" });
    }

    try {
         await User.findByIdAndDelete({_id:id});
        return res.status(200).json("User has been deleted");
    } catch (err) {
        // console.error(error);
        return res.status(500).json({ error: `Failed to delete the account ${err}` });
    }
};

const signOut = (req, res) => {
   try {
     res.clearCookie('access_token').status(200).json('User has been signed out')
   } catch (error) {
    res.status(401).json({error: "Failed to SingOut"})
    }
    
}

const getusers = async (req,res) => {
    if (!req.user.IsAdmin) {
        return res.status(401).json({ error: "You are not authorized to get users" });
    }
    try {
        const startIndex = parseInt(req.query.startIndex , 10) || 0
        const limit = parseInt(req.query.limit, 10) || 9
        const sortDirection = req.query.sort === 'asc' ? 1 : -1;
        const users = await User.find({}).skip(startIndex).limit(limit).sort({ createdAt: sortDirection });
        const totalUsers = await User.countDocuments();
        const userWithoutPassword = users.map((user) => {
            const { password, ...rest } = user._doc;
            return rest;
        });
        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );
        const lastMonthUsers = await User.countDocuments({
            createdAt:{$gte:oneMonthAgo}
        })
        res.status(200).json({users:userWithoutPassword,totalUsers,lastMonthUsers});
    } catch (err) {
        res.status(500).json({error: `Failed to get users ${err}`})
    }

}

const getUser = async (req, res) => {
    // console.log(req.params.userId)
    // const {userid} = req.params.userId
    try {
        const user = await User.findById(req.params.userId)
        // console.log(user)
        if (!user) {
        return res.status(500).json(`User Not Found`)
        }
        const { password, ...rest } = user._doc;
          res.status(200).json(rest);
    } catch (err) {
        res.status(500).json({error: `Failed to get user ${err}`})
    }
}
module.exports ={updateUser,deleteUser,signOut,getusers,getUser};