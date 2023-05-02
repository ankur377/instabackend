const express = require("express");
const router = express.Router();
const log = require('../helper/logger');

const { createConversation, getConversation } = require('../controllers/conversation/conversations');


router.post('/conversation', (req, res) => {
    try {
        log.debug("POST: /api/conversation");
        createConversation(req, res);
    } catch {
        log.error("POST: /api/conversation", error);
        res.customRes(error.message);
    }

});

router.get('/conversation/:id', (req, res) => {
    try {
        log.debug("GET: /api/conversation/:id");
        getConversation(req, res);
    } catch {
        log.error("GET: /api/conversation/:id", error);
        res.customRes(error.message);
    }

});

module.exports = router;