const Post = require("../models/post.model")

const create =async (req, res) => {
    
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

const getposts = async (req, res) => {
   
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        const posts = await Post.find({
            ...(req.query.userId && { userId: req.query.userId }),
            ...(req.query.category && { category: req.query.category }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.postId && { _id: req.query.postId }),
            ...(req.query.searchTerm && {
                $or: [
                    { title: { $regex: req.query.searchTerm, $options: 'i' } },
                    { content: { $regex: req.query.searchTerm, $options: 'i' } },
                ]
            }),
        }).sort({ updatedAt: sortDirection }).skip(startIndex).limit(limit);

        const totalPosts = await Post.countDocuments();
        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );
        const lastMonthPosts = await Post.countDocuments({
            createdAt:{$gte:oneMonthAgo}
        })

        res.status(200).json({
            posts,
            totalPosts,
            lastMonthPosts
        })
    } catch (error) {
        res.status(401).json ({error: err})
    }
}


const deletepost = async (req, res) => {
    if (!req.user.IsAdmin ) {
         res.status(400).json({error:`you are not allowed to delete this post`})
    }
    try {
        await Post.findByIdAndDelete(req.params.postId);
        res.status(200).json("The post has been deleted")
    } catch (error) {
        res.status(400).json({error:`Post Can't be deleted ${error}`})
    }
}


const updatepost =async (req, res) => {
    const { postId } = req.params;
    const { title, content, category } = req.body;
    //     if (!req.user.IsAdmin) {
    //     return res.status(401).json({ error: "You are not authorized to update this post" });
    // }
    try {
        
        const updateFiels = { title, content, category };
        if (title) {
            updateFiels.slug = title.split(" ").join("-").toLowerCase().replace(/[^a-zA-Z0-9-]/g, "");
        }
        const updatedPost = await Post.findByIdAndUpdate(postId, updateFiels, { new: true })
          if (!updatedPost) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(400).json({ error: `Unable to update the post: ${error.message}` });
    }
 
}
module.exports = {create,getposts,deletepost,updatepost}