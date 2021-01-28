const Discord = require('discord.js');
const download = require('image-downloader')
const dig = require('discord-image-generation')
const got = require('got')
const fs = require(`fs`);

module.exports = {
    name: 'triggered',
    description: 'Triggers an image.',
    category: 'Fun',
    async execute(message, args) {
        try {
            var image = message.attachments.array()
            if (image.length === 0) {
                message.delete()
                return message.channel.send(`Please send an image and then attach the comment: -g triggered`)
            } else if (image.length > 1) {
                message.delete()
                return message.channel.send('Sorry, I can only trigger one image at a time!')
            }
            if (!message.attachments.first().name.endsWith('jpg')) {
                if (!message.attachments.first().name.endsWith('png')) {
                    if (!message.attachments.first().name.endsWith('jpeg')) {
                        message.delete()
                        return message.channel.send('Sorry, I only accept png, jpg and jpeg as image formats!')
                    }
                }
            }
            var img = await new dig.Triggered().getImage(`${message.attachments.first().url}`)
            var triggernum = Math.floor(Math.random() * 2055) + 1
            var triggerattach = new Discord.MessageAttachment(img, `triggered${triggernum}.gif`);
            message.delete()
            message.channel.send(triggerattach)
        } catch (e) {
            message.delete()
            message.channel.send(`Error: ${e}`)
            console.log(e)
        }
    }
}