const { Comment } = require('../models/comment');
const { Post } = require('../models/post');

module.exports = {
    comment: async (req, res) => {
        const content = req.body.content;
        const userId = req.user.user._id;
        const postId = req.params.id;
        const comment = new Comment({
            content: content,
            userId: userId,
            postID: postId
        });
        comment.save((err, comment) => {
            if (err) return res.send(err);
            res.json(comment);
        });
        const postComment = await Post.findById(postId);
        await postComment.updateOne({ $push: { comments: comment._id } });
    },
    reply: async (req, res) => {
        try {
            const content = req.body.content;
            const userId = req.user.user._id;
            const commentId = req.params.id;
            const reply = new Comment({
                content: content,
                userId: userId,
                parentId: commentId
            });
            await reply.save();
            const comment = await Comment.findByIdAndUpdate(
                commentId,
                { $push: { replies: reply._id } },
                { new: true }
            );
            res.json(comment);
        } catch (err) {
            res.status(500).send({ error: err.message });
        }
    },

    getComment: async (req, res) => {
        const getallComment = await Comment.find({}).populate({
            path: 'replies',
            populate: {
                path: 'replies',
                populate: {
                    path: 'replies',
                    populate: {
                        path: 'replies',
                        populate: {
                            path: 'replies',
                            populate: {
                                path: 'replies'
                            }
                        }
                    }
                }
            }
        });
        const filteredComments = getallComment.filter(comment => comment.postID != null);
        res.send(filteredComments);
    },

    likeDislike: async (req, res) => {
        try {
            const comment = await Comment.findById(req.params.id);
            if (!comment.likes.includes(req.user.user._id)) {
                await comment.updateOne({ $push: { likes: req.user.user._id } });
                res.status(200).json("The comment been liked");
            } else {
                await comment.updateOne({ $pull: { likes: req.user.user._id } });
                res.status(200).json("The comment been disliked");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }
}