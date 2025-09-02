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
  // Patient demographics and medical data
  age: {
    type: Number,
    default: 0
  },
  bmi: {
    type: Number,
    default: 0
  },
  gender: {
    type: String,
    enum: ['M', 'F', 'Other'],
    default: 'Other'
  },
  hasDiabetes: {
    type: Boolean,
    default: false
  },
  surgeryDuration: {
    type: Number,
    default: 0
  },
  surgeryType: {
    type: String,
    default: ''
  },
  anesthesiaType: {
    type: String,
    default: ''
  },
  notes: {
    type: String,
    default: ''
  },
  // Store the last 3 pain scores
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
  // Store the last 3 temperature readings
  temperatures: [{
    value: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  // Store the last 3 vital sign readings
  vitalsHistory: [{
    heartRate: String,
    bloodPressure: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  // Current vitals (most recent)
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

// Pre-save hook to limit arrays to last 3 entries
patientSchema.pre('save', function(next) {
  // Limit painScores to last 3 entries
  if (this.painScores && this.painScores.length > 3) {
    this.painScores = this.painScores.slice(-3);
  }
  
  // Limit temperatures to last 3 entries
  if (this.temperatures && this.temperatures.length > 3) {
    this.temperatures = this.temperatures.slice(-3);
  }
  
  // Limit vitalsHistory to last 3 entries
  if (this.vitalsHistory && this.vitalsHistory.length > 3) {
    this.vitalsHistory = this.vitalsHistory.slice(-3);
  }
  
  next();
});

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;
