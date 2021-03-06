const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
  heading: {
    type: String
  },
  body: {
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

module.exports = mongoose.model('Announcement', AnnouncementSchema);