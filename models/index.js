const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 6 },
    profilePicture: { type: String, default: "" },
    coverPicture: { type: String, default: "" },
    followers: { type: Array, default: [] },
    followings: { type: Array, default: [] },
    isAdmin: { type: Boolean, default: false },
    desc: { type: String, default: false },
    city: { type: String },
    from: { type: String },
    relationship: { type: Number, enum: [1, 2, 3] },
},
    { timestamps: true }
);


const postSchema = new mongoose.Schema({
    userId: { type: String, require: true },
    desc: { type: String, max: 500 },
    img: { type: Array, default: [], require: true },
    likes: { type: Array, default: [] },
},
    { timestamps: true }
);


const reelsSchema = new mongoose.Schema({
    userId: { type: String, require: true },
    desc: { type: String, max: 500 },
    reel: { type: String, default: [], require: true },
    likes: { type: Array, default: [] },
},
    { timestamps: true }
);


const storySchema = new mongoose.Schema({
    userId: { type: String, require: true },
    post: { type: Array, default: [], require: true },
    likes: { type: Array, default: [] },
},
    { timestamps: true }
);

const commentSchema = new mongoose.Schema({
    userId: { type: String, require: true },
    postid: { type: String, require: true },
    likes: { type: Array, default: [] },
    desc: { type: String, require: true },
    replys: [],
},
    { timestamps: true }
);

const replySchema = new mongoose.Schema({
    userId: { type: String, require: true },
    likes: { type: Array, default: [] },
    replys: [],
},
    { timestamps: true }
);

const User = mongoose.model('users', userSchema);
const Post = mongoose.model('posts', postSchema);
const Reel = mongoose.model('reels', reelsSchema);
const Story = mongoose.model('stories', storySchema);
const Comment = mongoose.model('comments', commentSchema);
const Reply = mongoose.model('replys', replySchema);

module.exports = {
    User, Post, Reel, Story, Comment, Reply
}