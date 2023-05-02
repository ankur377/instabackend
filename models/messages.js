const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Conversations'
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    text: {
        type: String,
    }
},
    { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);

module.exports = {
    Message
}