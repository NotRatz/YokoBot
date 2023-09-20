const { CommandInteraction, MessageEmbed } = require('discord.js');
const { Tournament } = require('../../database/models/Tournament'); // Adjust the path accordingly

async function handleResultsCommand(interaction) {
    // Fetch the list of available tournaments from the database
    const tournaments = await Tournament.find();

    // Create a dropdown menu with tournament options
    const dropdownOptions = tournaments.map((tournament, index) => ({
        label: `Tournament - ${tournament.mode}`,
        value: index.toString(),
    }));

    // Create a MessageActionRow with the dropdown menu
    const dropdownRow = new MessageActionRow()
        .addComponents({
            type: 'SELECT_MENU',
            customId: 'tournamentDropdown',
            placeholder: 'Select a tournament',
            options: dropdownOptions,
        });

    // Reply to the interaction with the dropdown menu
    await interaction.reply({ content: 'Select a tournament:', components: [dropdownRow] });
}

module.exports = { handleResultsCommand };
