const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  heading: {
    type: String
  },
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
  account: {
    type: String
  }
})

module.exports = mongoose.model('Donation', DonationSchema);