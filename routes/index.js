const express = require("express");
const router = express.Router();

const login = require('../controllers/auth/loginController');
const register = require('../controllers/auth/registerController');
const update = require('../controllers/auth/updateController');
const deletes = require('../controllers/auth/deleteController');
const allUser = require('../controllers/auth/user');
const followunfollowController = require('../controllers/followingController');
const allPostController = require('../controllers/post/postControllers');
const allReelsController = require('../controllers/reels/reelControllers');
const allStoryController = require('../controllers/stories/storyController');
const commentsController = require('../controllers/commentController');
const replyController = require('../controllers/replyController');
const file = require('../middleware/upload');

// TODO:LOGIN ROUTE
router.post("/login", login.loginController);

// TODO:REGISTER ROUTE
router.post('/register', register.registerController);

//TODO:UPDATE ROUTE
router.put('/:id', update.updateController);

//TODO:DELETE ROUTE
router.delete('/:id', deletes.deleteController);

//TODO:GET ROUTE
router.get('/:id', allUser.getAllRecord);

//TODO:FOLLOWING ROUTE
router.put("/:id/follow-unfollow", followunfollowController.followunfollowController);


//TODO:CREATE POST
router.post("/post", file.uploads, allPostController.createPost);

//TODO:UPDATE POST
router.put("/post/:id", allPostController.updatePost);

//TODO:DELETE POST ROUTE
router.delete("/post/:id", allPostController.deletePost);

//TODO:LIKE DISLIKE POST ROUTE
router.put("/post/:id/like", allPostController.likeDislike);


//TODO:GET A POST ROUTE
router.get("/post/:id", allPostController.getPost);

//TODO:TIMELINE POST ROUTE 
router.get("/post/timeline/all", allPostController.timeLinePost);

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

//TODO:CREATE STORY ROUTE
router.post("/story", file.story, allStoryController.createStory);

//TODO:DELETE STORY ROUTE
router.delete("/story/:id", allStoryController.deleteStory);

router.post("/comment/:id", commentsController.createComment);
router.put("/reply/:id", replyController.createComment);
module.exports = router