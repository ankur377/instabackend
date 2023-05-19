const path = require('path');
const multer = require('multer');
const moment = require('moment');

module.exports = {
    uploads: multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, "uploads")
            },
            filename: function (req, file, cb) {
                let ext = path.extname(file.originalname);
                let filename = file.fieldname + "-" + Date.now();
                if (file.mimetype.includes("video")) {
                    filename += "-reels";
                }
                filename += ext;
                cb(null, filename);
            }
        })
    }).array("post"),

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

    files: multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, "public")
            },
            filename: function (req, file, cb) {
                cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
            }
        })
    }).array("selfiee"),

}