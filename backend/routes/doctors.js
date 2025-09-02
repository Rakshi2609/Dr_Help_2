import express from 'express';
import auth from '../middleware/auth.js';
import Doctor from '../models/Doctor.js';
import User from '../models/User.js';
import Patient from '../models/Patient.js';

const router = express.Router();

// @route   GET api/doctors/me
// @desc    Get current doctor profile
// @access  Private (doctors only)
router.get('/me', auth, async (req, res) => {
  try {
    // Check if user is a doctor
    const user = await User.findById(req.user.id);
    
    if (!user || user.role !== 'doctor') {
      return res.status(401).json({ msg: 'Not authorized as a doctor' });
    }
    
    const doctor = await Doctor.findOne({ userId: req.user.id })
      .populate('userId', ['name', 'email'])
      .populate('patients');
      
    if (!doctor) {
      return res.status(404).json({ msg: 'Doctor profile not found' });
    }
    
    res.json(doctor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/doctors/patients
// @desc    Get all patients for a doctor
// @access  Private (doctors only)
router.get('/patients', auth, async (req, res) => {
  try {
    // Check if user is a doctor
    const user = await User.findById(req.user.id);
    
    if (!user || user.role !== 'doctor') {
      return res.status(401).json({ msg: 'Not authorized as a doctor' });
    }
    
    const doctor = await Doctor.findOne({ userId: req.user.id });
    
    if (!doctor) {
      return res.status(404).json({ msg: 'Doctor profile not found' });
    }
    
    const patients = await Patient.find({ doctorId: doctor._id })
      .populate('userId', ['name', 'email']);
      
    res.json(patients);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/doctors/patients/:patientId
// @desc    Get patient details by ID
// @access  Private (doctors only)
router.get('/patients/:patientId', auth, async (req, res) => {
  try {
    // Check if user is a doctor
    const user = await User.findById(req.user.id);
    
    if (!user || user.role !== 'doctor') {
      return res.status(401).json({ msg: 'Not authorized as a doctor' });
    }
    
    const doctor = await Doctor.findOne({ userId: req.user.id });
    
    if (!doctor) {
      return res.status(404).json({ msg: 'Doctor profile not found' });
    }
    
    const patient = await Patient.findOne({ 
      _id: req.params.patientId,
      doctorId: doctor._id 
    }).populate('userId', ['name', 'email']);
    
    if (!patient) {
      return res.status(404).json({ msg: 'Patient not found or not assigned to you' });
    }
    
    res.json(patient);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;
