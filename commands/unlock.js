const Discord = require('discord.js')
const db = require('../db')

module.exports = {

    name: 'unlock',
    description: "Makes the `\@everyone` role able to type in the current channel (MODS ONLY) Syntax: -g unlock",
    category: 'Moderation',
    slash: 'both',
    async execute(message, args) {

        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('Sorry, you don\'t have the correct permissions to do that! `(MANAGE CHANNELS)`')

        let lockchannel = message.mentions.channels.first() || message.channel

        if (!await db.has(`lock-${message.guild.id}-${lockchannel.id}`)) return message.channel.send('That channel isn\'t locked!')

        let lockrole = message.mentions.roles.first() || message.guild.roles.everyone.id
        
        const unlockembed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('🔓 CHANNEL UNLOCKED 🔓')
        .setDescription(`Successfully unlocked the channel \`${lockchannel.name}\` to \`${lockrole.name}\`.`)
        
        lockchannel.updateOverwrite(lockrole, { SEND_MESSAGES: true });
        db.delete(`lock-${message.guild.id}-${lockchannel.id}`)
        message.channel.send(unlockembed)
    }
}