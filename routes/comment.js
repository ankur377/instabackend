const express = require("express");
const router = express.Router();
const log = require('../helper/logger');


const { createComment, replyComment, getComment } = require('../controllers/comment');



// router.post("/comment/:id", commentsController.createComment);
router.post('/comments', (req, res) => {
    try {
        log.debug("POST: /api/comments");
        createComment(req, res)
    } catch {
        log.error("POST: /api/comments", error);
        res.customRes(error.message);
    }

});
router.post('/comments/:commentId/replies', (req, res) => {
    try {
        log.debug("POST: /api/comments/:commentId/replies");
        replyComment(req, res)
    } catch {
        log.error("POST: /api/comments/:commentId/replies", error);
        res.customRes(error.message);
    }

});

// Get all comments with replies
router.get('/comments', (req, res) => {
    try {
        log.debug("GET: /api/comments");
        getComment(req, res);
    } catch {
        log.error("GET: /api/comments");
        res.customRes(error.message);
    }
});

module.exports = router
