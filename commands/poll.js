const Discord = require("discord.js");

module.exports = {
    name: 'Poll',
    description: 'Makes an advanced poll. Syntax: -g poll',
    category: 'Misc',
    async execute(message, args, client) {
        let q = args.join(' ')
        if (!q) return message.channel.send('Incorrect syntax! Please state the question! Syntax: -g poll [Question]')
        
        message.channel.send(`How many answers will there be to the question? e.x: 3`).then(msg => {
            const filter1 = m => message.author.id === m.author.id
            setTimeout(() => {
                msg.delete()
            }, 60000)
            message.delete()
            message.channel.awaitMessages(filter1, {
                    time: 60000,
                    max: 1,
                    errors: ['time']
                })
                .then(messages => {
                    let answernum = messages.first().content
                    if (isNaN(answernum)) {
                        return message.channel.send("Sorry, that's not a number!")
                    }
                    if (answernum > 9) {
                        return message.channel.send('Sorry, I cannot handle polls with more than 9 answers!')
                    }
                    if (answernum <= 1) {
                        return message.channel.send('You have to include at least two answers! (obviously)')
                    }
                })
        })
        setTimeout(() => {
            message.channel.send(`Add some answers to your question! Correct format: \nTest 1\nTest2\nTest3\n`).then(async msg => {
                const filter = m => message.author.id === m.author.id;
                let answers = null
                setTimeout(() => {
                    msg.delete();
                }, 60000)

                message.channel.awaitMessages(filter, {
                        time: 60000,
                        max: 1,
                        errors: ['time']
                    })
                    .then(messages => {
                        let answers = messages.first().content
                    })
                    .catch(() => {
                        setTimeout(() => {
                            if (answers = null) {
                                return message.channel.send('Sorry, the session timed out because you did not send a message!')
                            }
                        }, 59000)
                    })
                    setTimeout(async () => {
                const pollembed = new Discord.MessageEmbed()
                    .setTitle(q)
                    .setDescription(answers)
                message.channel.send(pollembed)
                if (answernum = 2) {
                    await message.react('1️⃣')
                    await message.react('2️⃣')
                } else if (answernum = 3) {
                    await message.react('1️⃣')
                    await message.react('2️⃣')
                    await message.react('3️⃣')
                } else if (answernum = 4) {
                    await message.react('1️⃣')
                    await message.react('2️⃣')
                    await message.react('3️⃣')
                    await message.react('4️⃣')
                } else if (answernum = 5) {
                    await message.react('1️⃣')
                    await message.react('2️⃣')
                    await message.react('3️⃣')
                    await message.react('4️⃣')
                    await message.react('5️⃣')
                } else if (answernum = 6) {
                    await message.react('1️⃣')
                    await message.react('2️⃣')
                    await message.react('3️⃣')
                    await message.react('4️⃣')
                    await message.react('5️⃣')
                    await message.react('6️⃣')
                } else if (answernum = 7) {
                    await message.react('1️⃣')
                    await message.react('2️⃣')
                    await message.react('3️⃣')
                    await message.react('4️⃣')
                    await message.react('5️⃣')
                    await message.react('6️⃣')
                    await message.react('7️⃣')
                } else if (answernum = 8) {
                    await message.react('1️⃣')
                    await message.react('2️⃣')
                    await message.react('3️⃣')
                    await message.react('4️⃣')
                    await message.react('5️⃣')
                    await message.react('6️⃣')
                    await message.react('7️⃣')
                    await message.react('8️⃣')
                } else if (answernum = 9) {
                    await message.react('1️⃣')
                    await message.react('2️⃣')
                    await message.react('3️⃣')
                    await message.react('4️⃣')
                    await message.react('5️⃣')
                    await message.react('6️⃣')
                    await message.react('7️⃣')
                    await message.react('8️⃣')
                    await message.react('9️⃣')
                }
            }, 60050)
        })
        }, 60000)
    }
}