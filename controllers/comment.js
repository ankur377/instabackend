const db = require('../helper/database');
const { Comment } = require('../models/comment');


module.exports = {
    createComment: async (req, res) => {

        const newComment = new Comment({
            content: req.body.content,
        });
        try {
            const savedComment = await newComment.save();
            res.status(200).json(savedComment);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    replyComment: async (req, res) => {
        const content = req.body.content;
        const reply = new Comment({ content });
        // reply.save((err, reply) => {
        //     if (err) return res.send(err);
        //     Comment.findByIdAndUpdate(req.params.commentId, { $push: { replies: reply._id } }, { new: true }, (err, comment) => {
        //         if (err) return res.send(err);
        //         res.json(comment);
        //     }
        //     );
        // });
        reply.save().then((result) => {
            Comment.findByIdAndUpdate(req.params.commentId, { $push: { replies: result._id } }, (error, comment) => {
                if (error) {
                    res.send(error);
                }
                res.send(comment);
            });
        }).catch((error) => {
            res.send(error);
        })
    },
    getComment: async (req, res) => {
        Comment.find()
        .exec((err, comments) => {
          if (err) return res.send(err);
          res.json(comments);
        });
    },
    // deleteComment: async (req, res) => {
    //     try {
    //         const story = await Comment.findById(req.params.id);
    //         if (story.userId === req.body.userId) {
    //             await story.deleteOne();
    //             res.status(200).json("the story has been deleted");
    //         } else {
    //             res.status(403).json("You can delete only your story")
    //         }
    //     } catch (err) {
    //         res.status(500).json(err);
    //     }
    // },
    // likeDislike: async (req, res) => {
    //     try {
    //         const story = await Comment.findById(req.params.id);
    //         if (!story.likes.includes(req.body.userId)) {
    //             await story.updateOne({ $push: { likes: req.body.userId } });
    //             res.status(200).json("The story been liked");
    //         } else {
    //             await story.updateOne({ $pull: { likes: req.body.userId } });
    //             res.status(200).json("The story been disliked");
    //         }
    //     } catch (err) {
    //         res.status(500).json(err);
    //     }
    // },
}