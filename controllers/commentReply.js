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
}