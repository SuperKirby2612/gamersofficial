const Discord = require('discord.js')

module.exports = {
    name: 'Whois',
    description: 'Gives info about a specified user',
    category: 'Moderation',
    slash: 'both',
    async execute(message, args, client) {
        const {
            guild,
            channel
        } = message

        const user = message.mentions.users.first() || message.member.user
        const member = guild.members.cache.get(user.id)
        message.delete()
        let usercreated = user.createdTimestamp
        const HighestRole = member.roles.highest
        const nitroboost = new Date(member.premiumSinceTimestamp).toLocaleDateString()
        if (nitroboost !== '1/1/1970') {
            var nitroboost1 = new Date(member.premiumSinceTimestamp).toLocaleDateString()
        }
        if (member.bannable) {
            var banemoji = '✅'
        }
        if (member.hasPermission('BAN_MEMBERS')) {
            var adminemoji = '✅'
        }
        if (user.bot) {
            var botemoji = '✅'
        }
        if (user.flags.toArray().includes('HOUSE_BRAVERY')) {
            var HypeSquad1 = 'Bravery'
        } else if (user.flags.toArray().includes('HOUSE_BRILLIANCE')) {
            var HypeSquad2 = 'Brilliance'
        } else if (user.flags.toArray().includes('HOUSE_BALANCE')) {
            var HypeSquad3 = 'Balance'
        }
        var flags0 = user.flags.toArray()
        var realflags = arrayRemove(flags0, 'HOUSE_BRAVERY', 'HOUSE_BRRILLIANCE', 'HOUSE_BALANCE')
        let realflagsnone = null;
        if (realflags = []) {
            let realflagsnone = 'None'
        }
        const usercolor = member.displayHexColor
        const whoisembed = new Discord.MessageEmbed()
            .setAuthor(`User Info for ${user.username}`, user.displayAvatarURL())
            .setColor(usercolor)
            .setTitle('User Info')
            .addFields({
                name: 'Nametag',
                value: user.username + '#' + user.discriminator,
                inline: true,
            }, {
                name: 'Nickname',
                value: member.nickname || 'None',
                inline: true,
            }, {
                name: 'Bot',
                value: botemoji || '❌',
                inline: true,
            }, {
                name: 'Server Join Date',
                value: new Date(member.joinedTimestamp).toLocaleDateString(),
                inline: true,
            }, {
                name: 'Discord Join Date',
                value: new Date(user.createdTimestamp).toLocaleDateString(),
                inline: true,
            }, {
                name: 'Nitro Boost Date',
                value: nitroboost1 || 'Hasnt boosted',
                inline: true,
            }, {
                name: 'Bannable',
                value: banemoji || '❌',
                inline: true,
            }, {
                name: 'Admin',
                value: adminemoji || '❌',
                inline: true,
            }, {
                name: 'Highest Role',
                value: `${HighestRole.name}` || 'This user does not have any roles',
                inline: true,
            }, {
                name: 'Status',
                value: member.presence.status.toUpperCase(),
                inline: true,
            }, {
                name: 'HypeSquad',
                value: HypeSquad1 || HypeSquad2 || HypeSquad3 || 'None',
                inline: true,
            }, )

        channel.send(whoisembed)

    }
}

function arrayRemove(arr, value) {

    return arr.filter(function (ele) {
        return ele != value;
    });
}