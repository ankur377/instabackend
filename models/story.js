const mongoose = require('mongoose');


const storySchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    post: {
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



const Story = mongoose.model('stories', storySchema);

module.exports = {
    Story
}