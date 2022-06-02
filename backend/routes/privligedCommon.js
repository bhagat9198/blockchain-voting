const express = require('express');
const privligedCommonController = require('./../controller/privligedCommon');

const routes = express.Router();

// **************************** Admin & Election Party *************************************************** //
routes.post('/add-blog', privligedCommonController.blogImg, privligedCommonController.postAddBlog);
routes.post('/add-announcement', privligedCommonController.postAddAnnouncement);
routes.post('/add-donation', privligedCommonController.postAddDonation);


// **************************** Election Party *************************************************** //

routes.post('/election-party/update-party', privligedCommonController.partyImg, privligedCommonController.postUpdateElectoralParty);


// **************************** Admin  *************************************************** //

routes.post('/admin/verify', privligedCommonController.postVerify);
routes.post('/admin/add-admin', privligedCommonController.postAddAdmin);
routes.get('/admin/all-admins', privligedCommonController.getAllAdmins);
routes.get('/admin/election-result-status', privligedCommonController.getElectionResultStatus);
routes.get('/admin/vote-status', privligedCommonController.getVoteStatus);
routes.get('/admin/settings', privligedCommonController.getSettings);

module.exports = routes;