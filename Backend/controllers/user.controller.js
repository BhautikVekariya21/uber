import userModel from '../models/user.model.js';
import * as userService from '../services/user.service.js';
import { validationResult } from 'express-validator';
import blackListTokenModel from '../models/blackListToken.model.js';

// Register a new user
export const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password and create user
    const hashedPassword = await userModel.hashPassword(password);
    const user = await userService.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
    });

    // Generate token
    const token = user.generateAuthToken();
    return res.status(201).json({ token, user });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Login a user
export const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user by email
    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = user.generateAuthToken();
    res.cookie('token', token);
    return res.status(200).json({ token, user });
  } catch (error) {
    console.error('Error logging in user:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Logout user
export const logoutUser = async (req, res) => {
  try {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blackListTokenModel.create({ token });
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error logging out user:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
