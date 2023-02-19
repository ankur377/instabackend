// import packages
let router = require('express').Router();

router.use('/auth',require('./auth'));

router.use('/',require('./follow-Unfollow'));

router.use('/',require('./post'));

router.use('/',require('./reels'));

router.use('/',require('./story'));


module.exports = router;