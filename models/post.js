const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        require: true
    },
    description: {
        type: String,
        default: null
    },
    post: {
        type: Array,
        default: [],
        ref: 'users',
        require: true
    },
    comments: {
        ref: "Comments",
        type: Array,
        default: []
    },
    likes: {
        type: Array,
        ref: 'users',
        default: []
    },
},
    { timestamps: true }
);


const Post = mongoose.model('posts', postSchema);


module.exports = {
    Post
}