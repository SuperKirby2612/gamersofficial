const fs = require('fs')
const db = require('../db')

module.exports = {
    name: 'rplay',
    description: 'rplay',
    category: 'Fun',
    aliases: ['recordplay'],
    async execute(message, args) {
        const voicechannel = message.member.voice.channel
        if (!voicechannel) return message.channel.send('Sorry, you need to be in a VC to use that command!')

        try {
            await message.member.voice.channel.join().then(async (connection) => {
                if (message.author.id === '771374646540501032') {
                    // Kamil
                    const knum = await db.get("currentrnum-k")
                    const stream = fs.createReadStream(`D:/VoiceExp/kamil-${knum}.pcm`)

                    const dispatcher = connection.play(stream, {
                        type: 'converted'
                    })

                    dispatcher.on('finish', () => {
                        message.member.voice.channel.leave()
                        message.channel.send('I finished playing back your recording.')
                    })
                }
                else if (message.author.id === '695228246966534255') {
                    //Luca
                    const lnum = await db.get("currentrnum-l")
                    const stream = fs.createReadStream(`D:/VoiceExp/luca-${lnum}.pcm`)

                    const dispatcher = connection.play(stream, {
                        type: 'converted'
                    })

                    dispatcher.on('finish', () => {
                        message.member.voice.channel.leave()
                        message.channel.send('I finished playing back your recording.')
                    })
                } else {
                    message.member.voice.channel.leave()
                    message.channel.send('Sorry, right now this feature is in experimental mode and only selected people can use it!')
                }
            })
        } catch (e) {
            message.member.voice.channel.leave()
            message.channel.send('Sorry, something went wrong: ' + e)
            console.log(e)
        }
    }
}