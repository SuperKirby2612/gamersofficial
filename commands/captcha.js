const db = require('../db')

module.exports = {
    name: 'captcha',
    description: 'captcha',
    category: 'Moderation',
    aliases: ['antiraid'],
    async execute(message, args) {
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('Sorry, you don\'t have the correct permissions to do that! `(MANAGE CHANNELS)`')
        if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('Sorry, I don\'t have the correct permissions to do that! `(MANAGE CHANNELS)`')
        if (args = ['on', 'On', 'True', 'true', 'TRUE', 'ON', 'activate', 'Activate', 'ACTIVATE']) {
            if (await db.has(`captcha-${message.guild.id}`) === false) {

                await db.set(`captcha-${message.guild.id}`, true),
                    message.channel.send('Do you have a role to give to all verified people? If yes, please send the role mention, if not, reply with no')
                const rolecollector = message.channel.createMessageCollector(m => m.author.id === message.author.id, {
                    time: 60000,
                    max: 1
                })
                rolecollector.on('collect', async m => {
                    if (m.mentions.roles.size !== 0) {
                        await db.set(`captcha-roleid-${message.guild.id}`, m.mentions.roles.first().id)
                    } else {
                        if (!m.content.toLowerCase() === 'no') message.channel.send('You didn\'t reply with any of the accepted answers, so I\'ll count your answer as no.')
                        message.guild.roles.create({
                            data: {
                                name: 'Verified',
                                color: 'GRAY'
                            }
                        }).then(async r => {
                            await db.set(`captcha-roleid-${message.guild.id}`, r.id)
                        })
                    }
                    var roleid = await db.get(`captcha-roleid-${message.guild.id}`)
                    var role = message.guild.roles.cache.get(r => r.id === roleid)
                    await message.guild.channels.cache.forEach(c => {
                        c.updateOverwrite(c.guild.roles.everyone, {
                            VIEW_CHANNEL: false
                        });
                        message.guild.roles.cache.forEach(r => {
                            if (r.id === r.guild.roles.everyone.id) return;
                            else {
                                c.updateOverwrite(r, {
                                    VIEW_CHANNEL: true
                                })
                            }
                        })
                    })
                    message.guild.channels.create('verify', {
                        type: 'text',
                        permissionOverwrites: [{
                            id: message.guild.id,
                            allow: ['VIEW_CHANNEL'],
                        }]
                    }).then(async c => {
                        c.setRateLimitPerUser(5)
                        await db.set(`captcha-channelid-${message.guild.id}`, c.id)
                    })
                    message.channel.send('Captcha has been activated! WARNING: THIS PROCESS IS ONLY MANUALLY REVERSIBLE! ALSO, ANY PRIVATE CHANNELS HAVE BEEN UNLOCKED TO EVERYONE, SO IF YOU HAVE ANY PRIVATE CHANNELS, RE-PRIVATE THEM NOW!')
                })
                rolecollector.on('end', collected => {
                    if (collected.size === 0) return message.channel.send('You didn\'t reply in time so I cancelled the captcha process.')
                })
            }
        }
        if (args = ['off', 'Off', 'OFF', 'deactivate', 'Deactivate', 'DEACTIVATE']) {
            if (await db.has(`captcha-${message.guild.id}`) === true) {

                await db.delete(`captcha-${message.guild.id}`)
                message.channel.send('Captcha has been deactivated! WARNING: THIS DID NOT SET ALL CHANNELS BACK TO VIEWABLE. YOU WILL HAVE TO DO THIS MANUALLY!')
            }

        }
    }
}