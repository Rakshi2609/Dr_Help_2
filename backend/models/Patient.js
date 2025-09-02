import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor'
  },
  painScores: [{
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 10
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    notes: String
  }],
  vitals: {
    heartRate: String,
    bloodPressure: String,
    temperature: String,
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  alerts: [{
    title: String,
    description: String,
    time: String,
    isRead: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
});

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;
