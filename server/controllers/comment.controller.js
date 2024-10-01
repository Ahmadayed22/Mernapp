const Comment = require("../models/comment.model");

const createComment = async (req, res) => {
    try {
        const { content, postId, userId } = req.body;
        // console.log(userId)
        // console.log( req.user.userId)
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

const likeComment = async (req, res) => {
   
    try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(403).json(`Comment not found`)
        }
       
        const userIndex = comment.likes.indexOf(req.user.userId);
        // console.log(userIndex)
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.userId);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    res.status(200).json(comment);
  } catch (err) {
    res.status(403).json({error:`Like comment error : ${err}`})
  }
}

const editComment = async (req, res) => {
   
    try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(403).json(`Comment not found`)
        }
        if (comment.userId !== req.user.userId && !req.user.IsAdmin) {
             return res.status(403).json(`You are not allowed to delete this comment`)
       }
        const editComment = await Comment.findByIdAndUpdate(
            req.params.commentId,
            {
                content:req.body.content
            }
            , { new: true })
    

    
    res.status(200).json(editComment);
  } catch (err) {
    res.status(403).json({error:`Like comment error : ${err}`})
  }
}

const deleteComment = async (req, res) => {
    try {
        const deleteComment = await Comment.findByIdAndDelete()
    } catch (error) {
        res.status(403).json({error:`delete comment error : ${err}`})
    }
}
module.exports = {createComment,getPostComment,likeComment,deleteComment,editComment}