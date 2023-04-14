const jwt = require("jsonwebtoken");
const JWT_SECRET = "secretkey"

function generateToken(user) {
    return new Promise((resolve, reject) => {
        jwt.sign({ user }, JWT_SECRET, { expiresIn: "300s" }, (err, token) => {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
}
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        jwt.verify(token, JWT_SECRET, (err, authData) => {
            if (err) {
                res.send({
                    result: 'Token is not valid'
                });
            } else {
                next();
            }
        });
    } else {
        res.send({
            result: 'Token is not valid'
        });
    }
}


module.exports = {
    generateToken,
    verifyToken
};