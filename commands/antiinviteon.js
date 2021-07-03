const db = require('../db')

module.exports = {
    name: 'Anti-Invite - On',
    description: 'Turns Anti-Invite On',
    category: 'Moderation',
    aliases: ['aion', 'antiinviteon', 'anti-invite-on', 'anti-inviteon'],
    slash: 'both',
    async execute(message, args, client) {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('Sorry, you don\'t have the correct permissions to do that! `(MANAGE MESSAGES)`')
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send('Sorry, I don\'t have the correct permissions to do that! `(MANAGE MESSAGES)`')
        if (await db.has(`antiinvite-${message.guild.id}`) === false) {
            await db.set(`antiinvite-${message.guild.id}`),
                message.channel.send('Anti-Invite has been activated!')
        } else {
            return message.channel.send('Anti-Invite is already on!')
        }
    }
}