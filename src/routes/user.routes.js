const express = require('express');
const router = express.Router();
const authController = require('../controllers/user.controller');
const { validate } = require('express-validation');
const { loginUserPayload, createSignupPayload } = require('../validations/user.validation');


//api route 
router.post('/signup', validate(createSignupPayload), authController.signupUser);
router.post('/login', validate(loginUserPayload), authController.loginUsers);

module.exports = router