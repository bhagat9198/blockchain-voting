const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
  votedAt: {
    type: Date,
  },
  party: String
});

module.exports = mongoose.model('UserTemp', VoteSchema);