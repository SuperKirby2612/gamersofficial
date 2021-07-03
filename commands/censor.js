const db = require('../db')

module.exports = {
    name: 'Censor',
    description: 'Toggles on/off censor for AntiSwear. Syntax: -g censor (Toggles between on and off e.x: -g censor (Output: On!), -g censor (Output: Off!))',
    category: 'Moderation',
    slash: 'both',
    async execute(message, args, client) {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('Sorry, you don\'t have the correct permissions to do that! `(MANAGE MESSAGES)`')
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send('Sorry, I don\'t have the correct permissions to do that! `(MANAGE MESSAGES)`')
        if (await db.has(`swear-${message.guild.id}`) === false) return message.channel.send('Sorry, AntiSwear is not on! Try using -g antiswear to turn it on and then use this command again!')
        else {
            if (args = ['on', 'On', 'True', 'true', 'TRUE', 'ON', 'activate', 'Activate', 'ACTIVATE']) {
                if (await db.has(`censor-${message.guild.id}`) === false) {

                    await db.set(`censor-${message.guild.id}`,
                        message.channel.send('Censoring has been activated!')
                    )
                }
            }
            if (args = ['off', 'Off', 'OFF', 'deactivate', 'Deactivate', 'DEACTIVATE']) {
                if (await db.has(`censor-${message.guild.id}`) === true) {

                    await db.delete(`censor-${message.guild.id}`)
                    message.channel.send('Censoring has been deactivated!')
                }
            }
        }
    }
}