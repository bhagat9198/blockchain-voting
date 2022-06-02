const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  votingPhase: {
    type: Boolean
  },
  results: {
    type: Boolean
  }
})

module.exports = mongoose.model('Settings', SettingsSchema);