const Discord = require('discord.js')
const db = require('../db')
const giveaway = require('../utils/givewayClient')

module.exports = {
    name: 'reroll',
    description: 'reroll',
    category: 'Fun',
    aliases: ['rerollgiveaway', 'rerollgive', 'givereroll', 'giveawayreroll', 'greroll'],
    async execute(message, args) {
        const filter = m => m.author.id === message.author.id
        message.channel.send('Would you like to cancel the most recent giveaway or a specific giveaway? (Respond with R for recnt or S for specific)')
        const specifycollector = message.channel.createMessageCollector(filter, {
            time: 60000,
            max: 1
        })

        specifycollector.on('collect', async (m) => {
            if (m.content === 'S') {
                message.channel.send('Please tell me the message id of the giveaway message. For help, here is how to get a message id: https://www.followchain.org/copy-message-id-discord/')
                const idcollector = message.channel.createMessageCollector(filter, {
                    time: 60000,
                    max: 1
                })
                idcollector.on('collect', async m => {
                    if (m.content.length !== 18) return message.channel.send('Sorry, that\'s not a valid discord message id!')
                    message.channel.send('Rerolling your giveaway... If nothing happens, it means that either there were no reactions on the message or the message id is invalid.')
                    giveaway.reroll(m.content)
                        .catch((e) => {
                            message.channel.send('Something went wrong: ' + e)
                        })
                })
                idcollector.on('end', async collected => {
                    if (collected.size === 0) return message.channel.send('Cancelling the giveaway reroll process because you didn\'t respond in time...')
                })
            } else if (m.content === 'R') {
                const data = giveaway.getCurrentGiveaways(false, false, message)
                if (data.size === 0) return message.channel.send('Sorry, there are no non-activated giveaways currently in this guild!')
                var msgid = data[data.size].MessageID
                message.channel.send('Rerolling your giveaway...')
                giveaway.reroll(msgid)
            } else {
                return message.channel.send('That\'s not one of the specified options!')
            }
        })
    }
}