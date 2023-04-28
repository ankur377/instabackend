const { Post } = require('../models/post');
const { Story } = require('../models/story');
const { Comment } = require('../models/comment');

module.exports = {
    action: async (req, res, modelName, actionType) => {
        const paramId = req.params.id;
        const userId = req.user.user._id;
        try {
            let item;
            switch (modelName) {
                case 'POST':
                    item = await Post.findById(paramId);
                    break;
                case 'STORY':
                    item = await Story.findById(paramId);
                    break;
                case 'COMMENT':
                    item = await Comment.findById(paramId);
                    break;
                default:
                    res.status(400).json("Invalid model name This Model Dose not Exists");
                    return;
            }
            if (actionType === 'Like') {
                if (!item.likes.includes(userId)) {
                    await item.updateOne({ $push: { likes: userId } });
                    res.status(200).json(`The ${modelName.toLowerCase()} has been liked`);
                } else {
                    await item.updateOne({ $pull: { likes: userId } });
                    res.status(200).json(`The ${modelName.toLowerCase()} has been disliked`);
                }
            }
            if (actionType === 'Delete') {
                if (item.userId === userId) {
                    await item.deleteOne();
                    res.status(200).json(`The ${modelName.toLowerCase()} has been deleted`);
                } else {
                    res.status(403).json(`You can delete only your post`);
                }
            }
            if (actionType === 'Get') {
                const modelType = modelName.charAt(0) + modelName.slice(1).toLowerCase();
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
