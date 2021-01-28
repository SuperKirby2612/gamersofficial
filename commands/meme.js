const got = require('got')
const Discord = require('discord.js')

module.exports = {
    name: 'meme',
    description: 'Sends a meme from r/memes.',
    category: 'Fun',
    async execute(message, args, client) {
        const memeembed = new Discord.MessageEmbed()
        got('https://www.reddit.com/r/memes/random/.json').then(response => {
            let content = JSON.parse(response.body)
            let permalink = content[0].data.children[0].data.permalink
            let memeURL = `https://www.reddit.com${permalink}`
            let memeImage = content[0].data.children[0].data.url
            let memeTitle = content[0].data.children[0].data.title
            let memeUpvotes = content[0].data.children[0].data.ups
            let memeDownvotes = content[0].data.children[0].data.downs
            let memeNumComments = content[0].data.children[0].data.num_comments
            memeembed.setTitle(`${memeTitle}`)
            memeembed.setURL(`${memeURL}`)
            memeembed.setImage(memeImage)
            memeembed.setColor('RANDOM')
            memeembed.setFooter(`⬆ ${memeUpvotes} ⬇ ${memeDownvotes} 💬 ${memeNumComments}`)
            return message.channel.send(memeembed)
        })
    }
}