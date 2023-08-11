// Default Imports & Modules
const { Client, Events, MessageEmbed, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

// Folder Requirements
const { mongoose } = require('./database/db.js');
const { handleTournamentCommand } = require('./commands/tournaments');
const { handleCreateTeamInteraction } = require('./components/createTeam');
const { handleUserProfileInteraction } = require('./database/userProfile');

// Tokens
const { token } = require('./config.env');

// Set-Up Client Logging
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.MessageComponents,
        GatewayIntentBits.MessageComponentInteractions
    ]
});

// ... Event Parser ...
const eventFiles = fs
    .readdirSync('./events')
    .filter(file => file.endsWith('.js'))
console.log(`Checking ${eventfiles.length} event files...`)
for (const file of eventFiles) {
    const event = require(`./events/${file}`)
    if (event.once) {
        client.once(event.name, (...args) => event.run(...args))
    } else {
        client.on(event.name, (...args) => event.run(...args))
    }
}

// ... On Event Interactions ...
client.on(Events.interactionCreate, async interaction => {
    if (interaction.isCommand()) {
        switch (interaction.commandName) {
            case 'tournament':
                await handleTournamentCommand(interaction);
                break;
            case 'result':
                await handleResultCommand(interaction);
        }
    } else if (interaction.isButton()) {
        switch (interaction.customId) {
            case 'createTeamButton':
                // Generate TextInput & Modal
                await handleCreateTeamInteraction(interaction);
                // Show the Modal to the User:
                await interaction.showModal(createTeamModalInput);
                // Read the Results
                if (!interaction.isModalSubmit()) return;
                if (interaction.customId === 'createTeamModal') {
                    let msgEmbed = new MessageEmbed()
                        .setTitle('Tournament' ) // Left off here
                    await interaction.reply({ })
                }
        }
    } else return;
});


client.login(token);