const Discord = require('discord.js')
const Levels = require('discord-xp')
const canvacord = require('canvacord')

module.exports = {
    description: 'Gives you your current rank level and xp!',
    category: 'XP',
    slash: 'both',
    async execute(message, args) {
        const target = message.author

        const user = await Levels.fetch(target.id, message.guild.id)

        const neededXp = Levels.xpFor(parseInt(user.level) + 1)

        if (!user) return message.reply("You don't have any xp. Send some messages to gain some! ^v^")

        const rank = new canvacord.Rank()
            .setAvatar(message.author.displayAvatarURL({
                dynamic: false,
                format: 'png'
            }))
            .setCurrentXP(user.xp)
            .setRequiredXP(neededXp)
            .setStatus(message.author.presence.status)
            .setProgressBar(['#2efdff', '#FFFFFF'], 'GRADIENT')
            .setBackground('IMAGE', 'https://i.ibb.co/Q6Km9kr/rankbackground.png')
            .setUsername(message.author.username)
            .setCustomStatusColor('#2efdff')
            .setDiscriminator(message.author.discriminator)
        rank.build()
            .then(data => {
                const attachment = new Discord.MessageAttachment(data, `${message.author.username}` + `${message.author.discriminator}.png`)
                message.channel.send(attachment)
            })
    }
}