const WOKcommands = require('WOKcommands')

module.exports = {
    name: 'cheese',
    description: "Sends a picture of cheese",
    execute(message, args) {
        message.channel.send('https://th.bing.com/th/id/OIP.KU2AHfKOBxD1yaNJNqw5CwHaH7?pid=Api&rs=1');
    }
}