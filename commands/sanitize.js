const swearjar = require('swearjar_modified')
const db = require('../db')

module.exports = {
    name: 'sanitize',
    description: 'Cleans a channel (Removes any innapropiate language from past messages)',
    category: 'Moderation',
    aliases: ['sanitise', 'clean'],
    async execute(message, args) {
        message.channel.send('ok')
        .then(msg => {
            return checkMessages(message, msg)
        })
        message.channel.send('🧹 Starting cleanup...')
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
                                                                                                    await checkMessages(message, msg)
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
                                                                            await checkMessages(message, msg)
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
                                                            await checkMessages(message, msg)
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
async function checkMessages(message, msgtoedit) {
    await message.channel.messages.fetch({
        limit: 100
    }).then(async messages => {
        setTimeout(async () => {
            console.log('CHECKPOINT 1')
            await db.set(`swearcounter-${message.guild.id}-${message.channel.id}`, '0')
            console.log('CHECKPOINT 2')
            await messages.forEach(async message1 => {
                var profanenumval = parseInt(await db.get(`swearcounter-${message.guild.id}-${message.channel.id}`))
                if (swearjar.profane(message1.content)) {
                    message1.delete()
                    var value = (profanenumval + 1).toString()
                    await db.set(`swearcounter-${message.guild.id}-${message.channel.id}`, value)
                }
            })
            console.log('CHECKPOINT 3')
            console.log(await db.get(`swearcounter-${message.guild.id}-${message.channel.id}`))
            var stuff = await db.get(`swearcounter-${message.guild.id}-${message.channel.id}`)
            var profanenumval = parseInt(stuff.match(/\d+/g).map(Number))
            console.log(profanenumval)
            if (profanenumval === 0 || profanenumval === undefined) {
                msgtoedit.edit(`✨ Good news! We found no cases of Swearge in this channel!`);
            } else {
                msgtoedit.edit(`🧨 We found ${profanenumval} cases of Swearge. Cured all cases of Swearge (Deleted all innapropiate messages)`);
            }
            console.log('CHECKPOINT 4')
            await db.delete(`swearcounter-${message.guild.id}-${message.channel.id}`)
            console.log('CHECKPOINT 5')
        }, 5000)
    })
}