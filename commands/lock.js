const Discord = require('discord.js')

module.exports = {

    name: 'lock',
    description: "Makes the `\@everyone` role not able to type in the current channel (MODS ONLY) Syntax: -g lock",
    category: 'Moderation',
    async execute(message, args) {

        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('Sorry, you don\'t have the correct permissions to do that! `(MANAGE CHANNELS)`')

        let lockchannel = message.mentions.channels.first() || message.channel

        let lockrole = message.mentions.roles.first() || message.guild.roles.everyone
        
        const lockembed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('🔒 CHANNEL LOCKED 🔒')
        .setDescription(`Successfully locked the channel \`${lockchannel.name}\` to \`@everyone\`. To unlock the channel, just say -g unlock and if you mentioned a channel remember to re-mention it in the unlock command!`)
        
        lockchannel.updateOverwrite(lockrole.id, { SEND_MESSAGES: false });
        
        message.channel.send(lockembed)
    }
}