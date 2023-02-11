const express = require("express");
const router = express.Router();
const allStoryController = require('../controllers/storyController');
const file = require('../middleware/upload');


//TODO:CREATE STORY ROUTE
router.post("/story", file.story, allStoryController.createStory);

//TODO:DELETE STORY ROUTE
router.delete("/story/:id", allStoryController.deleteStory);


module.exports = router
