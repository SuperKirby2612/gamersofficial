module.exports = {
    name: 'wipe',
    description: "This command logs and wipes a channel (MOD ONLY)",
    async execute(message, args) {
       
           if(message.member.roles.cache.has('763422695148748810')){
            
    
            message.channel.send('Please say %archive 1000 to archive the latest 1000 messages, to continue wiping, please react to this message with 👍 or 👎 to cancel.')

            message.react('👍', '👎').then(() => message.react('👎', '👍'));
            
const filter = (reaction, user) => {
	return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
};
} else {
    message.channel.send('You cant use this command because you dont have the right permissions!');
    



message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '👍') {
            message.reply('Continuing the wiping process...');
            if (!args[0]) return message.reply("Please enter the amount of messages to clear!");
 
            if(isNaN(args[0])) return message.reply("Please type a real number!");
     
            if(args[0] > 100) return message.reply("You can't remove more than 100 messages!");
            
            if(args[0] < 1) return message.reply("You have to delete at least one message!");
     
            await message.channel.messages.fetch({ limit: args[0]}).then(messages =>{
                message.channel.bulkDelete(messages)
        });
		} else {
			message.reply('Cancelling...');
		}
    })
	.catch(_collected => {
		message.reply('you reacted with neither a thumbs up, nor a thumbs down so I cancelled the original request.');
	});
}         
}      
}  