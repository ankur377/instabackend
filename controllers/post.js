const { Post } = require('../models/post');
const { User } = require('../models/auth');

module.exports = {
    createPost: async (req, res) => {
        let posts = [];
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
            posts.push(file);
        });
        const newPost = new Post({
            userId: UserId,
            post: posts,
            description: req.body.description
        });
        try {
            const savedPost = await newPost.save();
            const setPostinUser = await User.findByIdAndUpdate(
                UserId,
                { $push: { totalposts: savedPost._id } },
                { new: true }
            );
            res.status(200).json(savedPost);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    updatePost: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            if (post.userId === req.user.user._id) {
                await post.updateOne({ $set: req.body });
                res.status(200).json("the post has been updated");
            } else {
                res.status(403).json("You can update only your post")
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getPost: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            res.status(200).json(post);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    timeLinePost: async (req, res) => {
        try {
            const currentUser = await User.findById(req.user.user._id);
            const userPosts = await Post.find({ userId: currentUser._id });
            const friendPosts = await Promise.all(
                currentUser.followings.map((friendId) => {
                    return Post.find({ userId: friendId });
                })
            );
            res.json(userPosts.concat(...friendPosts))
        } catch (err) {
            res.status(500).json(err);
        }
    }
}