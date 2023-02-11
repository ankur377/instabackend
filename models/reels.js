const mongoose = require('mongoose');


const reelsSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    desc: {
        type: String,
        max: 500
    },
    reel: {
        type: String,
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




const Reel = mongoose.model('reels', reelsSchema);

module.exports = {
    Reel
}