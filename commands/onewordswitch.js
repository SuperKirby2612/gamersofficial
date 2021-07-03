const db = require('../db')

module.exports = {
    name: 'OneWordOnly',
    description: 'onewordonly',
    category: 'Moderation',
    slash: 'both',
    async execute(message, args, client) {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('Sorry, you don\'t have the correct permissions to do that! `(MANAGE MESSAGES)`')
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send('Sorry, I don\'t have the correct permissions to do that! `(MANAGE MESSAGES)`')
        const thischannel = message.mentions.channels.first() || message.channel
        if (args = ['on', 'On', 'True', 'true', 'TRUE', 'ON', 'activate', 'Activate', 'ACTIVATE']) {
            if (await db.has(`onewordonly-${message.guild.id}-${thischannel.id}`) === false) {

                await db.set(`onewordonly-${message.guild.id}-${thischannel.id}`, true),
                    message.channel.send(`OneWordOnly has been activated for <#${thischannel.id}>!`)
            }
        }
        if (args = ['off', 'Off', 'OFF', 'deactivate', 'Deactivate', 'DEACTIVATE']) {
            if (await db.has(`onewordonly-${message.guild.id}-${thischannel.id}`) === true) {

                await db.delete(`onewordonly-${message.guild.id}-${thischannel.id}`)
                message.channel.send(`OneWordOnly has been deactivated for <#${thischannel.id}>!`)
            }

        }
    }
}