const { User } = require('../../models/auth');
const bcrypt = require('bcrypt');

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
    registerUser: function (req, res) {
        User.find({ email: req.body.email })
            .then(user => {
                if (user.length >= 1) {
                    return res.status(409).json({
                        message: 'Mail Exists'
                    });
                } else {
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if (err) {
                            return res.status(500).json({
                                error: err
                            })
                        } else {
                            const user = new User({
                                username: req.body.username,
                                fullname: req.body.fullname,
                                email: req.body.email,
                                password: hash
                            });
                            user.save().then((result) => {
                                res.send(result);
                            }).catch((error) => { res.send(error) })
                        }
                    });
                }
            })
            .catch((error) => {
                res.send(error);
            });
    },
    loginUser: async (req, res) => {

        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.send("This User Is Not Found");
        }
        try {
            if (await bcrypt.compare(req.body.password, user.password)) {
                res.send(user);
            } else {
                res.send("Your Password is Wrong");
            }
        } catch {
            res.status(500).send()
        }
    },
    deleteUser: async (req, res) => {
        if (req.params.id || req.body.isAdmin) {
            try {
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("Account has been deleted");
            } catch (err) {
                return res.status(500).json(err)
            }
        } else {
            return res.status(403).json("You can deltele only your account!");
        }
    },
    updateUser: async (req, res) => {
        if (req.params.id || req.body.isAdmin) {
            if (req.body.password) {
                try {
                    const salt = await bcrypt.genSalt(10);
                    req.body.password = await bcrypt.hash(req.body.password, salt);
                } catch (err) {
                    return res.status(500).json(err)
                }
            }
            try {
                const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body });
                res.status(200).json("Account has been updated");
            } catch (err) {
                return res.status(500).json(err)
            }
        } else {
            return res.status(403).json("You can update only your account!");
        }
    }
}