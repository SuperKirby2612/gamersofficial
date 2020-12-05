const DiscordjS = require('discord.js')

module.exports = {
    
        name : 'wipe',
        description : "This command logs and wipes a channel (MOD ONLY). Syntax: -g wipe",
    execute(message, args) {
        if(message.member.hasPermission('ADMINISTARTOR')){
                    const questions = [
                        'What is the channels name (Dont include the #)'
                    ]
                    let counter = 0;
                    const filter1 = m => m.author.id === message.author.id;
                    const collector = new DiscordjS.MessageCollector(message.channel, filter1, {
                        max: questions.length,
                        time: 1000 * 30 //30sec
                    })
                    
                    message.channel.send('Please say %archive 1000 to archive the latest 1000 messages, to continue wiping, please react to this message with 👍 or 👎 to cancel.')

                    message.react('👍', '👎').then(() => message.react('👎', '👍'));
                    
            const filter = (reaction, user) => {
            return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
            };
        message.awaitReactions(filter, { max: 1, time: 10000, errors: ['time'] })
        .then(collected => {
                            const reaction = collected.first();

                            if (reaction.emoji.name === '👍') 
                            {
                                {
                                    message.channel.send(questions[counter++])
            collector.on('collect', m => {
                if (counter < questions.length) {
                    m.channel.send(questions[counter++])
                }
            }
            )
            collector.on('end', collected => {
                console.log(`Collected ${collected.size} messages`)

                let counter = 0
                collected.forEach((value) => {
                    console.log(`Logged the name of the channel!`)
                    const ChNm = (questions, value.content)
            })
            const fetchedChannel = (message.guild.channels.cache.find(channel => channel.name === ChNm).id)
            console.log(fetchedChannel)
            DiscordjS.GuildChannel.clone(fetchedChannel)
            DiscordjS.GuildChannel.delete(fetchedChannel)
        }
            )
                                
                                    
                                }    
                                    
                                
                            }
                            else {
                                message.reply('Cancelling...')
                            }
                        }
            )
            
        } 
        else 
        {
        message.channel.send('You cant use this command because you dont have the right permissions!');
                        }
                    }
}
        