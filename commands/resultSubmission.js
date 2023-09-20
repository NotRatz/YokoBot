// bot/commands/resultSubmission.js
const { SelectMenuBuilder, MessageActionRow } = require('discord.js');
const { Tournament } = require('../../database/models/Tournament'); // Adjust the path accordingly

async function handleResultSubmission(interaction, selectedTournament) {
    // Create a dropdown menu for result submission
    const resultOptions = [];
    for (let i = 1; i <= selectedTournament.teams.length; i++) {
        resultOptions.push({
            label: `Team ${i}`,
            value: i.toString(),
        });
    }

    const resultDropdown = new SelectMenuBuilder()
        .setCustomId('resultDropdown')
        .setPlaceholder('Select a team')
        .addOptions(resultOptions);

    const resultRow = new MessageActionRow().addComponents(resultDropdown);

    // Reply to the interaction with the result submission dropdown
    await interaction.reply({
        content: 'Select a team to submit results for:',
        components: [resultRow],
    });

    // Listen for the result submission selection
    const filter = (interaction) => interaction.customId === 'resultDropdown' && interaction.user.id === interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

    collector.on('collect', async (resultInteraction) => {
        const selectedTeamIndex = parseInt(resultInteraction.values[0]) - 1;

        // Prompt the user to input the position and score for the selected team
        await resultInteraction.followUp({
            content: `You selected Team ${selectedTeamIndex + 1}. Please provide their position and score.`,
        });

        // Collect the user's response
        const responseFilter = (message) => message.author.id === interaction.user.id;
        const responseCollector = interaction.channel.createMessageCollector({ filter: responseFilter, time: 60000 });

        let position = '';
        let score = '';

        responseCollector.on('collect', (message) => {
            if (!position) {
                position = message.content;
                message.reply('Please provide the score for the selected team.');
            } else if (!score) {
                score = message.content;

                // Save the results to the selected team in the tournament
                selectedTournament.teams[selectedTeamIndex].position = position;
                selectedTournament.teams[selectedTeamIndex].score = score;
                await selectedTournament.save();

                // Inform the user that the results have been submitted
                interaction.followUp(`Results for Team ${selectedTeamIndex + 1} - Position: ${position}, Score: ${score} have been submitted.`);
                responseCollector.stop();
            }
        });

        responseCollector.on('end', (collected, reason) => {
            if (reason === 'time') {
                interaction.followUp('Result submission timed out.');
            }
        });
    });

    collector.on('end', (collected, reason) => {
        if (reason === 'time') {
            interaction.followUp('Result selection timed out.');
        }
    });
}

module.exports = { handleResultSubmission };
