const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const Team = require('../database/models/team'); // Import your Team model

async function handleJoinTeamInteraction(interaction) {
    try {
        // Fetch existing teams from your database
        const teams = await Team.find(); // Make sure to import your Team model and define the schema

        // Check if there are no teams available
        if (!teams || teams.length === 0) {
            const noTeamsEmbed = new MessageEmbed()
                .setTitle('No Teams Available')
                .setDescription('There are currently no teams available to join.');
            await interaction.reply({ embeds: [noTeamsEmbed] });
            return;
        }

        // Construct a MessageSelectMenu with team options
        const teamOptions = teams.map((team) => ({
            label: team.name,
            value: team.id, // Assuming each team has a unique ID
            description: `Team Size: ${team.members.length}`,
        }));

        const selectMenu = new MessageSelectMenu()
            .setCustomId('joinTeamSelect')
            .setPlaceholder('Select a team to join')
            .addOptions(teamOptions);

        // Construct the embed
        const embed = new MessageEmbed()
            .setTitle('Join Team')
            .setDescription('Select a team to join.');

        // Create an ActionRow containing the select menu
        const row = new MessageActionRow().addComponents(selectMenu);

        // Send the embed with the select menu
        await interaction.reply({ embeds: [embed], components: [row] });
    } catch (error) {
        console.error(error);
        // Handle errors, e.g., send an error message
        await interaction.reply('An error occurred while fetching team information.');
    }
}

module.exports = { handleJoinTeamInteraction };
