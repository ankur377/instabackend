const db = require('../../helper/database');
const fs = require('fs');
const { Post } = require('../../models/index');
const { User } = require('../../models/index');

module.exports = {
    createPost: async (req, res) => {
        let posts = [];
        req.files.forEach(element => {
            const file = {
                path: element.path
            }
            posts.push(file);
        });
        const newPost = new Post({
            userId: req.body.userId,
            img: posts,
            desc: req.body.desc
        });
        try {
            const savedPost = await newPost.save();
            res.status(200).json(savedPost);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    updatePost: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            if (post.userId === req.body.userId) {
                await post.updateOne({ $set: req.body });
                res.status(200).json("the post has been updated");
            } else {
                res.status(403).json("You can update only your post")
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    deletePost: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            if (post.userId === req.body.userId) {
                await post.deleteOne();
                res.status(200).json("the post has been deleted");
            } else {
                res.status(403).json("You can delete only your post")
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    likeDislike: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            if (!post.likes.includes(req.body.userId)) {
                await post.updateOne({ $push: { likes: req.body.userId } });
                res.status(200).json("The post been liked");
            } else {
                await post.updateOne({ $pull: { likes: req.body.userId } });
                res.status(200).json("The Post been disliked");
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
            const currentUser = await User.findById(req.body.userId);
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