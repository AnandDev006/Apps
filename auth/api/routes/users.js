const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');

const passportConf = require('../passport');
const UserController = require('../controller/users');
const { validateBody, schemas } = require('../helpers/routeHelpers');

const passportLocal = passport.authenticate('local', { session: false });
const passportJwt = passport.authenticate('jwt', { session: false });

router
	.route('/signup')
	.post(validateBody(schemas.authSchema), UserController.signUp);
router
	.route('/signin')
	.post(passportLocal, validateBody(schemas.authSchema), UserController.signIn);
router.route('/secret').get(passportJwt, UserController.secret);

module.exports = router;
