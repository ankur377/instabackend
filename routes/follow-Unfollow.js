const express = require("express");
const router = express.Router();
const log = require('../helper/logger');


const { followunfollowController } = require('../controllers/followunfollow');


router.put('/follow-unfollow/:id', (req, res) => {
    followunfollowController(req, res)
        .then((response) => {
            log.debug("PUT: /api/follow-unfollow/:id");
            res.send(response);
        }).catch((error) => {
            log.error("PUT: /api/follow-unfollow/:id", error);
            res.customRes(error.message);
        })
});

module.exports = router