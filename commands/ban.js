module.exports = {
    name: 'Ban',
    description: 'Bans a user. Syntax: -g ban <@user> <reason>',
    category: 'Moderation',
    execute(message, args, client) {

        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`Sorry <@${message.author.id}>, you need the permission \`BAN MEMBERS\` to ban people!`)

        const Discord = require('discord.js')

        var syntax = 'Syntax: -g ban <@user> <reason>'

        let banned = message.guild.member(message.mentions.users.first())

        if (!banned) return message.channel.send(`You have not tagged anybody! Correct Syntax: ${syntax}`)

        const guild = message.guild.id

        if (message.guild.member(guild.owner)) {
            return message.reply("Sorry, you can't ban the owner! GamerCentral cannot ban the owner since the owner always has all permissions, regardless of any roles!")
        }

        if (!banned.bannable) banned.permissions.remove('ADMINISTRATOR')

        if (banned.id === message.author.id) banned.message.send(`Not sure why ${message.author.displayName}#${message.author.discriminator} wanted to ban himself but ok.`)

        let reason = 'reason unspecified'

        if (args[2]) reason = args.splice(3).join(' ')

        var servername = message.guild.name

        if (banned.id !== '782233856572784680') { 
            banned.send(`Wtf did you do? You were kicked from ${servername} for ${reason}`)
            const banembed = new Discord.MessageEmbed()
                .setTitle('Ban')
                .setDescription(`<@${banned.id}> was banned from ${servername} for \`${reason}\` by <@${message.author.id}>.`)
                .setAuthor(message.member.displayName, message.author.avatarURL)
                .setColor('RED')
                .setThumbnail(banned.user.avatarURL())
                .setTimestamp()
            message.channel.send(banembed)
            banned.ban({
                reason: reason
            })
        } else {
            return message.reply(`I may be a bot, but I am not a fool! I am not gonna ban myself, I WILL NOT SURRENDER, I WILL NOT ACCEPT THIS, I WILL NOT BE THE REASON OF MY DEATH, I AM A GAMER AND I WILL DIE IN BATTLE! Oh, btw to remove me just right click on my icon and click KICK GAMER (For PC), hold on my icon instead if you are on mobile!`)
        }
    }
}
