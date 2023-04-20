const mongoose = require('mongoose');
    Schema = mongoose.Schema;

const postSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
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