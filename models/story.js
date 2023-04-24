const mongoose = require('mongoose');
Schema = mongoose.Schema;

const storySchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        require: true
    },
    story: {
        type: Array,
        default: [],
        ref: 'users',
        require: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        default: []
    }],
    isDeleted: {
        type: Boolean,
        default: false
    },
},
    { timestamps: true }
);



const Story = mongoose.model('stories', storySchema);

module.exports = {
    Story
}