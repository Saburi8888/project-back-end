// Admin auth route

const express = require('express');
const { signup, signin } = require('../../controller/admin/auth');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../../validators/auth');
const router = express.Router();

// routing post post to validation
router.post('/admin/signin', validateSigninRequest, isRequestValidated, signin );

router.post('/admin/signup', validateSignupRequest, isRequestValidated, signup );


module.exports = router;