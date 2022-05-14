const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  heading: {
    type: String
  },
  p1: {
    type: String
  },
  p2: {
    type: String
  },
  imgPath: {
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

module.exports = mongoose.model('Blog', BlogSchema);