const express = require("express");
const router = express.Router();


const { followunfollowController } = require('../controllers/followingController');


router.put('/:id/follow-unfollow', (req, res) => {
    followunfollowController(req, res)
        .then((response) => {
            log.debug("PUT: /api//:id/follow-unfollow");
            res.send(response);
        }).catch((error) => {
            log.error("PUT: /api//:id/follow-unfollow", error);
            res.customRes(error.message);
        })
});

module.exports = router