const mongoose = require('mongoose');

// Define the Team schema
const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Each team should have a unique name
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Assuming you have a User model for team members
        },
    ],
    // Add other fields as needed, e.g., team captain, description, etc.
});

// Create the Team model
const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
