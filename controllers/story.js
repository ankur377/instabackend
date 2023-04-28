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
}