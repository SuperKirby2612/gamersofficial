const db = require('../db')
const Discord = require('discord.js')
const fs = require('fs')
const {
    client
} = require('../main')
const {
    MessageButton,
    MessageActionRow
} = require('discord-buttons');
const disbut = require('discord-buttons')

module.exports = {
    name: 'record',
    description: 'record',
    category: 'Fun',
    aliases: ['rec'],
    cooldown: '2s',
    async execute(message, args) {
        const voicechannel = message.member.voice.channel
        if (!voicechannel) message.channel.send("You need to be in a voice channel to use that command!")

        const connection = await message.member.voice.channel.join()
        const receiver = connection.receiver.createStream(message.member, {
            mode: 'pcm',
            end: "silence"
        })
        if (message.author.id = '771374646540501032') {
            const knum = await db.get("currentrnum-k")
            await db.set("currentrnum-k", (knum + 1))
            const writer = receiver.pipe(fs.createWriteStream(`D:/VoiceExp/kamil-${knum}.pcm`))
            writer.on("finish", () => {
                message.member.voice.channel.leave()
                message.channel.send("Finished recording. Saved to D:/VoiceExp. To play back audio, please use .rplay. To play back the first audio, please use .rplayfirst.")
            })
        }
        if (message.author.id = '695228246966534255') {
            const lnum = await db.get("currentrnum-l")
            await db.set("currentrnum-l", (lnum + 1))
            const writer = receiver.pipe(fs.createWriteStream(`D:/VoiceExp/luca-${lnum}.pcm`))
            writer.on("finish", () => {
                message.member.voice.channel.leave()
                message.channel.send("Finished recording. Saved to D:/VoiceExp. To play back audio, please use .rplay. To play back the first audio, please use .rplayfirst.")
            })
        }

    }
}