const got = require('got')

module.exports = {
    name: 'cat',
    description: "Sends a random picture of a cat! Syntax: -g cat",
    category: 'Fun',
    slash: 'both',
    execute(message, args) {
        const bingus = Math.floor(Math.random() * 99) + 1
        if (bingus === 2) {
            message.channel.send('Congratulations! You got bingus!')
            message.channel.send('https://cdn.discordapp.com/attachments/799676289681981476/803576392767373313/20210125_210339.jpg')
        } else {
            got('http://aws.random.cat//meow').then(response => {
                var content = JSON.parse(response.body)
                message.channel.send(content.file)
            })
        }
    }
}