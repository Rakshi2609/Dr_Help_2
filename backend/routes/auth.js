import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Doctor from '../models/Doctor.js';
import Patient from '../models/Patient.js';

const router = express.Router();

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
  console.log('Register endpoint hit with body:', req.body);
  
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    console.log('Missing required fields in registration:', { name, email, password: password ? 'provided' : 'missing', role });
    return res.status(400).json({ msg: 'Please provide all required fields' });
  }

  try {
    console.log('Checking if user exists with email:', email);
    // Check if user already exists
    let user = await User.findOne({ email });
    
    if (user) {
      console.log('User already exists with email:', email);
      return res.status(400).json({ msg: 'User already exists' });
    }
    
    console.log('Creating new user with role:', role);

    // Create user instance (no password hashing as requested)
    user = new User({
      name,
      email,
      password, // Note: normally you would hash this
      role
    });

    console.log('Saving user to database:', user);
    await user.save();
    console.log('User saved successfully with ID:', user.id);

    // If role is doctor or patient, create corresponding profile
    if (role === 'doctor') {
      const { specialty = '' } = req.body;
      console.log('Creating doctor profile with specialty:', specialty);
      
      const doctor = new Doctor({
        userId: user.id,
        specialty
      });
      
      await doctor.save();
      console.log('Doctor profile saved successfully');
    } else if (role === 'patient') {
      console.log('Creating patient profile');
      
      // Extract patient-specific fields if provided
      const {
        age = 0,
        bmi = 0,
        gender = 'Other',
        hasDiabetes = false,
        painLevel = 0,
        surgeryDuration = 0,
        surgeryType = '',
        anesthesiaType = ''
      } = req.body;
      
      const patient = new Patient({
        userId: user.id,
        age: Number(age),
        bmi: Number(bmi),
        gender,
        hasDiabetes: Boolean(Number(hasDiabetes)),
        painLevel: Number(painLevel),
        surgeryDuration: Number(surgeryDuration),
        surgeryType,
        anesthesiaType,
        painScores: [],
        vitals: {
          heartRate: '0',
          bloodPressure: '0/0',
          temperature: '0'
        },
        alerts: []
      });
      
      await patient.save();
      console.log('Patient profile saved successfully');
    }

    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    console.log('Generating JWT token for user:', { userId: user.id, role: user.role });
    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'defaultsecretkey', // You should set this in .env
      { expiresIn: '24h' },
      (err, token) => {
        if (err) {
          console.error('Error generating token:', err);
          throw err;
        }
        console.log('Registration successful - token generated');
        res.json({ token, role: user.role });
      }
    );
  } catch (err) {
    console.error('Registration failed with error:', err.message);
    console.error(err.stack);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// @route   POST api/auth/login
// @desc    Login user & get token
// @access  Public
router.post('/login', async (req, res) => {
  console.log('Login endpoint hit with body:', req.body);
  
  const { email, password } = req.body;

  if (!email || !password) {
    console.log('Missing required fields in login:', { email, password: password ? 'provided' : 'missing' });
    return res.status(400).json({ msg: 'Please provide email and password' });
  }

  try {
    console.log('Looking up user with email:', email);
    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      console.log('User not found with email:', email);
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    console.log('User found, checking password');
    // Check password (no hashing as requested)
    if (password !== user.password) {
      console.log('Invalid password for user:', email);
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    
    console.log('Password valid for user:', email);

    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    console.log('Generating JWT token for user login:', { userId: user.id, role: user.role });
    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'defaultsecretkey',
      { expiresIn: '24h' },
      (err, token) => {
        if (err) {
          console.error('Error generating token:', err);
          throw err;
        }
        console.log('Login successful - token generated');
        res.json({ token, role: user.role });
      }
    );
  } catch (err) {
    console.error('Login failed with error:', err.message);
    console.error(err.stack);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// Import auth middleware
import auth from '../middleware/auth.js';

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/auth/update-profile
// @desc    Update user profile
// @access  Private
router.put('/update-profile', auth, async (req, res) => {
  console.log('Update profile endpoint hit with body:', req.body);
  
  try {
    // Get user role
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    // Update user basic info
    if (req.body.name || req.body.email) {
      const userUpdate = {};
      if (req.body.name) userUpdate.name = req.body.name;
      if (req.body.email) {
        // Check if email already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser && existingUser._id.toString() !== user._id.toString()) {
          return res.status(400).json({ msg: 'Email already in use' });
        }
        userUpdate.email = req.body.email;
      }
      
      await User.findByIdAndUpdate(user._id, userUpdate);
    }
    
    // If user is a patient, update patient-specific info
    if (user.role === 'patient') {
      const patientProfile = await Patient.findOne({ userId: user._id });
      
      if (!patientProfile) {
        return res.status(404).json({ msg: 'Patient profile not found' });
      }
      
      // Update patient fields
      const patientUpdate = {};
      if (req.body.age !== undefined) patientUpdate.age = Number(req.body.age);
      if (req.body.bmi !== undefined) patientUpdate.bmi = Number(req.body.bmi);
      if (req.body.gender !== undefined) patientUpdate.gender = req.body.gender;
      if (req.body.hasDiabetes !== undefined) patientUpdate.hasDiabetes = Boolean(Number(req.body.hasDiabetes));
      if (req.body.painLevel !== undefined) patientUpdate.painLevel = Number(req.body.painLevel);
      if (req.body.surgeryDuration !== undefined) patientUpdate.surgeryDuration = Number(req.body.surgeryDuration);
      if (req.body.surgeryType !== undefined) patientUpdate.surgeryType = req.body.surgeryType;
      if (req.body.anesthesiaType !== undefined) patientUpdate.anesthesiaType = req.body.anesthesiaType;
      
      console.log('Updating patient profile with:', patientUpdate);
      
      await Patient.findByIdAndUpdate(patientProfile._id, patientUpdate);
    }
    
    // Get updated user and patient data
    const updatedUser = await User.findById(user._id).select('-password');
    let result = { user: updatedUser };
    
    if (user.role === 'patient') {
      const updatedPatient = await Patient.findOne({ userId: user._id });
      result.patient = updatedPatient;
    }
    
    res.json(result);
    
  } catch (err) {
    console.error('Update profile error:', err.message);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

export default router;
