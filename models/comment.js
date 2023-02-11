const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    content: String,
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
},
    { timestamps: true }
);


const Comment = mongoose.model('comments', commentSchema);

module.exports = {
    Comment
}