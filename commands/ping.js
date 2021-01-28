const Discord = require('discord.js')

module.exports = {
    name: 'ping',
    description: "this is a ping command!",
    category: 'Fun',
    async execute(message, args, client, instance) {
        message.channel.send('pong!');
    }
}