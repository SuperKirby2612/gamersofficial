const Discord = require('discord.js')

module.exports = {

    name: 'unlock',
    description: "Makes the `\@everyone` role able to type in the current channel (MODS ONLY) Syntax: -g unlock",
    category: 'Moderation',
    async execute(message, args) {

        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('Sorry, you don\'t have the correct permissions to do that! `(MANAGE CHANNELS)`')

        let lockchannel = message.mentions.channels.first() || message.channel

        let lockrole = message.mentions.roles.first() || message.guild.roles.everyone.id
        
        const unlockembed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('🔓 CHANNEL UNLOCKED 🔓')
        .setDescription(`Successfully unlocked the channel \`${lockchannel.name}\` to \`@everyone\`.`)
        
        lockchannel.updateOverwrite(lockrole, { SEND_MESSAGES: true });
        
        message.channel.send(unlockembed)
    }
}