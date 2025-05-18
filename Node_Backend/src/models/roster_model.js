const mongoose = require('mongoose');

const rosterSchema = new mongoose.Schema({
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff',
    required: true
  },
  Date:{
    type: String,
    required: true
  },
  shiftTiming: {
    type: String,
    required: true
  },
  shiftType: {
    type: String,
    required: true
  },
  workingDays: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: false
  },
  status: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Roster', rosterSchema);
