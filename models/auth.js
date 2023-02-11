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
        type: String,
        default: ""
    },
    coverPicture: {
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    desc: {
        type: String,
        default: false
    },
    city: {
        type: String
    },
    from: {
        type: String
    },
    relationship: {
        type: Number,
        enum: [1, 2, 3]
    },
},
    { timestamps: true }
);


const User = mongoose.model('users', userSchema);


module.exports = {
    User
}