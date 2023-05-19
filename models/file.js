const mongoose = require('mongoose');

const schema = mongoose.Schema(
    {
        originalname: {
            type: String,
            trim: true,
            required: true
        },
        filename: {
            type: String,
            trim: true,
            required: true
        },
        size: {
            type: String,
            trim: true,
            required: true
        },
        mimetype: {
            type: String,
            trim: true,
            required: true
        },
        path: {
            type: String,
            trim: true,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const File = mongoose.model('Files', schema);

module.exports = {
    File
};
