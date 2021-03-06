const Twitter = require('twitter');
const tclienthelper = require('../main')
const client = require('../main')
const Discord = require('discord.js')
const db = require('../db')
const swearjar = require('swearjar_modified')

module.exports = {
    name: 'streamtweets',
    description: 'streamtweets',
    category: 'Misc',
    aliases: ['streamtweet', 'tweetstream', 'tweetsstream',],
    slash: 'both',
    async execute(message, args) {
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('Sorry, you don\'t have the correct permissions to do that! `(MANAGE_CHANNELS)`')
        var hashtag = args[0]
        if (!hashtag) return message.channel.send('Please specify a hashtag!')
        if (!hashtag.startsWith('#')) return message.channel.send('That\'s not a hashtag, it doesn\'t start with #')
        var stream = tclienthelper.tclient.stream('statuses/filter', {
            track: hashtag
        });
        var channel = message.mentions.channels.first() || message.channel
        if (await db.has(`tweetstream-${message.guild.id}-${channel.id}`)) return message.channel.send(`Sorry, there\'s already a tweet stream in <#${channel.id}>. You can disable it with the command dstweets <#channel>!`)
        await db.set(`tweetstream-${message.guild.id}-${channel.id}`, hashtag)
        message.channel.send(`Streaming all tweets that include ${hashtag} to <#${channel.id}>. You can disable this with the command dstweets <#channel>`)
        stream.on('data', async function (event) {
            var lasttweet = await db.get(`lasttweettime-${message.guild.id}-${channel.id}`)
            if (lasttweet === undefined) {
                await db.set(`lasttweettime-${message.guild.id}-${channel.id}`, 'false')
            }
            if ((Date.now() - lasttweet) < 30000 || lasttweet === 'false') return;
            await db.set(`lasttweettime-${message.guild.id}-${channel.id}`, Date.now())
            if ((parseInt(event.timestamp_ms) - Date.now()) > 60000) return;
            if (event.filter_level !== 'low') return;
            if (swearjar.profane(event.text) && await db.has(`swear-${message.guild.id}`) && !await db.has(`censor-${message.guild.id}`)) return;
            if (await db.has(`censor-${message.guild.id}`)) {
                var streamembed = new Discord.MessageEmbed()
                    .setTitle('New Tweet by a verified user!')
                    .setColor('#08a0e9')
                    .setURL(`https://www.twitter.com/${event.user.screen_name}/status/${event.id_str}`)
                    .setThumbnail(event.user.profile_image_url)
                    .addField(`${event.user.screen_name} says...`, swearjar.censor(event.text))
                    .setTimestamp()
                channel.send(streamembed)
            } else {
                if (event.user.verified) {
                    var streamembed = new Discord.MessageEmbed()
                        .setTitle('New Tweet by a verified user!')
                        .setColor('#08a0e9')
                        .setURL(`https://www.twitter.com/${event.user.screen_name}/status/${event.id_str}`)
                        .setThumbnail(event.user.profile_image_url)
                        .addField(`${event.user.screen_name} says...`, event.text)
                        .setTimestamp()
                    channel.send(streamembed)
                } else {
                    var streamembed = new Discord.MessageEmbed()
                        .setTitle('New Tweet!')
                        .setColor('#08a0e9')
                        .setURL(`https://www.twitter.com/${event.user.screen_name}/status/${event.id_str}`)
                        .setThumbnail(event.user.profile_image_url)
                        .addField(`${event.user.screen_name} says...`, event.text)
                        .setTimestamp()
                    channel.send(streamembed)
                }
            }
        });

        stream.on('error', function (error) {
            console.log(error)
        });
    }
}