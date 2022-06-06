const express = require('express');
const { adminAuthorization, electionPartyAuthorization, voterAuthorization } = require('../middlewares/auth');
const authController = require('./../controller/auth');

const routes = express.Router();

routes.post('/signup', authController.postSignup);
routes.post('/signin', authController.postSignin);
routes.post('/reset-password', authController.postResetPassword);
routes.post('/admin-details', authController.postResetPassword);
routes.get('/admin-details/:id', adminAuthorization, authController.getAdminDetails);
routes.get('/voter-details/:id', voterAuthorization, authController.getUserDetails);
routes.get('/election-party-details/:id', electionPartyAuthorization, authController.getUserDetails);
routes.post('/generate-token', authController.postGenerateToken);
routes.patch('/admin-details/:id', adminAuthorization, authController.patchAdminDetails);
routes.patch('/voter-details/:id', voterAuthorization, authController.patchUserDetails);
routes.patch('/election-party-details/:id', electionPartyAuthorization, authController.patchUserDetails);

module.exports = routes;