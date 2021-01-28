module.exports = {
    name: 'bobr',
    description: "Sends a picture of bob ross",
    category: 'Fun',
    execute(message, args) {
        message.channel.send('https://pixel.nymag.com/imgs/daily/vulture/2015/11/10/10-bob-ross.w1200.h630.jpg');
    }
}