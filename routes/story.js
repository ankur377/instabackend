const express = require("express");
const router = express.Router();
const { createStory, deleteStory } = require('../controllers/storyController');
const file = require('../middleware/upload');


router.post('/story', file.story, (req, res) => {
    try {
        log.debug("POST: /api/story");
        createStory(req, res)
    } catch {
        log.error("POST: /api/story", error);
        res.customRes(error.message);
    }

});

router.delete('/story/:id', (req, res) => {
    try {
        log.debug("POST: /api/story/:id");
        deleteStory(req, res)
    } catch {
        log.error("POST: /api/story/:id", error);
        res.customRes(error.message);
    }
})

module.exports = router
