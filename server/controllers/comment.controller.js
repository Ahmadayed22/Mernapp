const Comment = require("../models/comment.model");

const createComment = async (req, res) => {
    try {
        const { content, postId, userId } = req.body;
        console.log(userId)
        console.log( req.user.id)
        if (userId !== req.user.userId) {
            res.status(403).json('You are not allowed to create this comment')
        }
        const newComment = new Comment({
            content,
            postId,
            userId
        })
        await newComment.save()
        // const newComment = await Comment.create({content, postId, userId})
        res.status(200).json(newComment);
    } catch (err) {
        res.status(403).json({error:`Wrong In Handel Create Comment  : ${err}`})
    }
} 

const getPostComment = async (req, res) => {
    const { PostId } = req.params.postId
    // console.log(id)
    try {
        const getComment = await Comment.find({PostId}).sort({createdAt:-1})
        res.status(200).json(getComment)
    } catch (error) {
        res.status(403).json({error:`fetch comment error : ${err}`})
    }
}

module.exports = {createComment,getPostComment}