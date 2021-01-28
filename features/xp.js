const Discord = require('discord.js')
const Levels = require('discord-xp')

module.exports = (client, instance, message, args) => {
    client.on('message', (message) => {
        if (message.author.client) return;
        var authorid = message.author.id
        var guildid = message.guild.id
        client.commands.get('xp').execute(message, args, authorid, guildid)
    })
}
module.exports.config = {
    displayName: 'XP', // Can be changed any time
    dbName: 'XP', // DO NOT CHANGE!
    loadDBFirst: true,
}