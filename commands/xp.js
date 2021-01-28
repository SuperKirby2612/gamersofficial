const Discord = require('discord.js')
const Levels = require('discord-xp')

module.exports = {
    name: 'xp',
    description: 'Gives a random amount of xp (Not executable)',
    category: 'Features',
    cooldown: '15s',
    async execute(message, authorid, guildid) {
        if (message.author.bot) return;
        if (authorid === undefined || null) {
            var authorid = message.author.id
        } if (guildid === undefined || null) {
            var guildid = message.guild.id
        }
        const randomXp = Math.floor(Math.random() * 9) + 1
        const hasLeveledUp = await Levels.appendXp(authorid, guildid, randomXp);
        if (hasLeveledUp) {
            const user = await Levels.fetch(authorid, guildid)
            const userid = authorid
            var LevelUpEmbed = new Discord.MessageEmbed()
                .setTitle('Level up!')
                .setColor('GREEN')
                .addFields({
                    name: "Well done!",
                    value: `You just advanced to level \`${user.level}\`, <@${userid}>!`
                })
                .setThumbnail('http://images.hellogiggles.com/uploads/2015/01/05/spongebob.jpg')
                .setFooter('XP: You get XP by messaging on this discord server, spamming will not give you XP!')
            message.channel.send(LevelUpEmbed)
        }
    }
}