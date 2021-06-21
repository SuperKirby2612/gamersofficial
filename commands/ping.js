const Discord = require('discord.js')
const giphyRandom = require('giphy-random')
const { createClient } = require('pexels')
const captchacheck = require('../utils/captcha')

module.exports = {
    name: 'ping',
    description: "this is a ping command!",
    category: 'Fun',
    async execute(message, args, client, instance) {
        message.channel.send("Pong!")
    }
}