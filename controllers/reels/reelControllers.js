const db = require('../../helper/database');
const fs = require('fs');
const { User } = require('../../models/index');
const { Reel } = require('../../models/index');
module.exports = {
    createReel: async (req, res) => {
        const newReel = new Reel({
            userId: req.body.userId,
            reel: req.file.path,
            desc: req.body.desc
        });
        try {
            const savedReel = await newReel.save();
            res.status(200).json(savedReel);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    deleteReel: async (req, res) => {
        try {
            const reel = await Reel.findById(req.params.id);
            if (reel.userId === req.body.userId) {
                await reel.deleteOne();
                res.status(200).json("the reel has been deleted");
            } else {
                res.status(403).json("You can delete only your reel")
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    likeDislike: async (req, res) => {
        try {
            const reel = await Reel.findById(req.params.id);
            if (!reel.likes.includes(req.body.userId)) {
                await reel.updateOne({ $push: { likes: req.body.userId } });
                res.status(200).json("The Reel been liked");
            } else {
                await reel.updateOne({ $pull: { likes: req.body.userId } });
                res.status(200).json("The Reel been disliked");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getReel: async (req, res) => {
        try {
            const reel = await Reel.findById(req.params.id);
            res.status(200).json(reel);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    timeLineReel: async (req, res) => {
        try {
            const currentUser = await User.findById(req.body.userId);
            const userReels = await Reel.find({ userId: currentUser._id });
            const friendReels = await Promise.all(
                currentUser.followings.map((friendId) => {
                    return Reel.find({ userId: friendId });
                })
            );
            res.json(userReels.concat(...friendReels))
        } catch (err) {
            res.status(500).json(err);
        }
    }
}