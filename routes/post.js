const express = require("express");
const router = express.Router();
const log = require('../helper/logger');

const file = require('../middleware/upload');
const { createPost, updatePost, getPost, timeLinePost } = require('../controllers/post');
const { action } = require('../controllers/comman');
const { verifyToken } = require('../middleware/token');

router.post('/post', verifyToken, file.uploads, (req, res) => {
    try {
        log.debug("POST: /api/post");
        createPost(req, res);
    } catch {
        log.error("POST: /api/post", error);
        res.customRes(error.message);
    }

});

router.put('/post/:id', verifyToken, (req, res) => {
    updatePost(req, res)
        .then((response) => {
            log.debug("POST: /api/post/:id");
            res.send(response);
        }).catch((error) => {
            log.error("POST: /api/post/:id", error);
            res.customRes(error.message);
        })
});

router.get('/post/:id', verifyToken, (req, res) => {
    getPost(req, res)
        .then((response) => {
            log.debug("GET: /api/post/:id");
            res.send(response);
        }).catch((error) => {
            log.error("GET: /api/post/:id", error);
            res.customRes(error.message);
        })
});

router.put('/post/like/:id', verifyToken, (req, res) => {
    try {
        log.debug("POST: /api/post/like/:id");
        action(req, res, 'POST', 'Like');
    } catch {
        log.error("POST: /api/post/like/:id", error);
        res.customRes(error.message);
    }
});

router.delete('/post/:id', verifyToken, (req, res) => {
    try {
        log.debug("POST: /api/post/:id");
        action(req, res, 'POST', 'Delete');
    } catch {
        log.error("POST: /api/post/:id", error);
        res.customRes(error.message);
    }
})

router.get('/post/timeline/all', (req, res) => {
    timeLinePost(req, res)
        .then((response) => {
            log.debug("GET: /api/post/timeline/all");
            res.send(response);
        }).catch((error) => {
            log.error("GET: /api/post/timeline/all", error);
            res.customRes(error.message);
        })
});

module.exports = router
