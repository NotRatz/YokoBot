const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { Tournament } = require('../database/models/tournament.js');

async function handleTournamentCommand(interaction) {
    // You may want to save the data to your database
    const tournamentData = {
        mode: interaction.options.getString('mode'),
        // ... and all other data fields
    };

    const newTournament = new Tournament(tournamentData);
    await newTournament.save();

    const embed = new MessageEmbed()
        .setAuthor(interaction.user.username, interaction.user.displayAvatarURL())
        .setTitle(`Tournament NA ${tournamentData.mode}`)
        .setDescription('Press the below buttons to sign up for the event.')
        .addField('Game Type', tournamentData.mode, true)
        .addField('# of Games', tournamentData.rounds, true)
        .addField('Event Time', tournamentData.tournamentTime, true)
        .addField('Check-In Time', tournamentData.checkInTime, true)
        .setFooter('Registrations close 2 hours before the event starts');

    const createTeamButton = new MessageButton()
        .setCustomId('createTeamButton')
        .setLabel('Create Team')
        .setStyle('PRIMARY');
    
    const row = new MessageActionRow().addComponents(createTeamButton);

    await interaction.reply({ embeds: [embed], components: [row] });
}

module.exports = { handleTournamentCommand };
