module.exports = {
    name: 'unicorn',
    description: "Sends a picture of a unicorn",
    category: 'Fun',
    slash: 'both',
    execute(message, args) {
        message.channel.send('https://getdrawings.com/cliparts/fat-unicorn-clipart-35.jpg');
    }
}