const db = require('../helper/database');
const { Comment } = require('../models/index');


module.exports = {
    createComment: async (req, res) => {
     
        const newComment = new Comment({
            userId: req.body.userId,
            postid: req.params.id,
            desc: req.body.desc,
        });
        try {
            const savedComment = await newComment.save();
            res.status(200).json(savedComment);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    deleteComment: async (req, res) => {
        try {
            const story = await Comment.findById(req.params.id);
            if (story.userId === req.body.userId) {
                await story.deleteOne();
                res.status(200).json("the story has been deleted");
            } else {
                res.status(403).json("You can delete only your story")
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    likeDislike: async (req, res) => {
        try {
            const story = await Comment.findById(req.params.id);
            if (!story.likes.includes(req.body.userId)) {
                await story.updateOne({ $push: { likes: req.body.userId } });
                res.status(200).json("The story been liked");
            } else {
                await story.updateOne({ $pull: { likes: req.body.userId } });
                res.status(200).json("The story been disliked");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
}