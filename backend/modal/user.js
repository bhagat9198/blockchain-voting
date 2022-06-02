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
  announcements: {
    type: Array,
  },
  donations: {
    type: Array,
  },
  createdAt: {
    type: String,
  },
  isVerified: {
    type: Boolean,
  },
  imgPath: {
    type: String
  },
  imgName: {
    type: String
  }
});

// 1

module.exports = mongoose.model('User', UserSchema);