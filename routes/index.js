// import packages
let router = require('express').Router();
const { verifyToken } = require('../middleware/token');

router.use('/auth', require('./auth'));

router.use('/', verifyToken, require('./follow-Unfollow'));

router.use('/', verifyToken, require('./post'));

router.use('/', verifyToken, require('./story'));

router.use('/', verifyToken, require('./commentReply'));

module.exports = router;