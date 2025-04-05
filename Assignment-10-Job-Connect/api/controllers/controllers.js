const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');
const User = require('../user/user');
const { validateEmail, validatePassword, createUser } = require('../services/services');
const Job = require('../models/job');

const express = require("express");
const router = express.Router();

exports.createUser = async (req, res) => {
    const { fullName, email, password, type } = req.body;

    // Validate email
    if (!validateEmail(email)) {
        return res.status(400).send({ message: "Email must be a valid @northeastern.edu address." });
    }

    // Validate password
    if (!validatePassword(password)) {
        return res.status(400).send({ 
            message: "Password must be at least 8 characters long, and include at least one uppercase letter, one number, and one special symbol." 
        });
    }
    if (!['employee', 'admin'].includes(type)) {
      return res.status(400).send({ message: "Type must be 'employee' or 'admin'." });
    }

    try {
        await createUser(fullName, email, password,type);
        res.status(201).send({ message: "User created successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.checkUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User exists', user });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ message: 'Auth failed: User not found' });
        }
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
            return res.status(401).json({ message: 'Auth failed: Incorrect password' });
        }
        res.status(200).json({
            message: 'User logged in successfully',
            user: {
                email: user.email,
                fullName: user.fullName,
                type: user.type,
            },
        });
    } catch (error) {
        console.error("Backend error:", error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.editUser = async (req, res) => {
    try {
        const { email, fullName, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).send('User not found');
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.updateOne({ email }, { fullName, password: hashedPassword });
        res.send('User updated successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { email } = req.body;
        const result = await User.deleteOne({ email });
        if (result.deletedCount === 0) return res.status(404).send('User not found');
        res.send('User deleted successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.send(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) return res.status(400).send('No image uploaded');
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).send('User not found');
        const imagePath = req.file.path;
        res.send(`Image uploaded successfully: ${imagePath}`);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getImages = (req, res) => {
    const imagesDirectory = path.join(__dirname, '../images');
    fs.readdir(imagesDirectory, (err, files) => {
        if (err) {
            return res.status(500).send('Failed to list images');
        }
        const images = files.map((file) => ({ url: `/images/${file}` }));
        res.json(images);
    });
};


exports.createJob = async (req, res) => {
  const { companyName, jobTitle, description, salary } = req.body;

  // Validate required fields
  if (!companyName || !jobTitle || !description || !salary) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const job = new Job({
      companyName,
      jobTitle,
      description,
      salary,
    });

    await job.save(); // Save job to the database
    res.status(201).json({ message: "Job created successfully", job });
  } catch (error) {
    console.error("Error creating job:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get Jobs API
exports.getJobs = async (req, res) => {
  try {
      const jobs = await Job.find();
      res.status(200).json(jobs);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};
