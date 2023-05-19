let router = require('express').Router();
let { upload } = require('../controllers/file');
const log = require('../helper/logger');
const file = require('../middleware/upload');

router.post('/file/upload', file.files, (req, res) => {
    try {
        log.debug("POST: /api/file/upload");
        upload(req, res);
    } catch {
        log.error("POST: /api/file/upload", error);
        res.customRes(error.message);
    }

});

module.exports = router
