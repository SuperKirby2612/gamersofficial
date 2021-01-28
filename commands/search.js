const Discord = require("discord.js")
const request = require("node-superfetch")
const dotenv = require('dotenv')

module.exports = {
    name: 'Search',
    description: 'Searches the world wide web for a specified query!',
    category: 'Fun',
    aliases: ['sch', 'google', 'lookup'],
    async execute(message, args, client) {
        let googleKey = process.env.googletok
        let csx = "984e3a39fc150ebad"
        let query = args.join(" ")
        let result;

        if (!query) return message.channel.send("Please enter a search!")
        let href = await search(query)

        const searchembed = new Discord.MessageEmbed()
        .setTitle(href.title)
        .setDescription(href.snippet)
        .setImage(href.pagemap && href.pagemap.cse_thumbnail ? href.pagemap.cse_thumbnail[0].src : null)
        .setURL(href.link)
        .setColor("GREEN")
        .setFooter("Powered by Google™")

        return message.channel.send(searchembed)

        async function search(query) {
            const { body } = await request.get("https://www.googleapis.com/customsearch/v1").query({
                key: googleKey, cx: csx, safe: "off", q: query
            })

            if(!body.items) {
                message.channel.send('Sorry, I couldn\'t find anything that matches your query!')
                return null
            }
            return body.items[0]
        }
    }
}