const Discord = require('discord.js')
const giveaway = require('../utils/givewayClient')
const ms = require('ms')

module.exports = {
    name: 'gnew',
    description: 'gnew feature lol',
    category: 'Fun',
    aliases: ['giveawaynew', 'givenew', 'newgiveaway', 'newgive'],
    slash: 'both',
    async execute(message, args) {
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('Sorry, you don\'t have the correct permissions to do that! `(MANAGE_CHANNELS)`')
        const filter = m => m.author.id === message.author.id
        const channelraw = args[0]
        if (!channelraw) {
            message.channel.send('🥳 So, let\'s get started with making your new giveaway! What is the channel that you want the giveaway to be in? 🥳')
            const collectorchannel = message.channel.createMessageCollector(filter, {
                time: 60000,
                max: 1
            });
            collectorchannel.on('collect', m => {
                var channel = m.mentions.channels.first()
                if (!channel) return message.channel.send('Sorry, that\'s not a channel!')
                message.channel.send('Ok! Now, what\'s the ending time for your giveaway? (Try using things like 5m or 1h to help you out!)')
                const collectortime = message.channel.createMessageCollector(filter, {
                    time: 60000,
                    max: 1
                });
                collectortime.on('collect', m => {
                    var timetest = parseInt(m.content)
                    if (isNaN(timetest)) return message.channel.send('Sorry, that\'s not a number!')
                    var time = ms(m.content)
                    message.channel.send('Ok, what\'s the description for your giveaway?')
                    const collectordesc = message.channel.createMessageCollector(filter, {
                        time: 60000,
                        max: 1
                    })
                    collectordesc.on('collect', m => {
                        var desc = m.content
                        if (desc.length > 400) return message.channel.send('Sorry, that\'s too long! The limit for the prize name is 400 characters!')
                        message.channel.send('How many winners will there be?')
                        const collectorwin = message.channel.createMessageCollector(filter, {
                            time: 60000,
                            max: 1
                        })
                        collectorwin.on('collect', m => {
                            var winners = parseInt(m.content)
                            if (isNaN(winners)) return message.channel.send('Sorry, that\'s not a number!')
                            if (winners > 15 || winners < 1) return message.channel.send('Sorry, I only accept numbers between 1 and 15!')
                            message.channel.send('🎉 And most importantly, what\'s your prize? 🎉')
                            const collectorprize = message.channel.createMessageCollector(filter, {
                                time: 60000,
                                max: 1
                            })
                            collectorprize.on('collect', m => {
                                var prize = m.content
                                if (prize.length > 150) return message.channel.send('Sorry, that\'s too long! The limit for the prize name is 150 characters!')
                                giveaway.start({
                                    channel: channel,
                                    time: time,
                                    hostedBy: message.author,
                                    description: desc,
                                    winners: winners,
                                    prize: prize
                                })
                            })
                            collectorprize.on('end', collected => {
                                if (collected.size === 0) return message.channel.send('Cancelling the giveaway creation process because you didn\'t respond in time...')
                            })
                        })
                        collectorwin.on('end', collected => {
                            if (collected.size === 0) return message.channel.send('Cancelling the giveaway creation process because you didn\'t respond in time...')
                        })
                    })
                    collectordesc.on('end', collected => {
                        if (collected.size === 0) return message.channel.send('Cancelling the giveaway creation process because you didn\'t respond in time...')
                    })
                })
                collectortime.on('end', collected => {
                    if (collected.size === 0) return message.channel.send('Cancelling the giveaway creation process because you didn\'t respond in time...')
                })
            })
            collectorchannel.on('end', collected => {
                if (collected.size === 0) return message.channel.send('Cancelling the giveaway creation process because you didn\'t respond in time...')
            })
        }
    }
}