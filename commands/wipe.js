module.exports = {
    name: 'wipe',
    description: "This command logs and wipes a channel (MOD ONLY). Syntax: -g wipe",
    category: 'Moderation',
    cooldown: '1m',
    async execute(message, args) {

        const member = message.guild.member(message.author);

        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('Sorry, you don\'t have the correct permissions to do that! `(MANAGE CHANNELS)`')

        message.channel.send('To continue wiping, please react to this message with 👍 or react with 👎 to cancel.')

        message.react('👍', '👎').then(() => message.react('👎', '👍'));

        const filter = (reaction, user) => {
            return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
        };
        message.awaitReactions(filter, {
                max: 1,
                time: 10000,
                errors: ['time']
            })
            .then(collected => {
                const reaction = collected.first();

                if (reaction.emoji.name === '👍') {
                    {
                        var fetchedChannel = message.channel
                        fetchedChannel.clone(undefined, true, false, 'Needed a clone')
                            .then(clone => {
                                const ClonedChannelID = clone.id
                                const messageforclone = `Go to ${message.member.guild.channels.cache.get(ClonedChannelID)} (The new, wiped channel). This channel (${fetchedChannel.name}) will be deleted in 10 seconds!`
                                message.channel.send(messageforclone)
                                setTimeout(() => {
                                    fetchedChannel.delete();
                                }, 10000);
                            })
                    }
                }
                if (reaction.emoji.name === '👎') {
                    message.reply("Canceling!")
                }
            })
        }
}