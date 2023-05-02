const { Post } = require('../models/post');
const { Story } = require('../models/story');
const { Comment } = require('../models/comment');
const models = {
    post: Post,
    story: Story,
    comment: Comment
}
module.exports = {
    action: async (req, res, modelName, actionType) => {
        const paramId = req.params.id;
        const userId = req.user.user._id;
        try {
            let item;
            const modelType = models[modelName.toLowerCase()];
            item = await modelType.findById(paramId);
            if (actionType === 'Like') {
                const actions = item.likes.includes(userId) ? '$pull' : '$push';
                await item.updateOne({ [actions]: { likes: userId } });
                const responseMessage = `The ${modelName.toLowerCase()} has been ${actions === '$push' ? 'liked' : 'disliked'}`;
                return res.status(200).json({ message: responseMessage });
            }

            if (actionType === 'Delete') {
                if (item.userId === userId) {
                    await item.deleteOne();
                    res.status(200).json(`The ${modelType.toLowerCase()} has been deleted`);
                } else {
                    res.status(403).json(`You can delete only your post`);
                }
            }
            if (actionType === 'Get') {
                try {
                    const user = await modelType.find();
                    return res.status(200).json({
                        message: user
                    });
                } catch (err) {
                    return res.status(500).json({
                        message: err
                    });
                }
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
}
