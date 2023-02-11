const express = require("express");
const router = express.Router();
const log = require('../helper/logger');

const file = require('../middleware/upload');
const { createPost, updatePost, deletePost, likeDislike, getPost, timeLinePost } = require('../controllers/postControllers');


router.post('/post', file.uploads, (req, res) => {
    try {
        log.debug("POST: /api/post");
        createPost(req, res)
    } catch {
        log.error("POST: /api/post", error);
        res.customRes(error.message);
    }

});

router.put('/post/:id', (req, res) => {
    updatePost(req, res)
        .then((response) => {
            log.debug("POST: /api/post/:id");
            res.send(response);
        }).catch((error) => {
            log.error("POST: /api/post/:id", error);
            res.customRes(error.message);
        })
});

router.get('/post/:id', (req, res) => {
    getPost(req, res)
        .then((response) => {
            log.debug("GET: /api/post/:id");
            res.send(response);
        }).catch((error) => {
            log.error("GET: /api/post/:id", error);
            res.customRes(error.message);
        })
});

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

router.put('/post/:id/like', (req, res) => {
    try {
        log.debug("POST: /api/post/:id/like");
        likeDislike(req, res)
    } catch {
        log.error("POST: /api/post/:id/like", error);
        res.customRes(error.message);
    }
})


router.delete('/post/:id', (req, res) => {
    try {
        log.debug("POST: /api/post/:id");
        deletePost(req, res)
    } catch {
        log.error("POST: /api/post/:id", error);
        res.customRes(error.message);
    }
})

module.exports = router
