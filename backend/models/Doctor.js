import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  specialty: {
    type: String,
    required: true
  },
  patients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient'
  }],
  achievements: [{
    title: String,
    description: String,
    year: String
  }]
});

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;
