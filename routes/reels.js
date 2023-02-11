const express = require("express");
const router = express.Router();
const allReelsController = require('../controllers/reelControllers');
const file = require('../middleware/upload');



//TODO:CREATE REELS ROUTE
router.post("/reel", file.upload, allReelsController.createReel);

//TODO:DELETE REELS ROUTE
router.delete("/reel/:id", allReelsController.deleteReel);

//TODO:LIKE DISLIKE REEL ROUTE
router.put("/reel/:id/like", allReelsController.likeDislike);

//TODO:GET A REEL ROUTE
router.get("/reel/:id", allReelsController.getReel);

//TODO:TIMELINE REEL ROUTE 
router.get("/reel/timeline/all", allReelsController.timeLineReel);


module.exports = router
