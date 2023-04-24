const { Story } = require('../models/story');
const { User } = require('../models/auth');

module.exports = {
    createStory: async (req, res) => {
        let storys = [];
        const UserId = req.user.user._id;
        req.files.forEach(element => {
            const file = {
                fieldname: element.fieldname,
                originalname: element.originalname,
                encoding: element.encoding,
                mimetype: element.mimetype,
                destination: element.destination,
                filename: element.filename,
                path: element.path,
                size: element.size,
            }
            storys.push(file);
        });
        const newStory = new Story({
            userId: UserId,
            story: storys,
            isDeleted: false,
        });
        try {
            const savedStory = await newStory.save();
            const setStoryInUser = await User.findByIdAndUpdate(
                UserId,
                {
                    $push: {
                        stories: savedStory._id,
                    },
                    $addToSet: {
                        storiesMemories: savedStory._id,
                    },
                },
                { new: true }
            );
            res.status(200).json(savedStory);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getStory: async (req, res) => {
        try {
            const stories = await Story.find({ userId: req.user.user._id });
            res.send(stories);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    deleteStory: async (req, res) => {
        try {
            const story = await Story.findById(req.params.id);
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
            const story = await Story.findById(req.params.id);
            if (!story) {
                return res.status(404).json("Story Not Found");
            }
            if (!story.likes.includes(req.user.user._id)) {
                await story.updateOne({ $push: { likes: req.user.user._id } });
                res.status(200).json("The story been liked");
            } else {
                await story.updateOne({ $pull: { likes: req.user.user._id } });
                res.status(200).json("The story been disliked");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }
}