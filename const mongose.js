const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        trim: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        lowercase: true,
        trim: true
    },
    password: { 
        type: String, 
        required: true,
        minlength: 6
    },
    role: { 
        type: String, 
        enum: ['jobseeker', 'ngo', 'donor'],
        required: true
    },
    age: { 
        type: Number,
        min: 16,
        max: 100
    }
}, { 
    timestamps: true 
});

module.exports = mongoose.model('User', userSchema);