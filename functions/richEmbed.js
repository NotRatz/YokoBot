const { MessageEmbed } = require('discord.js');

module.exports = {
    data: {
        name: `richEmbed`,
        description: `Creates a rich text embed`
    },
    async run(client, interaction, callback) {
        try {
            var ce = interaction.mid.embed;
            var embed = new MessageEmbed()
            if (ce.author && ce.authorimg) {
                embed.setAuthor(ce.author, ce.authorimg)
            }
            if (ce.author && !ce.authorimg) {
                embed.setAuthor(ce.author)
            }
            if (ce.title) {
                embed.setTitle(ce.title)
            }
            if (ce.color) {
                embed.setColor(ce.color)
            }
            if (ce.image) {
                embed.setImage(ce.image)
            }
            if (ce.thumbnail) {
                embed.setThumbnail(ce.thumbnail)
            }
            if (ce.desc) {
                embed.setDescription(ce.desc)
            }
            if (ce.timestamp) {
                embed.setTimestamp(ce.timestamp)
            }
            if (ce.footer) {
                embed.setFooter(ce.footer)
            }

            if (ce.fields) {
                embed.addFields(ce.fields)
            }

            callback(null, embed)
            } catch (error) {
                console.log(error)
            client.functions.get('handlErr').run(client, interaction, error)
            }
    }
}