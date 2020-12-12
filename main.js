const Discord = require('discord.js');

const client = new Discord.Client();
const config = require('./config.json')
const prefix = "-g "

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
    const command = require('./commands/' + file);

    client.commands.set(command.name, command)

}

client.once('ready', () => {
    client.user.setActivity('YOU', {
        type: 'WATCHING'
    });
    console.log('GamersOfficial is online!')
});


client.on('message', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot)
        return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        client.commands.get('ping').execute(message, args);
    } else if (command === 'wipe') {
        client.commands.get('wipe').execute(message, args);
    } else if (command === 'cheese') {
        client.commands.get('cheese').execute(message, args);
    } else if (command === 'lock') {
        client.commands.get('lock').execute(message, args)
    } else if (command === 'doggo') {
        client.commands.get('doggo').execute(message, args)
    } else if (command === 'cat') {
        client.commands.get('cat').execute(message, args)
    } else if (command === 'bobr') {
        client.commands.get('bobr').execute(message, args)
    } else if (command === 'unicorn') {
        client.commands.get('unicorn').execute(message, args)
    }
})
client.login(config.token)