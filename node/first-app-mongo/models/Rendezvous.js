const mongoose = require('mongoose');

const RendezvousSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  clientName: {
    type: String,
    trim: true
  },
  professional: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professional',
    required: true
  },
  professionalName: {
    type: String,
    trim: true
  },
  date: {
    type: Date,
    required: [true, 'Rendezvous date is required']
  },
  startTime: {
    type: String,
    required: [true, 'Start time is required']
  },
  endTime: {
    type: String,
    required: [true, 'End time is required']
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Indexes for efficient querying
RendezvousSchema.index({ professional: 1, date: 1 });
RendezvousSchema.index({ client: 1, date: 1 });

const Rendezvous = mongoose.model('Rendezvous', RendezvousSchema);

module.exports = Rendezvous;