const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        validate: {
            validator: function (email) {
                return /^[^\s@]+@northeastern\.edu$/.test(email);
            },
            message: 'Email must be a valid northeastern.edu email',
        },
    },
    type: {
      type: String,
      enum: ['employee', 'admin'], 
      required: [true, 'Type is required.'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;