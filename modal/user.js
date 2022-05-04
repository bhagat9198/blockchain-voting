const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  userType: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  voteCardId: {
    type: String,
  },
  blogs: {
    type: Array,
  },
  announcement: {
    type: Array,
  },
  donation: {
    type: Array,
  },
});

module.exports = mongoose.model('User', UserSchema);