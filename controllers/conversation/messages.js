const { Message } = require('../../models/messages');

module.exports = {
    createMessage: async (req, res) => {
        const newMessage = new Message(req.body);
        try {
            const savedMessage = await newMessage.save();
            return res.status(200).json({
                message: savedMessage
            });
        } catch (error) {
            return res.status(500).json({
                message: error
            });
        }
    },
    getMessage: async (req, res) => {
        const messages = await Message.find({
            conversationId: req.params.id,
        });
        return res.status(200).json({
            message: messages
        });
    }

}