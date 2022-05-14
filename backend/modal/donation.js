const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  cause: {
    type: String
  },
  autherId: {
    type: String
  },
  userType: {
    type: String
  },
  createdAt: {
    type: String
  },
})

module.exports = mongoose.model('Donation', DonationSchema);