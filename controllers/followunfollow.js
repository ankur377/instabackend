const db = require('../helper/database');
const { User } = require('../models/auth');

module.exports = {
    followunfollowController: async (req, res) => {
        const followId = req.params.id;
        const logUser = req.user.user._id;
        if (followId == null || followId == undefined || followId == '') {
            res.status(500).json("Please Provide a User Id");
        }
        if (logUser !== followId) {
            try {
                const user = await User.findById(followId);
                if (!user) {
                    res.status(404).json("User Not Found");
                } else {

                    const currentUser = await User.findById(logUser);
                    if (!user.followers.includes(logUser)) {
                        await user.updateOne({ $push: { followers: logUser } });
                        await currentUser.updateOne({ $push: { followings: followId } });
                        res.status(200).json(`You are followed ${user.email}`);
                    } else {
                        await user.updateOne({ $pull: { followers: logUser } });
                        await currentUser.updateOne({ $pull: { followings: followId } });
                        res.status(200).json(`You are unfollowed ${user.email}`);
                    }
                }
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(403).json("You can Never follow yourself");
        }
    },


}