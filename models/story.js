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
    likes: {
        type: Array,
        ref: 'users',
        default: []
    },
},
    { timestamps: true }
);



const Story = mongoose.model('stories', storySchema);

module.exports = {
    Story
}