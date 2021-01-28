const got = require('got')

module.exports = {
    name: 'doggo',
    description: "Sends a random picture of a dog! Syntax: -g doggo",
    category: 'Fun',
    execute(message, args) {
        got('https://random.dog/woof.json').then(response => {
            var content = JSON.parse(response.body)
            message.channel.send(content.url)
        })
    }
}