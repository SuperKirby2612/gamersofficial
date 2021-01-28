const Discord = require('discord.js')
const {
    loadImage,
    createCanvas
} = require('canvas')
const request = require('node-superfetch')

module.exports = {
    name: 'weird',
    description: 'Distorts an image by adding the weirdify effect! Syntax: Upload a photo with the comment -g wrd',
    category: 'Fun',
    aliases: ['wrd'],
    async execute(message, args, client) {
        
        let attachments = message.attachments.array()
        if (attachments.length === 0) return message.channel.send('Please send an image and then attach the comment: -g wrd')
        else if (attachments.length > 1) return message.channel.send('Sorry, I can only weirdify one image at a time')


        var level = 5
        try {
            message.channel.startTyping(true)

            const {
                body
            } = await request.get(attachments[0].url)
            const data = await loadImage(body)
            const canvas = createCanvas(data.width, data.height)
            const ctx = canvas.getContext("2d")
            await ctx.drawImage(data, 0, 0)
            await fishEye(ctx, level, 0, 0, data.width, data.height)
            const attachment = canvas.toBuffer()
            await message.channel.stopTyping(true)
            if (Buffer.byteLength(attachment) > 8e+6) return message.channel.send('Sorry, that image is too big!, try using https://compressjpeg.com/ to compress it!')
            var randomnum1 = Math.floor(Math.random * 2045) + 1
            message.delete()
            return message.channel.send({files: [{attachment, name: `wrd${randomnum1}.png`}]})
            
        } catch (error) {
            await message.channel.stopTyping(true)
            message.delete()
            return message.channel.send(`Oh no, An error occured: ${error.message}`)
        }
        function fishEye(ctx, level, x, y, width, height) {
            const frame = ctx.getImageData(x, y, width, height)
            const source = new Uint8Array(frame.data)

            for (let i = 0; i < frame.data.length; i += 4) {
                const sx = (i / 4) % frame.width
                const sy = Math.floor(i/ 4/ frame.width)

                const dx = Math.floor(frame.width / 2) - sx
                const dy = Math.floor(frame.height / 2) - sy

                const dist = Math.sqrt((dx * dx) + (dy * dy))

                const x2 = Math.round((frame.width / 2) - (dx * Math.sin(dist / (level * Math.PI) / 2)))
                const y2 = Math.round((frame.height / 2) - (dx * Math.sin(dist / (level * Math.PI) / 2)))
                const i2 = ((y2 * frame.width) + x2) * 4

                frame.data[i] = source[i2]
                frame.data[i + 1] = source[i2 + 1]
                frame.data[i + 2] = source[i2 + 2]
                frame.data[i + 3] = source[i2 + 3]
            }

            ctx.putImageData(frame, x, y)
            return ctx;
        }
    }
}