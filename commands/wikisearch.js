const Discord = require("discord.js")
const request = require("node-superfetch")
const dotenv = require('dotenv')

module.exports = {
    name: 'WikiSearch',
    description: 'Searches Wikipedia for a specified query!',
    category: 'Fun',
    aliases: ['wikisch', 'wiki', 'wikipedia', 'wikisearch'],
    slash: 'both',
    async execute(message, args, client) {
        let googleKey = process.env.googlewikitok
        let csx = "b8ae984500dc84811"
        let query = args.join(" ")
        let result;

        if (!query) return message.channel.send("Please enter a search!")
        let href = await search(query)

        const wikisearchembed = new Discord.MessageEmbed()
        .setTitle(href.title)
        .setDescription(href.snippet)
        .setImage(href.pagemap && href.pagemap.cse_thumbnail ? href.pagemap.cse_thumbnail[0].src : null)
        .setURL(href.link)
        .setColor("GREEN")
        .setFooter("Powered by Google™ and WikiPedia™")

        return message.channel.send(wikisearchembed)

        async function search(query) {
            const { body } = await request.get("https://www.googleapis.com/customsearch/v1/siterestrict?https://wikipedia.org").query({
                key: googleKey, cx: csx, safe: "off", q: query
            })

            if(!body.items) {
                message.channel.send('Sorry, I couldn\'t find anything on wikipedia that matches your query!')
                return null
            }
            return body.items[0]
        }
    }
}