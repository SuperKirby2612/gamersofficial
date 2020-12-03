const DiscordjS = require('discord.js')

module.exports = {
    callback: (message) => {
    name: 'wipe',
    description; "This command logs and wipes a channel (MOD ONLY)",
    execute(message, args)
    async
    {
        if(message.member.roles.cache.has('763422695148748810')){
                    const questions = [
                        'What is the channels name (Dont include the #)'
                    ]
                    let counter = 0

                    const collector = new DiscordjS.MessageCollector(message.channel, filter1, {
                        max: questions.length,
                        time: 1000 * 15 //15sec
                    })

                    const filter1 = m => m.author.id === message.author.id
                    message.channel.send('Please say %archive 1000 to archive the latest 1000 messages, to continue wiping, please react to this message with 👍 or 👎 to cancel.')

                    message.react('👍', '👎').then(() => message.react('👎', '👍'));
                    
            const filter = (reaction, user) => {
            return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
            };
        } 
    else 
        {
        message.channel.send('You cant use this command because you dont have the right permissions!');
        message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
        .then(collected => {
                            const reaction = collected.first();

                            if (reaction.emoji.name === '👍') 
                            {
                                {
                                    message.reply('Continuing the wiping process...');
                                
                                    
                                }    
                                    
                                
                            }
                            else {
                                message.reply('Cancelling...')
                            }
                        }
            )
            message.channel.send(questions[counter++])
            collector.on('collect', m => {
                if (counter < questions.length) {
                    m.channel.send(questions[counter++])
                }}
            )

            collector.on('end', collected => {
                console.log(`Collected ${collected.size} messages`)
                let counter = 0
                collected.forEach(value) => {
                    const fetchedChannel = bot.channels.cache.find(channel => channel.name === (questions[counter++], vaule.content))
            }})
            
            fetchedChannel.clone()
            fetchedChannel.delete()
            .catch(_collected => {
                message.reply('you reacted with neither a thumbs up, nor a thumbs down so I cancelled the original request.')
                            }
            )
                        }
                    }
                }
            }
        