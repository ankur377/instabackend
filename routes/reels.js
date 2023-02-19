const express = require("express");
const router = express.Router();
const file = require('../middleware/upload');
const { createReel, deleteReel, likeDislike, getReel, timeLineReel } = require('../controllers/reelControllers');



router.post('/reel', file.uploads, (req, res) => {
    try {
        log.debug("POST: /api/reel");
        createReel(req, res)
    } catch {
        log.error("POST: /api/reel", error);
        res.customRes(error.message);
    }

});

router.get('/reel/:id', (req, res) => {
    getReel(req, res)
        .then((response) => {
            log.debug("GET: /api/reel/:id");
            res.send(response);
        }).catch((error) => {
            log.error("GET: /api/reel/:id", error);
            res.customRes(error.message);
        })
});


router.delete('/reel/:id', (req, res) => {
    try {
        log.debug("DELETE: /api/reel/:id");
        deleteReel(req, res)
    } catch {
        log.error("DELETE: /api/reel/:id", error);
        res.customRes(error.message);
    }
});

router.put('/reel/:id/like', (req, res) => {
    try {
        log.debug("PUT: /api/reel/:id/like");
        likeDislike(req, res)
    } catch {
        log.error("PUT: /api/reel/:id/like", error);
        res.customRes(error.message);
    }
});

router.get('/reel/timeline/all', (req, res) => {
    timeLineReel(req, res)
        .then((response) => {
            log.debug("GET: /api/reel/timeline/all");
            res.send(response);
        }).catch((error) => {
            log.error("GET: /api/reel/timeline/all", error);
            res.customRes(error.message);
        })
});

module.exports = router
