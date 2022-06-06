const express = require('express');
const { adminAuthorization, electionPartyAuthorization } = require('../middlewares/auth');
const privligedCommonController = require('./../controller/privligedCommon');

const routes = express.Router();

// **************************** Admin & Election Party *************************************************** //
routes.post('/admin/add-blog', adminAuthorization, privligedCommonController.blogImg, privligedCommonController.postAddBlog);
routes.post('/admin/add-announcement', adminAuthorization, privligedCommonController.postAddAnnouncement);
routes.post('/admin/add-donation', adminAuthorization, privligedCommonController.postAddDonation);

routes.post('/election-party/add-blog', electionPartyAuthorization, privligedCommonController.blogImg, privligedCommonController.postAddBlog);
routes.post('/election-party/add-announcement', electionPartyAuthorization, privligedCommonController.postAddAnnouncement);
routes.post('/election-party/add-donation', electionPartyAuthorization, privligedCommonController.postAddDonation);


// **************************** Election Party *************************************************** //

routes.post('/election-party/update-party', electionPartyAuthorization, privligedCommonController.partyImg, privligedCommonController.postUpdateElectoralParty);


// **************************** Admin  *************************************************** //

routes.post('/admin/verify', adminAuthorization, privligedCommonController.postVerify);
routes.post('/admin/add-admin', adminAuthorization, privligedCommonController.postAddAdmin);
routes.get('/admin/all-admins', adminAuthorization, privligedCommonController.getAllAdmins);
routes.get('/admin/election-result-status', adminAuthorization, privligedCommonController.getElectionResultStatus);
routes.get('/admin/vote-status', adminAuthorization, privligedCommonController.getVoteStatus);

module.exports = routes;