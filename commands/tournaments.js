const { CommandInteraction, MessageActionRow, MessageButton } = require('discord.js');
const { Tournament } = require('../../database/models/Tournament'); // Adjust the path accordingly

async function handleTournamentCommand(interaction) {
    // Parse parameters from the interaction options
    const mode = interaction.options.getString('mode');
    const heroPoints = interaction.options.getBoolean('hero_points') || false;
    const platform = interaction.options.getString('platform') || 'Crossplay';
    const scheduledTime = interaction.options.getString('scheduled_time');
    const checkInEnabled = interaction.options.getBoolean('check_in_enabled') || true;
    const checkInOffset = interaction.options.getInteger('check_in_offset') || 1;
    const rounds = interaction.options.getInteger('rounds') || 3;
    const substitutions = interaction.options.getInteger('substitutions') || 1;
    const notifications = interaction.options.getString('notifications') || 'Direct Message';
    const timeZone = interaction.options.getString('time_zone') || 'EST';
    const hostName = interaction.options.getUser('host_name');
    const streamLocation = interaction.options.getString('stream_location');

    // Create a new tournament entry in the database
    const newTournament = new Tournament({
        mode,
        heroPoints,
        platform,
        scheduledTime,
        checkInEnabled,
        checkInOffset,
        rounds,
        substitutions,
        notifications,
        timeZone,
        hostName,
        streamLocation,
    });

    await newTournament.save();

    // Create buttons for user interactions
    const createTeamButton = new MessageButton()
        .setCustomId('createTeamButton')
        .setLabel('Create Team')
        .setStyle('PRIMARY');

    const joinTeamButton = new MessageButton()
        .setCustomId('joinTeamButton')
        .setLabel('Join Team')
        .setStyle('PRIMARY');

    const unregisterButton = new MessageButton()
        .setCustomId('unregisterButton')
        .setLabel('Unregister')
        .setStyle('DANGER');

    const timeLeftButton = new MessageButton()
        .setCustomId('timeLeftButton')
        .setLabel('Time Left')
        .setStyle('SECONDARY');

    const teamInfoButton = new MessageButton()
        .setCustomId('teamInfoButton')
        .setLabel('Team Information')
        .setStyle('SECONDARY');

    // Create a row of buttons
    const buttonRow = new MessageActionRow()
        .addComponents(createTeamButton, joinTeamButton, unregisterButton, timeLeftButton, teamInfoButton);

    // Construct an embed with tournament details
    const embed = createTournamentEmbed(newTournament);

    // Reply to the interaction with the embed and buttons
    await interaction.reply({ embeds: [embed], components: [buttonRow] });
}

function createTournamentEmbed(tournament) {
    // Construct and return a MessageEmbed with tournament details
    // You can customize this according to your design
    // Example:
    const embed = new MessageEmbed()
        .setTitle(`Tournament - ${tournament.mode}`)
        .setDescription(`Hosted by: <@${tournament.hostName}>`)
        .addField('Mode', tournament.mode)
        .addField('Platform', tournament.platform)
        .addField('Scheduled Time', tournament.scheduledTime)
        .addField('Check-In', tournament.checkInEnabled ? 'Enabled' : 'Disabled')
        .addField('Rounds', tournament.rounds)
        .addField('Substitutions', tournament.substitutions)
        .addField('Notifications', tournament.notifications)
        .addField('Time Zone', tournament.timeZone)
        .addField('Stream Location', tournament.streamLocation);

    return embed;
}

module.exports = { handleTournamentCommand };
