const db = require('../db')

module.exports = {
    name: 'AntiSwear',
    description: 'Toggles on/off antiswear. Syntax: -g antiswear (Switches between on and off e.x: -g antiswear (Output: On!), -g antiswear (Output: Off!))',
    category: 'Moderation',
    async execute(message, args, client) {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('Sorry, you don\'t have the correct permissions to do that! `(MANAGE MESSAGES)`')
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send('Sorry, I don\'t have the correct permissions to do that! `(MANAGE MESSAGES)`')
        if (args = ['on', 'On', 'True', 'true', 'TRUE', 'ON', 'activate', 'Activate', 'ACTIVATE']) {
            if (await db.has(`swear-${message.guild.id}`) === false) {

                await db.set(`swear-${message.guild.id}`, true),
                    message.channel.send('AntiSwear has been activated!')
            }
        } if (args = ['off', 'Off', 'OFF', 'deactivate', 'Deactivate', 'DEACTIVATE']) {
            if (await db.has(`swear-${message.guild.id}`) === true) {

                await db.delete(`swear-${message.guild.id}`)
                    message.channel.send('AntiSwear has been deactivated!')
                    if (await db.has(`censor-${message.guild.id}`) === true) {
                        await db.delete(`censor-${message.guild.id}`)
                    }
            }

        }
    }
}