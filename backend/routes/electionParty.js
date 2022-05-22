const express = require('express');

const privligedController = require('./../controller/privliged');

const routes = express.Router();

routes.post('/update-party', privligedController.partyImg, privligedController.postUpdateElectoralParty);

module.exports = routes;