// database/models/Tournament.js
const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
    mode: String,
    heroPoints: Boolean,
    platform: String,
    scheduledTime: String,
    checkInEnabled: Boolean,
    checkInOffset: Number,
    rounds: Number,
    substitutions: Number,
    notifications: String,
    timeZone: String,
    hostName: String,
    streamLocation: String,
    teams: [
        {
            position: String,
            score: String,
        },
    ],
});

const Tournament = mongoose.model('Tournament', tournamentSchema);

module.exports = { Tournament };
