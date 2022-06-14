const express = require('express');
const { adminAuthorization, voterAuthorization, electionPartyAuthorization } = require('../middlewares/auth');
const commonController = require('./../controller/common');

const routes = express.Router();



routes.get('/admin/admin-settings', adminAuthorization, commonController.getAdminSettings);
routes.get('/admin/blogs', adminAuthorization, commonController.getBlogs);
routes.get('/admin/donations', adminAuthorization, commonController.getDonations);
routes.get('/admin/announcements', adminAuthorization, commonController.getAnnouncements);
routes.post('/admin/update-profile-pic', adminAuthorization, commonController.profilePic ,commonController.postProfilePic);
routes.get('/admin/party/:_id', adminAuthorization, commonController.profilePic, commonController.getParty);

routes.get('/voter/admin-settings', voterAuthorization, commonController.getAdminSettings);
routes.get('/voter/blogs', voterAuthorization, commonController.getBlogs);
routes.get('/voter/donations', voterAuthorization, commonController.getDonations);
routes.get('/voter/announcements', voterAuthorization, commonController.getAnnouncements);
routes.post('/voter/update-profile-pic', voterAuthorization, commonController.profilePic, commonController.postProfilePic);
routes.get('/voter/party/:_id', voterAuthorization, commonController.profilePic, commonController.getParty);
routes.get('/voter/vote-submit/:_id', voterAuthorization, commonController.profilePic, commonController.getVoteSubmit);

routes.get('/election-party/admin-settings', electionPartyAuthorization, commonController.getAdminSettings);
routes.get('/election-party/blogs', electionPartyAuthorization, commonController.getBlogs);
routes.get('/election-party/donations', electionPartyAuthorization, commonController.getDonations);
routes.get('/election-party/announcements', electionPartyAuthorization, commonController.getAnnouncements);
routes.post('/election-party/update-profile-pic', electionPartyAuthorization, commonController.profilePic, commonController.postProfilePic);
routes.get('/election-party/party/:_id', electionPartyAuthorization, commonController.profilePic, commonController.getParty);
routes.get('/election-party/vote-submit/:_id', electionPartyAuthorization, commonController.profilePic, commonController.getVoteSubmit);



module.exports = routes;