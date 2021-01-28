const Discord = require('discord.js')

module.exports = {
    name: 'sendstartmsg',
    description: 'Sends the starting message again',
    category: 'Misc',
    async execute(message, args) {
        if (message.author.id !== '695228246966534255')
        var guild = message.guild
        let defaultChannel = "";
        guild.channels.cache.forEach((channel) => {
            if (channel.type == "text" && defaultChannel == "") {
                if (channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
                    defaultChannel = channel;
                }
            }
        })
        const joinembed = new Discord.MessageEmbed()
            .setTitle('Hello!')
            .setColor('GREEN')
            .addFields({
                name: 'Introduction',
                value: 'I see you have made the smart choice to invite me to your server! To start, try saying -g help for a list of commands! Also all jokes aside, thanks for adding this bot! (Help command currently not working)'
            }, {
                name: 'Useful commands',
                value: 'Don\'t worry, if you don\'t want a specific command available or only a certain role to access a specific command try: -g command disable (Command name) to disable a command and -g requiredrole (Command name) (@role). If I\'m in the way of another bot or you just wanna change my prefix do -g prefix (New prefix name)'
            }, {
                name: 'Help',
                value: 'For help, run the help command. It will provide a list of the current commands!'
            }, {
                name: 'Other stuff',
                value: 'If you added me for the xp system or anything that doesn\'t require a command to run, then it\'s fine, everything is already running right now!'
            }, {
                name: 'Credits',
                value: 'This bot was made by Super Kirby#6272, I have a youtube channel and if you could subscribe that would be very helpful! Just click the title (Hello!) to subscribe! This bot was also hugely impacted by the WOKcommands library which made the prefix, requiredrole and disable command!'
            })
            .setFooter('Click the title to subscribe ^v^', '')
            .setURL('https://www.youtube.com/channel/UCns3wCMCeusJyfDWsjKZRfQ?sub_confirmation=1')
        defaultChannel.send(joinembed)
    }
}