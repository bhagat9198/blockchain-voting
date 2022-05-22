const express = require('express');
const adminController = require('./../controller/admin');

const routes = express.Router();

// routes.post('/add-blog', adminController.postAddBlog);
// routes.post('/add-announcement', adminController.postAddAnnouncement);
// routes.post('/add-donation', adminController.postAddDonation);
routes.post('/verify', adminController.postVerify);
routes.post('/add-admin', adminController.postAddAdmin);
// routes.post('/latest-poll-eachday', adminController.postAddDonation);
// routes.post('/each-party-vote', adminController.postAddDonation);
routes.get('/all-admins', adminController.getAllAdmins);


module.exports = routes;