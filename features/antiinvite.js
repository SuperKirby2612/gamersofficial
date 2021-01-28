const db = require("../db")

module.exports = {
    name: 'Anti-Invite - Invite Checker',
    async execute(client) {
        const isInvite = async (guild, code) => {
            return await new Promise(resolve => {
                guild.fetchInvites().then((invites) => {
                    for (const invite of invites) {
                        if (code === invite[0]) {
                            resolve(true)
                            return
                        }
                    }
                    resolve(false)
                })
            })
        }
        client.on('message', async (message) => {
            console.log('YAY I GOT TO MESSAGES')
            const { guild, member, content } = message
            const code = content.split('discord.gg/')[1]
            if (channel => channel.name === 'self-advertising' || 'self-ads' || 'self-advertisments' || 'advertisments') return;
            if (message.member.hasPermission('MANAGE_MESSAGES')) return;
            if (await db.has(`antiinvite-${message.guild.id}`) === false) return;
            if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return;
            if (content.includes('discord.gg/')) {
                const isServerInvite = await isInvite(guild, code)
                if (!isServerInvite) {
                    message.delete()
                    message.author.send('You are not allowed to send invites in this server unless you have the MANAGE MESSAGES permission or you send it in a channel called self-advertising, self-ads, self-advertisments or advertisments. If you think this is a mistake, please contact one of the admins and show them this message!')
                }
            }
        })
    }
}

module.exports.config = {
    displayName: 'antiinvite', // Can be changed any time
    dbName: 'antiinvite', // DO NOT CHANGE!
    loadDBFirst: true,
}