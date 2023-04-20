const { Story } = require('../models/story');
var cron = require('node-cron');
const moment = require("moment");

module.exports = {
    createStory: async (req, res) => {
        let storys = [];
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
            userId: req.user.user._id,
            story: storys,
        });
        try {
            const savedStory = await newStory.save();
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