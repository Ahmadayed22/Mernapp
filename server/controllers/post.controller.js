const Post = require("../models/post.model")

const create =async (req, res) => {
    console.log(req.user)
    if (!req.user.IsAdmin) {
        res.status(401).json({error: "You are Not the admin"})
    }
    if (!req.body.title || !req.body.content) {
        res.status(401).json({error: "Please provide all required fields"})
    }

    const slug = req.body.title.split(" ").join("-").toLowerCase().replace(/[^a-zA-Z0-9-]/g, "")
    const newPost = new Post({
        ...req.body,
        slug,
        userId:req.user.userId
    })
    try {
        const savedPost = await newPost.save()
         res.status(201).json(savedPost)
    } catch (err) {
       res.status(401).json ({error: err})
    }
}

module.exports = create