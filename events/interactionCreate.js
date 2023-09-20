// bot/events/interactionCreate.js
const { CommandInteraction, SelectMenuInteraction } = require('discord.js');
const { handleTournamentCommand } = require('../commands/tournament');
const { handleResultsCommand } = require('../commands/results');
const { handleResultSubmission } = require('../commands/resultSubmission');

module.exports = {
    name: 'interactionCreate',
    description: 'Triggers when an interaction is created',
    once: false,
    async run(interaction) {
        try {
            if (interaction.isCommand()) {
                const { commandName } = interaction;
                if (commandName === 'tournament') {
                    await handleTournamentCommand(interaction);
                } else if (commandName === 'results') {
                    await handleResultsCommand(interaction);
                }
            } else if (interaction.isButton()) {
                // Handle button interactions here (e.g., create team, join team, etc.)
                // You can create separate modules for handling these interactions
            } else if (interaction.isSelectMenu()) {
                // Handle dropdown menu interactions (tournament selection)
                await handleDropdownMenuSelection(interaction);
            }
        } catch (error) {
            // Handle errors and log them as needed
            console.error(error);
        }
    },
};

async function handleDropdownMenuSelection(interaction) {
    if (interaction instanceof SelectMenuInteraction) {
        // Get the selected tournament index from the user's selection
        const selectedTournamentIndex = parseInt(interaction.values[0]);

        // Fetch the tournament details from the database using the index
        const tournaments = await Tournament.find(); // Make sure to import your Tournament model
        const selectedTournament = tournaments[selectedTournamentIndex];

        // Handle the selected tournament (e.g., display results submission UI)
        await handleResultSubmission(interaction, selectedTournament);
    }
}
