const express = require("express");
const router = express.Router();
const authenticateUser = require('../middleware/authentication');

const { register, login} = require('../controller/auth');

const rateLimiter = require('express-rate-limit');
const apiLimiter = rateLimiter({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10,
  message: {
    msg: 'Too many requests from this IP, please try again after 5 minutes',
  },
});


// router.route("/login").post(login);
// router.route("/register").post(register);

router.post('/register', apiLimiter, register);
router.post('/login', apiLimiter, login);

module.exports = router;
