const db = require('../db')

module.exports = {
    name: 'dstweets',
    description: 'dstweets',
    category: 'Misc',
    slash: 'both',
    async execute(message, args) {
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('Sorry, you don\'t have the correct permissions to do that! `(MANAGE_CHANNELS)`')
        var channel = message.mentions.channels.first() || message.channel
        if (!await db.has(`tweetstream-${message.guild.id}-${channel.id}`)) return message.channel.send(`Sorry, there isn\'t a tweet stream in <#${channel.id}>!`)
        else {
            var hashtag = await db.get(`tweetstream-${message.guild.id}-${channel.id}`)
            await db.delete(`tweetstream-${message.guild.id}-${channel.id}`)
            message.channel.send(`I removed the \`${hashtag}\` tweetstream from <#${channel.id}>!`)
        }
    }
}