const express = require('express');
const commonController = require('./../controller/common');

const routes = express.Router();

routes.get('/blogs', commonController.getBlogs);
routes.get('/donations', commonController.getDonations);
routes.get('/announcements', commonController.getAnnouncements);



module.exports = routes;