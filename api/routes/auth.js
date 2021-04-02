const express = require('express');
const { body } = require('express-validator/check');
const User = require('../models/user');
const Host = require('../models/host');
const router = express.Router();
const authController = require('../controllers/auth');

router.put('/user/signup',[
    body('email').isEmail().withMessage("Please enter a valid email").bail().custom((value,{ req }) => {
        return User.findOne({email : value}).then(userDoc => {
            if (userDoc) {
                return Promise.reject('E-mail address already exists!');
            }
        })
    }).normalizeEmail(),
    body('password').trim().isLength({min : 5}),
    body('username').trim().isLength({min : 5}).bail().custom((value,{ req }) => {
        return User.findOne({username : value}).then(userDoc => {
            if (userDoc) {
                return Promise.reject('username already taken!');
            }
        })
    })
],authController.userSignup);


router.post('/user/login',authController.userLogin);

router.put('/host/signup',[
    body('email').isEmail().withMessage("Please enter a valid email").bail().custom((value,{ req }) => {
        return Host.findOne({email : value}).then(userDoc => {
            if (userDoc) {
                return Promise.reject('E-mail address already exists!');
            }
        })
    }).normalizeEmail(),
    body('password').trim().isLength({min : 5}),
    body('username').trim().isLength({min : 5}).bail().custom((value,{ req }) => {
        return Host.findOne({username : value}).then(userDoc => {
            if (userDoc) {
                return Promise.reject('username already taken!');
            }
        })
    })
],authController.hostSignup);

router.post('/host/login',authController.hostLogin);
module.exports = router;