const fs = require('fs')
const db = require('../db')

module.exports = {
    name: 'rplayfirst',
    description: 'rplayfirst',
    category: 'Fun',
    aliases: ['rpf', 'playfirst'],
    cooldown: '2s',
    slash: 'both',
    async execute(message, args) {
        const voicechannel = message.member.voice.channel
        if (!voicechannel) return message.channel.send('Sorry, you need to be in a VC to use that command!')

        try {
            await message.member.voice.channel.join().then(async (connection) => {
                const firstttsdispatcher = connection.play('../VoiceExp/firstrec.mp3')
                firstttsdispatcher.on('finish', () => {
                    setTimeout(async () => {
                        if (message.author.id === '771374646540501032') {
                            const firststream = fs.createReadStream('../VoiceExp/kamil-1.pcm')
                            const firstdispatcher = connection.play(firststream, {
                                type: 'converted'
                            })
                            firstdispatcher.on('finish', async () => {
                                setTimeout(async () => {
                                    const recentttsdispatcher = connection.play('../VoiceExp/latestrec.mp3')
                                    recentttsdispatcher.on('finish', async () => {
                                        setTimeout(async () => {
                                            // Kamil
                                            const knum = await db.get("currentrnum-k")
                                            const stream = fs.createReadStream(`../VoiceExp/kamil-${knum}.pcm`)

                                            const dispatcher = connection.play(stream, {
                                                type: 'converted'
                                            })

                                            dispatcher.on('finish', () => {
                                                setTimeout(async () => {
                                                    message.member.voice.channel.leave()
                                                    message.channel.send('I finished playing back your recording.')
                                                }, 1000)
                                            })
                                        }, 1000)
                                    })
                                }, 1000)
                            })
                        } else if (message.author.id === '695228246966534255') {
                            const firststream = fs.createReadStream('../VoiceExp/luca-1.pcm')
                            const firstdispatcher = connection.play(firststream, {
                                type: 'converted'
                            })
                            firstdispatcher.on('finish', async () => {
                                setTimeout(async () => {
                                    const recentttsdispatcher = connection.play('../VoiceExp/latestrec.mp3')
                                    recentttsdispatcher.on('finish', async () => {
                                        setTimeout(async () => {
                                            //Luca
                                            const lnum = await db.get("currentrnum-l")
                                            const stream = fs.createReadStream(`../VoiceExp/luca-${lnum}.pcm`)

                                            const dispatcher = connection.play(stream, {
                                                type: 'converted'
                                            })

                                            dispatcher.on('finish', () => {
                                                setTimeout(async () => {
                                                    message.member.voice.channel.leave()
                                                    message.channel.send('I finished playing back your recording.')
                                                }, 1000)
                                            })
                                        })
                                    })
                                }, 1000)
                            })
                        } else {
                            message.member.voice.channel.leave()
                            message.channel.send('Sorry, right now this feature is in experimental mode and only selected people can use it!')
                        }
                    }, 1000)
                })
            })
        } catch (e) {
            message.member.voice.channel.leave()
            message.channel.send('Sorry, something went wrong: ' + e)
            console.log(e)
        }
    }
}