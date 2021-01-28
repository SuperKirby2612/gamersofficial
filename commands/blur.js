const Discord = require('discord.js');
const download = require('image-downloader')
const dig = require('discord-image-generation')
const got = require('got')
const fs = require(`fs`);

module.exports = {
    name: 'blur',
    description: 'Blurs an image.',
    category: 'Fun',
    async execute(message, args) {
        try {
            var image = message.attachments.array()
            if (image.length === 0) {
                message.delete()
                return message.channel.send(`Please send an image and then attach the comment: -g blur`)
            } else if (image.length > 1) {
                message.delete()
                return message.channel.send('Sorry, I can only blur one image at a time!')
            }
            if (!message.attachments.first().name.endsWith('jpg')) {
                if (!message.attachments.first().name.endsWith('png')) {
                    if (!message.attachments.first().name.endsWith('jpeg')) {
                        message.delete()
                        return message.channel.send('Sorry, I only accept png, jpg and jpeg as image formats!')
                    }
                }
            } else {
                var fileext;
                if (message.attachments.first().name.endsWith('png')) {
                    fileext = 'png';
                }
                if (message.attachments.first().name.endsWith('jpg')) {
                    fileext = 'jpg';
                }
            }
            var argsnum = parseInt(args)
            if (isNaN(argsnum)) {
                message.delete()
                return message.channel.send('The level you specified is not a number! (From 1 to 100)')
            }
            if (argsnum > 100) {
                message.delete()
                return message.channel.send('Sorry, the maximum amount I can blur photos by is 100!')
            }
            if (argsnum < 1) {
                message.delete()
                return message.channel.send('Sorry, the minimum amount I can blur photos by is 1! ')
            }
            var img = await new dig.Blur().getImage(`${message.attachments.first().url}`, argsnum)
            var blurnum = Math.floor(Math.random() * 2055) + 1
            var blurattach = new Discord.MessageAttachment(img, `blur${blurnum}.${fileext}`);
            message.delete()
            message.channel.send(blurattach)
        } catch (e) {
            message.delete()
            message.channel.send(`Error: ${e}`)
            console.log(e)
        }
    }
}