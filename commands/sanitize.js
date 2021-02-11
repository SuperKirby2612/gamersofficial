const swearjar = require('swearjar_modified')
const db = require('../db')

module.exports = {
    name: 'sanitize',
    description: 'Cleans a channel (Removes any innapropiate language from past messages)',
    category: 'Moderation',
    aliases: ['sanitise', 'clean'],
    async execute(message, args) {
        var channel = message.mentions.channels.first() || message.channel
        channel.send('🧹 Starting cleanup...')
            .then(msg => {
                setTimeout(() => {
                    msg.edit('🍽 Cleaning the dishes...')
                        .then(msg1 => {
                            setTimeout(() => {
                                msg1.edit('🦠 Checking for covid-19...')
                                    .then(msg2 => {
                                        setTimeout(() => {
                                            const randomnum = Math.floor(Math.random() * 2)
                                            if (randomnum === 1) {
                                                msg2.edit('🦠 Bad news! We found some covid-19! Disinfecting... 🤿')
                                                    .then(msg3 => {
                                                        setTimeout(() => {
                                                            const randomnum1 = Math.floor(Math.random() * 2)
                                                            if (randomnum1 === 1) {
                                                                msg3.edit('💉 Uh oh! We disinfected this channel but couldn\'t cure everyone!')
                                                                    .then(msg4 => {
                                                                        setTimeout(() => {
                                                                            msg4.edit('⚗ Please wait, we are waiting for symptoms to pass...')
                                                                                .then(msg5 => {
                                                                                    setTimeout(() => {
                                                                                        msg5.edit('💊 Everyone\'s symptoms have passed!')
                                                                                            .then(msg => {
                                                                                                setTimeout(async () => {
                                                                                                    msg.edit('💬 Checking for any cases of Swearge (The urge to swear) in the last 100 messages...')
                                                                                                    await checkMessages(msg, channel)
                                                                                                }, 5000)
                                                                                            })
                                                                                    }, 5000)
                                                                                })
                                                                        }, 10000)
                                                                    })
                                                            } else {
                                                                msg3.edit('🧪 Good news! We disinfected this channel and cured everyone!')
                                                                    .then(msg41 => {
                                                                        setTimeout(async () => {
                                                                            msg41.edit('💬 Checking for any cases of Swearge (The urge to swear) in the last 100 messages...')
                                                                            await checkMessages(msg, channel)
                                                                        }, 5000)
                                                                    })
                                                            }
                                                        }, 5000)
                                                    })
                                            } else {
                                                msg2.edit('🦠 Good news! No covid-19 found.')
                                                    .then(msg31 => {
                                                        setTimeout(async () => {
                                                            msg31.edit('💬 Checking for any cases of Swearge (The urge to swear) in the last 100 messages...')
                                                            await checkMessages(msg, channel)
                                                        }, 5000)
                                                    })
                                            }
                                        }, 5000)
                                    })
                            }, 5000)
                        })
                }, 5000)
            })
    }
}
async function checkMessages(msgtoedit, channel) {
    await channel.messages.fetch({
        limit: 100
    }).then(async messages => {
        setTimeout(async () => {
            await messages.forEach(async message1 => {
                if (swearjar.profane(message1.content)) {
                    message1.delete()
                }
            })
                msgtoedit.edit(`✨ Good news! We found disinfected all cases of Swearge in this channel!`)
        }, 5000)
    })
}