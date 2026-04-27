const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register User
router.post('/register', async (req, res) => {
    try {
        const { name, email, phone, password, role, location, bio, profilePhoto } = req.body;

        // Check if user already exists
        let existingUser;
        if (email) {
            existingUser = await User.findOne({ email });
        } else if (phone) {
            existingUser = await User.findOne({ phone });
        }

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const newUser = new User({
            name,
            email,
            phone,
            password, // In a real app, hash this password!
            role,
            location,
            bio,
            profilePhoto,
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully', user);
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login User
router.post('/login', async (req, res) => {
    try {
        const { email, phone, password } = req.body;

        // Find user by email or phone
        let user;
        if (email) {
            user = await User.findOne({ email });
        } else if (phone) {
            user = await User.findOne({ phone });
        }

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password (In production, use bcrypt.compare)
        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Update last login and history
        user.lastLogin = Date.now();
        user.loginHistory.push(Date.now());
        await user.save();

        res.json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;