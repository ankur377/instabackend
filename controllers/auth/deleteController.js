const db = require('../../helper/database')
const { User } = require('../../models/index');

exports.deleteController = async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted");
        } catch (err) {
            return res.status(500).json(err)
        }
    } else {
        return res.status(403).json("You can deltele only your account!");
    }
}