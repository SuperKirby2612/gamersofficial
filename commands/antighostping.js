const Discord = require('discord.js');

module.exports = {
    name: 'antighostping',
    description: 'antighostping',
    category: 'Moderation',
    async execute(message, args) {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('Sorry, you don\'t have the correct permissions to do that! `(MANAGE MESSAGES)`')
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send('Sorry, I don\'t have the correct permissions to do that! `(MANAGE MESSAGES)`')
        if (args = ['on', 'On', 'True', 'true', 'TRUE', 'ON', 'activate', 'Activate', 'ACTIVATE']) {
            if (await db.has(`ghost-${message.guild.id}`) === false) {

                await db.set(`ghost-${message.guild.id}`, true),
                    message.channel.send('AntiGhostPing has been activated!')
            }
        }
        if (args = ['off', 'Off', 'OFF', 'deactivate', 'Deactivate', 'DEACTIVATE']) {
            if (await db.has(`ghost-${message.guild.id}`) === true) {

                await db.delete(`ghost-${message.guild.id}`)
                message.channel.send('AntiGhostPing has been deactivated!')
            }

        }
    }
}