const mongoose = require('mongoose');

const PartySchema = new mongoose.Schema({
  partyName: {
    type: String
  },
  candidateName: {
    type: String
  },
  symbolName: {
    type: String
  },
  imgPath: {
    type: String
  },
  imgName: {
    type: String
  },
  moto: {
    type: String
  },
  vision: {
    type: String
  },
  state: {
    type: String
  },
  district: {
    type: String
  },
  userType: {
    type: String
  },
  userId: {
    type: String
  },
  createdAt: {
    type: String
  },
  account: {
    type: String
  }
})

module.exports = mongoose.model('Party', PartySchema);