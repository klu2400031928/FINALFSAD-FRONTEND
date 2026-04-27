const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name{
        type,
        required,
    },
    email{
        type,
        unique,
        sparse, // Allows null/undefined values to not conflict
    },
    phone{
        type,
        unique,
        sparse,
    },
    password{
        type,
        required,
    },
    role{
        type,
        enum: ['donor', 'receiver', 'volunteer', 'ngo'],
        required,
    },
    location{
        type,
        required,
    },
    bio{
        type,
    },
    profilePhoto{
        type, // URL or path to photo
    },
    createdAt{
        type,
        default: Date.now,
    },
    lastLogin{
        type,
    },
    loginHistory{
        type,
    }],
});

module.exports = mongoose.model('User', userSchema);