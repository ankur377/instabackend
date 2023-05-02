const express = require("express");
const router = express.Router();
const log = require('../helper/logger');

const { createMessage, getMessage } = require('../controllers/conversation/messages');


router.post('/message', (req, res) => {
    try {
        log.debug("POST: /api/message");
        createMessage(req, res);
    } catch {
        log.error("POST: /api/message", error);
        res.customRes(error.message);
    }

});

router.get('/message/:id', (req, res) => {
    try {
        log.debug("GET: /api/message/:id");
        getMessage(req, res);
    } catch {
        log.error("GET: /api/message/:id", error);
        res.customRes(error.message);
    }

});

module.exports = router;