const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
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
  announcements: {
    type: Array,
  },
  donations: {
    type: Array,
  },
  createdAt: {
    type: String,
  },
  createdBy: {
    type: String,
  },

});

module.exports = mongoose.model('Admin', AdminSchema);