const path = require('path');
const multer = require('multer');


module.exports = {
    uploads: multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, "uploads")
            },
            filename: function (req, file, cb) {
                cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
            }
        })
    }).array("post"),

    upload: multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, "reels")
            },
            filename: function (req, file, cb) {
                cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
            }
        })
    }).single("reel"),

    story: multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, "stories")
            },
            filename: function (req, file, cb) {
                cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
            }
        })
    }).array("story"),

}