const db = require('../db')

module.exports = {
    name: 'Anti-Invite - Off',
    description: 'Turns Anti-Invite Off',
    category: 'Moderation',
    aliases: ['aioff', 'aiof', 'antiinviteoff', 'anti-invite-off', 'anti-inviteoff'],
    async execute(message, args, client) {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('Sorry, you don\'t have the correct permissions to do that! `(MANAGE MESSAGES)`')
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send('Sorry, I don\'t have the correct permissions to do that! `(MANAGE MESSAGES)`')
        if (await db.has(`antiinvite-${message.guild.id}`) === true) {

            await db.delete(`antiinvite-${message.guild.id}`),
                message.channel.send('Anti-Invite has been deactivated!')
        } else {
            return message.channel.send('Anti-Invite is already off!')
        }
    }
}