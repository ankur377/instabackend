const express = require("express");
const router = express.Router();
const { createStory, deleteStory, getStory } = require('../controllers/story');
const file = require('../middleware/upload');
const log = require('../helper/logger');
const { verifyToken } = require('../middleware/token');
const { action } = require('../controllers/comman');


router.post('/story', verifyToken, file.story, (req, res) => {
    try {
        log.debug("POST: /api/story");
        createStory(req, res)
    } catch {
        log.error("POST: /api/story", error);
        res.customRes(error.message);
    }

});

router.get('/stories', verifyToken, (req, res) => {
    try {
        log.debug("GET: /api/stories");
        getStory(req, res)
    } catch {
        log.error("GET: /api/stories", error);
        res.customRes(error.message);
    }
});

router.delete('/story/:id', (req, res) => {
    try {
        log.debug("POST: /api/story/:id");
        action(req, res, 'STORY', 'Delete')
    } catch {
        log.error("POST: /api/story/:id", error);
        res.customRes(error.message);
    }
})

router.put('/story/like/:id', (req, res) => {
    try {
        log.debug("POST: /api/story/like/:id");
        action(req, res, 'STORY', 'Like');
    } catch {
        log.error("POST: /api/story/like/:id", error);
        res.customRes(error.message);
    }
})

module.exports = router
