const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    discordId: {
        type: String,
        required: true,
        unique: true, // Each user should have a unique Discord ID
    },
    username: {
        type: String,
        required: true,
    },
    profilePictureUrl: {
        type: String, // Assuming the URL is a string
    },
    // Add other fields as needed, e.g., email, etc.
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
