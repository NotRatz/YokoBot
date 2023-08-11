const { Events, ModalBuilder, TextinputBuilder, ActionRowBuilder, TextInputStyle} = require('discord.js');

async function handleCreateTeamInteraction(interaction) {
    const getTeamNameInput = new TextInputBuilder()
        .setCustomId('teamNameInput')
        .setTitle('Team Name:')
        .setPlaceholder('Enter your team name..!')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    const getUserNameInput = new TextInputBuilder(interaction)
        .setCustomId('userNameInput')
        .setTitle('Naraka Username:')
        .setPlaceholder('Enter your current in-game name..!')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    const getNarakaUIDInput = new TextInputBuilder(interaction)
        .setCustomId('NarakaIDInput')
        .setTitle('In-Game ID:')
        .setPlaceholder('Enter your Naraka ID..!')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    const createTeamModalInput = new ModalBuilder()
        .setCustomId('createTeamModal')
        .setTitle('Register Your Team');
    
    // Generate UID for Team:
    const teamUID = Math.random().toString(36).substring(2, 7).toUpperCase();
}

module.exports = { handleCreateTeamInteraction };
