module.exports = {
    name: `interactionCreate`,
    description: `Triggers when an interaction is created`,
    once: false,
    async run(interaction) {

        try {
            client = interaction.client

            if (interaction.isCommand()) {

                const { commandName, options } = interaction

                if (interaction.guild)
                    client.commands.get(commandName).run(client, interaction)
            }
        } catch (error) {
            await interaction.deferReply({
                ephemeral: true,
            })

            client.functions.get('handlErr').run(client, interaction, error)
        }
    },
}