const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String
    },
    postID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts',
        default: null
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        default: []
    }],
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments'
    },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
},
    { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = {
    Comment
}