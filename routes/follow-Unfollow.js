const express = require("express");
const router = express.Router();


const followunfollowController = require('../controllers/followingController');




//TODO:FOLLOWING ROUTE
router.put("/:id/follow-unfollow", followunfollowController.followunfollowController);






module.exports = router