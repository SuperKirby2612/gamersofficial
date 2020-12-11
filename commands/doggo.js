module.exports = {
    name: 'doggo',
    description: "Sends a random picture of a dog! Syntax: -g doggo",
    execute(message, args) {
        var doggonum = Math.floor(Math.random() * 48) + 1 
            message.channel.send( {files: ["./doggoimages/" + doggonum + ".jpg"]})
        
    }
}