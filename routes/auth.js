const express = require('express');
const authController = require('./../controller/auth');

const routes = express.Router();

routes.post('/signup', authController.postSignup);
routes.post('/signin', authController.postSignin);
routes.post('/reset-password', authController.postResetPassword);

module.exports = routes;