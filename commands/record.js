const db = require('../db')
const Discord = require('discord.js')
const fs = require('fs')
const {
    client
} = require('../main')

module.exports = {
    name: 'record',
    description: 'record',
    category: 'Fun',
    aliases: ['rec'],
    cooldown: '2s',
    async execute(message, args) {

        var denytimervalue = await db.get(`denyrecord-${message.author.id}`)
        if (typeof denytimervalue === 'number') return message.channel.send('Sorry, you\'re denied to use that feature for ' + denytimervalue + ' more seconds due to: `Anti system abuse`')

        const voicechannel = message.member.voice.channel
        if (!voicechannel) return message.channel.send('Sorry, you need to be in a VC to use that command!')

        if (fs.existsSync(`./record-${message.author.id}`)) {
            fs.unlinkSync(`./record-${message.author.id}`)
        }

        await message.member.voice.channel.join().then((connection) => {
            const receiver = connection.receiver.createStream(message.member, {
                mode: 'pcm',
                end: 'manual'
            })

            const writer = receiver.pipe(fs.createWriteStream(`./record-${message.author.id}.pcm`))

            var deniedtimer = setTimeout(async () => {
                await db.set(`shortholdtime-${message.author.id}`, true)
                writer.end()
                message.channel.send('Sorry, I stopped recording because your recording was over 30 minutes long! Because of this, your recording is going to be deleted in 10 minutes instead of 30. To stop you from abusing this system, you will not be able to use the record feature for another 15 minutes.')
                await db.set(`denyrecord-${message.author.id}`, 0)
                var deniedtimertime = setInterval(async () => {
                    var deniedtimeleft = await db.get(`denyrecord-${message.author.id}`)
                    if (deniedtimeleft >= 900) return async () => {
                        clearInterval(deniedtimertime)
                        await db.set(`denyrecord-${message.author.id}`, 'false')
                    }
                    await db.set(`denyrecord-${message.author.id}`, deniedtimeleft + 1)
                })
            }, 30 * 1000 * 60)

            writer.on('finish', async () => {
                if (message.member.voice.channel !== null) {
                    message.member.voice.channel.leave()
                } else {
                    var vcdata = await db.get(`vcdatarecord-${message.author.id}`)
                    var vcdatachannel = message.guild.channels.cache.get(vcdata)
                    vcdatachannel.leave()
                }
                clearTimeout(deniedtimer)
                if (await db.has(`shortholdtime-${message.author.id}`)) {
                    message.channel.send('I finished recording because either I got disconnected, you left the voice chat or I forcibly stopped the recording. I attached the recording to this message. To play back your recording in a vc, use the command rplay. Your recording will be deleted in 30 minutes due to performance and privacy reasons (From my server, which means you won\'t be able to play the recording back but you will be able to listen to it via the attachment). The recording attached is pcm raw audio data, if you want to encode this into a wav/mp3 file, you can find many websites that will do this.')
                    var attachment = new Discord.MessageAttachment(`./record-${message.author.id}.pcm`)
                    message.channel.send(attachment)
                    setTimeout(() => {
                        fs.unlinkSync(`./record-${message.author.id}.pcm`)
                    }, 30 * 1000 * 60)
                } else {
                    setTimeout(() => {
                        fs.unlinkSync(`./record-${message.author.id}.pcm`)
                    }, 10 * 1000 * 60)
                }
            })
            client.on('voiceStateUpdate', async (oldState, newState) => {
                if (oldState.channelID === null) return;
                if ((client.users.cache.get(oldState.id)).bot) return;
                if (!newState.channelID === null) return;
                await db.set(`vcdatarecord-${message.author.id}`, oldState.channelID)
                writer.close()
            })
        })
    }
}