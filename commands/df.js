const {
    createCanvas,
    loadImage
} = require("canvas")
const request = require("node-superfetch")

module.exports = {
    name: 'Deep-fry',
    description: 'Deep-fries an image',
    category: 'Fun',
    aliases: ['deepfry', 'df', 'deep-fry'],
    async execute(message, args, client, PREFIX) {
        let image = message.attachments.array()
        if (image.length === 0) return message.channel.send(`Please send an image and then attach the comment: -g df`)
        else if (image.length > 1) return message.channel.send('Sorry, I can only deep-fry one image at a time!')
        try {
            message.channel.startTyping(true)
            const {
                body
            } = await request.get(image[0].url)
            const data = await loadImage(body)
            const canvas = createCanvas(data.width, data.height)
            const ctx = canvas.getContext("2d")
            ctx.drawImage(data, 0, 0)
            desaturate(ctx, -20, 0, 0, data.width, data.height)
            contrast(ctx, 0, 0, data.width, data.height)
            const attachment = canvas.toBuffer('image/jpeg', {
                quality: 0.2
            })
            await message.channel.stopTyping(true)
            if (Buffer.byteLength(attachment) > 8e+6) return message.channel.send("Sorry, that image is too big!, try using this (https://compressjpeg.com/)"), message.delete()
            var RandomNum = Math.floor(Math.random() * 2045) + 1
            message.delete()
            return message.channel.send({
                files: [{
                    attachment,
                    name: `df${RandomNum}.jpeg`
                }]
            })
        } catch (error) {
            await message.channel.stopTyping(true)
            message.delete()
            return message.channel.send(`Oh no, An error occured: ${error.message}`)
        }

        function contrast(ctx, x, y, width, height) {
            const data = ctx.getImageData(x, y, width, height)
            const factor = (259 / 100) + 1
            const intercept = 128 * (1 - factor)
            for (let i = 0; i < data.data.length; i += 4) {
                data.data[i] = (data.data[i] * factor) + intercept
                data.data[i + 1] = (data.data[i + 1] * factor) + intercept
                data.data[i + 2] = (data.data[i + 2] * factor) + intercept
            }
            ctx.putImageData(data, x, y)
            return ctx
        }

        function desaturate(ctx, level, x, y, width, height) {
            const data = ctx.getImageData(x, y, width, height)
            for (let i = 0; i < height; i++) {
                for (let j = 0; j < width; j++) {
                    const dest = ((i * width) + j) * 4;
                    const grey = Number.parseInt((0.2125 * data.data[dest]) + (0.7154 * data.data[dest + 1]) + (0.0721 * data.data[dest + 2]), 10)
                    data.data[dest] += level * (grey - data.data[dest])
                    data.data[dest + 1] += level * (grey - data.data[dest + 1])
                    data.data[dest + 2] += level * (grey - data.data[dest + 2])
                }
            }
            ctx.putImageData(data, x, y)
            return ctx
        }
    }
}