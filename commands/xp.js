const Discord = require('discord.js')
const Levels = require('discord-xp')
const giphyRandom = require('giphy-random')
const db = require('../db')

module.exports = {
    name: 'xp',
    description: 'Gives a random amount of xp (Not executable)',
    category: 'Features',
    cooldown: '15s',
    async execute(message, authorid, guildid) {
        if (message.author.bot) return;
        if (authorid === undefined || null) {
            var authorid = message.author.id
        }
        if (guildid === undefined || null) {
            var guildid = message.guild.id
        }
        var randomxpnum = await db.get(`xpmultiplier-${message.guild.id}`) || 1
        const randomXp = (Math.floor(Math.random() * 9) + 1) * randomxpnum
        const hasLeveledUp = await Levels.appendXp(authorid, guildid, randomXp);
        if (hasLeveledUp) {
            const user = await Levels.fetch(authorid, guildid)
            const userid = authorid
            var yaygifdata = await giphyRandom(process.env.GIPHY_API_TOKEN, [{
                tag: 'yay',
                rating: 'g'
            }])
            if (yaygifdata.data.type !== 'gif') {
                var yaygif = 'https://i.giphy.com/media/TdfyKrN7HGTIY/giphy.gif'
            } else {
                var yaygif = yaygifdata.data.image_original_url
            }
            var LevelUpEmbed = new Discord.MessageEmbed()
                .setTitle('Level up!')
                .setColor('GREEN')
                .addFields({
                    name: "Well done!",
                    value: `You just advanced to level \`${user.level}\`, <@${userid}>!`
                })
                .setThumbnail(yaygif)
                .setFooter('XP: You get XP by messaging on this discord server, spamming will not give you XP! GIFs are powered by GIPHY')
            message.channel.send(LevelUpEmbed)
        }
    }
}