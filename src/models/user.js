const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true
        },
    password: {
            type: String,
            required: true,
            select: false
        },
    email: {
        type: String,
        required: true,
        unique: true
        },
    name: {
        type: String,
        required: true
        },
    lastName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);