const db = require('../helper/database');
const { Reply } = require('../models/index');
const { Comment } = require('../models/index');


module.exports = {
    createComment: async (req, res) => {
     
        const comment = await Comment.findById(req.params.id);
        const newReply = new Reply({
            userId: req.body.userId,
            replys: req.body.text,
        });
        try {
            const savedReply = await newReply.save();
            if(comment === null) {
                res.send('No comment');
            }else{
                if (!comment.replys.includes(req.body.userId)) {
                    await comment.updateOne({ $push: { comments: req.body.userId } });
                    res.status(200).json("user has been add comment successfully");
                }
            }
            res.status(200).json(savedReply);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    deleteComment: async (req, res) => {
        try {
            const story = await Reply.findById(req.params.id);
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
            const story = await Reply.findById(req.params.id);
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