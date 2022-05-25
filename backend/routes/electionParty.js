const express = require('express');

// const privligedController = require('./../controller/privliged');
const electionPartyController = require('./../controller/electionParty');

const routes = express.Router();

routes.post('/update-party', electionPartyController.partyImg, electionPartyController.postUpdateElectoralParty);

module.exports = routes;