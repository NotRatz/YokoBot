// web/index.js
const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB (same code as in database/index.js)
mongoose.connect('mongodb://localhost/yokobot', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
});

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory (where your EJS templates are stored)
app.set('views', path.join(__dirname, 'views'));

// Define routes to render pages
app.get('/', async (req, res) => {
    try {
        // Retrieve tournament data from MongoDB
        const tournaments = await Tournament.find(); // Make sure to import your Tournament model

        // Render the home page with tournament data
        res.render('index', { tournaments });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching tournament data.');
    }
});

// Add a new route to view team information
app.get('/tournament/:id/team/:teamId', async (req, res) => {
    try {
        // Retrieve tournament data from MongoDB
        const tournamentId = req.params.id;
        const teamId = req.params.teamId;
        const tournament = await Tournament.findById(tournamentId); // Adjust the model and query accordingly

        if (!tournament) {
            res.status(404).send('Tournament not found.');
            return;
        }

        // Find the team by ID within the tournament
        const team = tournament.teams.find((t) => t.id === teamId);

        if (!team) {
            res.status(404).send('Team not found.');
            return;
        }

        // Render the team information page with team details
        res.render('team', { tournament, team });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching team information.');
    }
});

// Add a route for results submission
app.get('/tournament/:id/submit-result/:teamId', async (req, res) => {
    // Render the results submission form
    res.render('submit-result', { tournamentId: req.params.id, teamId: req.params.teamId });
});

app.post('/tournament/:id/submit-result/:teamId', async (req, res) => {
    try {
        // Retrieve submitted data (position and score) from the form
        const tournamentId = req.params.id;
        const teamId = req.params.teamId;
        const position = req.body.position;
        const score = req.body.score;

        // Update the tournament data in MongoDB with the new results
        const tournament = await Tournament.findById(tournamentId); // Adjust the model and query accordingly

        if (!tournament) {
            res.status(404).send('Tournament not found.');
            return;
        }

        // Find the team by ID within the tournament
        const team = tournament.teams.find((t) => t.id === teamId);

        if (!team) {
            res.status(404).send('Team not found.');
            return;
        }

        // Update the team's position and score
        team.position = position;
        team.score = score;

        // Save the updated tournament data
        await tournament.save();

        // Redirect to the team information page after submission
        res.redirect(`/tournament/${tournamentId}/team/${teamId}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while submitting results.');
    }
});

// Add a route for creating a new tournament
app.get('/create-tournament', (req, res) => {
    // Render the tournament creation form
    res.render('create-tournament');
});

app.post('/create-tournament', async (req, res) => {
    try {
        // Retrieve tournament data submitted from the form
        const tournamentData = {
            mode: req.body.mode,
            heroPoints: req.body.heroPoints === 'on', // Assuming a checkbox for heroPoints
            // Add other tournament properties here
        };

        // Create a new tournament in MongoDB
        const newTournament = new Tournament(tournamentData);
        await newTournament.save();

        // Redirect to the home page or the tournament management page
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while creating the tournament.');
    }
});

// Add a route for managing tournaments (e.g., editing details)
app.get('/manage-tournament/:id', async (req, res) => {
    try {
        // Retrieve tournament data from MongoDB
        const tournamentId = req.params.id;
        const tournament = await Tournament.findById(tournamentId); // Adjust the model and query accordingly

        if (!tournament) {
            res.status(404).send('Tournament not found.');
            return;
        }

        // Render the tournament management page with tournament details
        res.render('manage-tournament', { tournament });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching tournament data.');
    }
});

// web/auth.js
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;

// Passport configuration
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(
    new DiscordStrategy(
        {
            clientID: 'YOUR_CLIENT_ID',
            clientSecret: 'YOUR_CLIENT_SECRET',
            callbackURL: 'YOUR_CALLBACK_URL', // Should match the redirect URL set in Discord Developer Portal
            scope: ['identify'], // Add additional scopes as needed
        },
        (accessToken, refreshToken, profile, done) => {
            // Handle user data from Discord profile
            // Typically, you would create or update a user profile in your database here

            // Example:
            // const user = {
            //     discordId: profile.id,
            //     username: profile.username,
            //     // Add more user data as needed
            // };

            // Call the done function with the user object
            return done(null, user);
        }
    )
);

// web/index.js

const passport = require('passport');
const session = require('express-session');

// Add session middleware
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));

// Initialize Passport and restore session
app.use(passport.initialize());
app.use(passport.session());

// Routes for OAuth2 authentication
app.get('/auth/discord', passport.authenticate('discord'));
app.get(
    '/auth/discord/callback',
    passport.authenticate('discord', {
        successRedirect: '/', // Redirect to the home page after successful login
        failureRedirect: '/login', // Redirect to a login page on failure
    })
);

// Example route to check if the user is authenticated
app.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
        // User is authenticated, you can access user data via req.user
        res.render('profile', { user: req.user });
    } else {
        // User is not authenticated, handle accordingly
        res.redirect('/login');
    }
});


app.listen(port, () => {
    console.log(`Website is running on port ${port}`);
});
