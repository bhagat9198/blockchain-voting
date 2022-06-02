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
  p3: {
    type: String
  },
  imgPath: {
    type: String
  },
  imgName: {
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

module.exports = mongoose.model('Blog', BlogSchema);