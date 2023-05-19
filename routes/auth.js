const express = require("express");
const router = express.Router();
const log = require('../helper/logger');
const { verifyToken } = require('../middleware/token');

const { getUserDetail, getUsers, registerUser, loginUser, deleteUser, updateUser } = require('../controllers/auth/auth');

router.post('/register', (req, res) => {
    try {
        log.debug("POST: /api/auth/register");
        registerUser(req, res)
    } catch {
        log.error("POST: /api/auth/register", error);
        res.customRes(error.message);
    }

});

router.post('/login', (req, res) => {
    loginUser(req, res)
        .then((response) => {
            log.debug("POST: /api/auth/login");
            res.send(response);
        }).catch((error) => {
            log.error("POST: /api/auth/login", error);
            res.customRes(error.message);
        })
});

router.get('/users/:id', (req, res) => {
    getUsers(req, res)
        .then((response) => {
            log.debug("GET: /api/auth/users/:id");
            res.send(response);
        }).catch((error) => {
            log.error("GET: /api/auth/users/:id", error);
            res.customRes(error.message);
        })
});

router.get('/all/users', verifyToken, (req, res) => {
    getUserDetail(req, res)
        .then((response) => {
            log.debug("GET: /api/auth/all/users");
            res.send(response);
        }).catch((error) => {
            log.error("GET: /api/auth/all/users", error);
            res.customRes(error.message);
        })
});

router.put('/users/:id', verifyToken, (req, res) => {
    try {
        log.debug("PUT: /api/auth/users/:id");
        updateUser(req, res)
    } catch {
        log.error("PUT: /api/auth/users/:id", error);
        res.customRes(error.message);
    }
})


router.delete('/users/:id', verifyToken, (req, res) => {
    try {
        log.debug("POST: /api/auth/users/:id");
        deleteUser(req, res)
    } catch {
        log.error("POST: /api/auth/users/:id", error);
        res.customRes(error.message);
    }
})

module.exports = router