const DiscordjS = require('discord.js')

module.exports = {
    
        name : 'lock',
        description : "Makes the everyone role not able to type in the current channel (MODS ONLY) Syntax: -g lock",
    execute(message, args) {
        if(message.member.hasPermission('ADMINISTRATOR')) {
            const questions = [
                'What is the channels name (Dont include the #)'
            ]
            const filter2 = m => m.author.id === message.author.id;
            let counter2 = 0;
            const collector1 = new DiscordjS.MessageCollector(message.channel, filter2, {
                max: questions.length,
                time: 1000 * 30 //30sec
            })
            const fetchedChannel = message.guild.channels.cache.find(channel => channel.name === ChNm1).id;
        }
    }
}