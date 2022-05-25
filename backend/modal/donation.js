const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  cause: {
    type: String
  },
  userId: {
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