const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    profilePicture: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Files',
        default: null
    },
    coverPicture: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Files',
        default: null
    },
    followers: {
        type: Array,
        ref: 'users',
        default: []
    },
    followings: {
        type: Array,
        ref: 'users',
        default: []
    },
    totalposts: {
        type: Array,
        ref: 'posts',
        default: []
    },
    stories: {
        type: Array,
        ref: 'stories',
        default: []
    },
    storiesMemories: {
        type: Array,
        ref: 'stories',
        default: []
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    bio: {
        type: String,
        default: null
    },
    country: {
        type: String,
        default: null
    },
    state: {
        type: String,
        default: null
    },
    city: {
        type: String,
        default: null
    },
    number: {
        type: Number,
        default: null
    },
    relationship: {
        type: Number,
        enum: [1, 2]
    },
},
    { timestamps: true }
);


const User = mongoose.model('users', userSchema);


module.exports = {
    User
}