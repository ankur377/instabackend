const express = require("express");
const router = express.Router();
const log = require('../helper/logger');

const { comment, reply, getComment, likeDislike } = require('../controllers/commentReply');


router.post('/comment/:id', (req, res) => {
    comment(req, res)
        .then((response) => {
            log.debug("POST: /api/comment/:id");
            res.send(response);
        }).catch((error) => {
            log.error("POST: /api/comment/:id", error);
            res.customRes(error.message);

        });
});

router.post('/comments/reply/:id', (req, res) => {
    reply(req, res)
        .then((response) => {
            log.debug("POST: /api/comments/reply/:id");
            res.send(response);
        }).catch((error) => {
            log.error("POST: /api/comments/reply/:id", error);
            res.customRes(error.message);
        })
});

router.get('/comments', (req, res) => {
    getComment(req, res)
        .then((response) => {
            log.debug("GET: /api/comments");
            res.send(response);
        }).catch((error) => {
            log.error("GET: /api/comments", error);
            res.customRes(error.message);
        })
});

router.put('/comments/like/:id', (req, res) => {
    try {
        log.debug("POST: /api/comments/like/:id");
        likeDislike(req, res);
    } catch {
        log.error("POST: /api/comments/like/:id", error);
        res.customRes(error.message);
    }
});

module.exports = router
