module.exports = {
    name: 'Bruh',
    description: "Bruh moment",
    category: 'Fun',
    slash: 'both',
    execute(message, args) {
        message.channel.send('https://pbs.twimg.com/profile_images/2643499838/efe59cc6c3f91e261684ff2dd3730bbc_400x400.jpeg');
    }
}