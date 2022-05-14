const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
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
  createdAt: {
    type: String,
  },
  createdBy: {
    type: String,
  },

});

module.exports = mongoose.model('Admin', UserSchema);