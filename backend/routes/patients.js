import express from 'express';
import auth from '../middleware/auth.js';
import Patient from '../models/Patient.js';
import User from '../models/User.js';

const router = express.Router();

// @route   GET api/patients/me
// @desc    Get current patient profile
// @access  Private (patients only)
router.get('/me', auth, async (req, res) => {
  try {
    // Check if user is a patient
    const user = await User.findById(req.user.id);
    
    if (!user || user.role !== 'patient') {
      return res.status(401).json({ msg: 'Not authorized as a patient' });
    }
    
    const patient = await Patient.findOne({ userId: req.user.id })
      .populate('userId', ['name', 'email'])
      .populate('doctorId', 'specialty');
      
    if (!patient) {
      return res.status(404).json({ msg: 'Patient profile not found' });
    }
    
    res.json(patient);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/patients/pain-scores
// @desc    Add a pain score record
// @access  Private (patients only)
router.post('/pain-scores', auth, async (req, res) => {
  const { score, notes } = req.body;
  
  // Validate input
  if (score < 0 || score > 10) {
    return res.status(400).json({ msg: 'Score must be between 0 and 10' });
  }
  
  try {
    // Check if user is a patient
    const user = await User.findById(req.user.id);
    
    if (!user || user.role !== 'patient') {
      return res.status(401).json({ msg: 'Not authorized as a patient' });
    }
    
    const patient = await Patient.findOne({ userId: req.user.id });
    
    if (!patient) {
      return res.status(404).json({ msg: 'Patient profile not found' });
    }
    
    // Add new pain score (will be limited to last 3 by pre-save hook)
    patient.painScores.push({ 
      score,
      notes,
      timestamp: Date.now() 
    });
    
    await patient.save();
    
    res.json(patient.painScores);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/patients/temperature
// @desc    Add a new temperature record
// @access  Private (patients only)
router.post('/temperature', auth, async (req, res) => {
  const { value } = req.body;
  
  try {
    // Check if user is a patient
    const user = await User.findById(req.user.id);
    
    if (!user || user.role !== 'patient') {
      return res.status(401).json({ msg: 'Not authorized as a patient' });
    }
    
    const patient = await Patient.findOne({ userId: req.user.id });
    
    if (!patient) {
      return res.status(404).json({ msg: 'Patient profile not found' });
    }
    
    // Initialize temperatures array if it doesn't exist
    if (!patient.temperatures) {
      patient.temperatures = [];
    }
    
    // Add new temperature (will be limited to last 3 by pre-save hook)
    patient.temperatures.push({
      value,
      timestamp: Date.now()
    });
    
    // Update current vitals temperature
    patient.vitals.temperature = value;
    patient.vitals.updatedAt = Date.now();
    
    await patient.save();
    
    res.json(patient.temperatures);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/patients/vitals
// @desc    Add a new vitals record
// @access  Private (patients only)
router.post('/vitals', auth, async (req, res) => {
  const { heartRate, bloodPressure } = req.body;
  
  try {
    // Check if user is a patient
    const user = await User.findById(req.user.id);
    
    if (!user || user.role !== 'patient') {
      return res.status(401).json({ msg: 'Not authorized as a patient' });
    }
    
    const patient = await Patient.findOne({ userId: req.user.id });
    
    if (!patient) {
      return res.status(404).json({ msg: 'Patient profile not found' });
    }
    
    // Initialize vitalsHistory array if it doesn't exist
    if (!patient.vitalsHistory) {
      patient.vitalsHistory = [];
    }
    
    // Add new vitals record (will be limited to last 3 by pre-save hook)
    patient.vitalsHistory.push({
      heartRate,
      bloodPressure,
      timestamp: Date.now()
    });
    
    // Update current vitals
    patient.vitals.heartRate = heartRate;
    patient.vitals.bloodPressure = bloodPressure;
    patient.vitals.updatedAt = Date.now();
    
    await patient.save();
    
    res.json(patient.vitalsHistory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/patients/alerts
// @desc    Get all alerts for a patient
// @access  Private (patients only)
router.get('/alerts', auth, async (req, res) => {
  try {
    // Check if user is a patient
    const user = await User.findById(req.user.id);
    
    if (!user || user.role !== 'patient') {
      return res.status(401).json({ msg: 'Not authorized as a patient' });
    }
    
    const patient = await Patient.findOne({ userId: req.user.id });
    
    if (!patient) {
      return res.status(404).json({ msg: 'Patient profile not found' });
    }
    
    res.json(patient.alerts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/patients/history
// @desc    Get patient history (last 3 records of each type)
// @access  Private (patients only)
router.get('/history', auth, async (req, res) => {
  try {
    // Check if user is a patient
    const user = await User.findById(req.user.id);
    
    if (!user || user.role !== 'patient') {
      return res.status(401).json({ msg: 'Not authorized as a patient' });
    }
    
    const patient = await Patient.findOne({ userId: req.user.id });
    
    if (!patient) {
      return res.status(404).json({ msg: 'Patient profile not found' });
    }
    
    // Get last 3 records of each type
    const history = {
      painScores: patient.painScores || [],
      temperatures: patient.temperatures || [],
      vitals: patient.vitalsHistory || []
    };
    
    res.json(history);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/patients/alerts/:alertId
// @desc    Mark an alert as read
// @access  Private (patients only)
router.put('/alerts/:alertId', auth, async (req, res) => {
  try {
    // Check if user is a patient
    const user = await User.findById(req.user.id);
    
    if (!user || user.role !== 'patient') {
      return res.status(401).json({ msg: 'Not authorized as a patient' });
    }
    
    const patient = await Patient.findOne({ userId: req.user.id });
    
    if (!patient) {
      return res.status(404).json({ msg: 'Patient profile not found' });
    }
    
    // Find alert by ID
    const alertIndex = patient.alerts.findIndex(
      alert => alert._id.toString() === req.params.alertId
    );
    
    if (alertIndex === -1) {
      return res.status(404).json({ msg: 'Alert not found' });
    }
    
    // Mark as read
    patient.alerts[alertIndex].isRead = true;
    
    await patient.save();
    
    res.json(patient.alerts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;
