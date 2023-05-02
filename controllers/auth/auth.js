const { User } = require('../../models/auth');
const bcrypt = require('bcrypt');
const { generateToken } = require('../../middleware/token');

module.exports = {

    getUserDetail: async (req, res) => {
        try {
            const user = await User.find();
            res.status(200).json(user)
        } catch (err) {
            res.status(500).json(err);
        }

    },
    getUsers: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            const { password, updatedAt, ...other } = user._doc
            res.status(200).json(other)
        } catch (err) {
            res.status(500).json(err);
        }
    },
    registerUser: async function (req, res) {
        try {
            const password = req.body.password;
            const usernameExists = await User.find({ username: req.body.username });
            if (usernameExists.length >= 1) {
                return res.status(403).json({
                    message: 'Username Already Exists'
                });
            }
            const emailExists = await User.find({ email: req.body.email });
            if (emailExists.length >= 1) {
                return res.status(403).json({
                    message: 'Mail Exists'
                });
            }
            if (password == null || password == "" || password == undefined) {
                return res.status(403).json({
                    message: 'Please fill the password'
                });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({
                username: req.body.username,
                fullname: req.body.fullname,
                email: req.body.email,
                password: hashedPassword,
            });
            const savedUser = await user.save();
            res.send(savedUser);
        } catch (error) {
            res.send(error);
        }
    },
    loginUser: async (req, res) => {

        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({
                message: "This User Is Not Found"
            });
        }
        try {
            if (await bcrypt.compare(req.body.password, user.password)) {
                const token = await generateToken(user);
                res.send(token);
            } else {
                res.status(401).send("Your Password is Wrong");
            }
        } catch (error) {
            res.status(500).send(error);
        }
    },
    deleteUser: async (req, res) => {
        if (req.params.id != req.user.user._id) {
            return res.status(403).json({
                message: 'You can deltele only your account!'
            });
        }
        try {
            await User.findByIdAndDelete(req.params.id);
            return res.status(200).json({
                message: 'Account has been deleted'
            });
        } catch (err) {
            return res.status(500).json(err)
        }

    },
    updateUser: async function (req, res) {
        try {
            const userId = req.params.id;
            const password = req.body.password;
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }

            // Check if email is already in use by another user
            const emailExists = await User.findOne({ email: req.body.email, _id: { $ne: userId } });
            if (emailExists) {
                return res.status(403).json({
                    message: 'Email is already in use'
                });
            }

            // Update the user object
            user.username = req.body.username || user.username;
            user.fullname = req.body.fullname || user.fullname;
            user.email = req.body.email || user.email;
            if (password) {
                const hashedPassword = await bcrypt.hash(password, 10);
                user.password = hashedPassword;
            }

            // Save the updated user object
            const updatedUser = await user.save();
            return res.status(200).json({
                message: updatedUser
            });
        } catch (error) {
            res.status(500).send(error);
        }
    }

}