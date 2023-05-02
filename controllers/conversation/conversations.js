const { Conversation } = require('../../models/conversition');

module.exports = {
    createConversation: async (req, res) => {
        const newConversation = new Conversation({
            members: [req.body.senderId, req.body.receiverId],
        });
        try {
            const savedConversation = await newConversation.save();
            return res.status(200).json({
                message: savedConversation
            });
        } catch (error) {
            return res.status(500).json({
                message: error
            });
        }
    },
    getConversation: async (req, res) => {
        try {
            const conversation = await Conversation.find({
                members: { $in: [req.params.id] },
            });
            return res.status(200).json({
                message: conversation
            });
        } catch (error) {
            return res.status(500).json({
                message: error
            });
        }
    }
}