const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    desc: {
        type: String,
        max: 500
    },
    img: {
        type: Array,
        default: [],
        require: true
    },
    likes: {
        type: Array,
        default: []
    },
},
    { timestamps: true }
);


const Post = mongoose.model('posts', postSchema);


module.exports = {
    Post
}