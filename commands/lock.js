const Discord = require('discord.js')
const db = require('../db')

module.exports = {

    name: 'lock',
    description: "Makes the `\@everyone` role not able to type in the current channel (MODS ONLY) Syntax: -g lock",
    category: 'Moderation',
    slash: 'both',
    async execute(message, args) {

        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('Sorry, you don\'t have the correct permissions to do that! `(MANAGE CHANNELS)`')

        let lockchannel = message.mentions.channels.first() || message.channel

        if (await db.has(`lock-${message.guild.id}-${lockchannel.id}`)) return message.channel.send('That channel is already locked!')

        let lockrole = message.mentions.roles.first() || message.guild.roles.everyone
        
        const lockembed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('🔒 CHANNEL LOCKED 🔒')
        .setDescription(`Successfully locked the channel \`${lockchannel.name}\` to \`${lockrole.name}\`. To unlock the channel, just say -g unlock and if you mentioned a channel or role, remember to re-mention it in the unlock command!`)
        
        lockchannel.updateOverwrite(lockrole.id, { SEND_MESSAGES: false });

        db.set(`lock-${message.guild.id}-${lockchannel.id}`, true)
        
        message.channel.send(lockembed)
    }
}