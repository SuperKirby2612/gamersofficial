const fs = require('fs')

module.exports = {
    name: 'rplay',
    description: 'rplay',
    category: 'Fun',
    aliases: ['recordplay'],
    async execute(message, args) {
        const voicechannel = message.member.voice.channel
        if (!voicechannel) return message.channel.send('Sorry, you need to be in a VC to use that command!')
        if (!fs.existsSync(`./record-${message.author.id}.pcm`)) return message.channel.send('Sorry, you don\'t have any recorded audio linked to your id!')

        try {
            await message.member.voice.channel.join().then((connection) => {
                const stream = fs.createReadStream(`./record-${message.author.id}.pcm`)

                const dispatcher = connection.play(stream, {
                    type: 'converted'
                })

                dispatcher.on('finish', () => {
                    message.member.voice.channel.leave()
                    message.channel.send('I finished playing back your recording.\nI will delete it in 5 minutes due to performance and privacy reasons.')
                    setTimeout(() => {
                        fs.unlinkSync(`./record-${message.author.id}.pcm`)
                    }, 5 * 1000 * 60)
                })
            })
        } catch (e) {
            message.member.voice.channel.leave()
            message.channel.send('Sorry, something went wrong: ' + e)
            console.log(e)
        }
    }
}