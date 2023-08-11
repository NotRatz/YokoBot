module.exports = {
    data: {
        name: `handlErr`,
        description: `Error Handling`,
    },
    async run(client, interaction, error) {
        let errScript = `${interaction.createdAt.toLocaleString()} | Error Occured while processing ${
            interaction.commandName
        } | ${error}`
        
        console.trace()
        console.log(errScript)
        console.log(interaction.options)
        interaction.mid.embed = {
            author: interaction.user.tag,
            authorimg: interaction.user.displayAvatarURL(),
            color: 'LUMINOUS_VIVID_PINK',
            footer: `The handlErr`,
            desc: errScript,
            image: client.user.displayAvatarURL(),
        }
        client.functions
            .get('richEmbed')
            .run(client, interaction, (err, result) => {
                interaction.followUp({
                    ephemeral: true,
                    embeds: [result],
                })
            })
        console.log(error)
    },
}
