const db = require('../db')

module.exports = {
    name: 'xpmultiplier',
    description: 'Multiplies xp',
    category: 'Fun',
    aliases: ['xpmultiply', 'xpm', 'xpboost'],
    async execute(message, args) {
        var number = args[0]
        var numbernum = parseInt(number)
        if (isNaN(numbernum)) return message.channel.send('Sorry, that\'s not a number!')
        if (numbernum > 10) return message.channel.send('Sorry, I can only multiply up to 10 times!')
        if (numbernum < 1) return message.channel.send('Sorry, that number is under 1!')
        await db.set(`xpmultiplier-${message.guild.id}`, numbernum)
        message.channel.send(`I successfully set the xp multiplier to \`${number}\``)
    }
}