module.exports = {
    name: 'cat',
    description: "Sends a random picture of a cat! Syntax: -g cat",
    execute(message, args) {
        var catnum = Math.floor(Math.random() * 37) + 1 
            message.channel.send( {files: ["./catimages/" + catnum + ".jpg"]})
        
    }
}