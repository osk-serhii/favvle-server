const express = require('express');
const authCtrl = require('../controllers/auth');

const router = express.Router();

router.post('/signin', authCtrl.signinEmail); // Signin with Email
router.post('/signin-google', authCtrl.signinGoogle); // Signin with Google
router.post('/signin-facebook', authCtrl.signinFacebook); // Signin with Facebook

router.post('/signup', authCtrl.signupEmail); // Signup with Email
router.post('/signup-google', authCtrl.signupGoogle); // Signup with Google
router.post('/signup-facebook', authCtrl.signupFacebook); // Signup with Facebook

module.exports = router;
