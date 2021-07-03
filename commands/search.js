const Discord = require("discord.js")
const request = require("node-superfetch")
const dotenv = require('dotenv')
const {
    ddg
} = require('../main')

module.exports = {
    name: 'Search',
    description: 'Searches the world wide web for a specified query!',
    category: 'Fun',
    aliases: ['sch', 'google', 'lookup', 'ddg', 'duckduckgo'],
    slash: 'both',
    async execute(message, args, client) {

        var query = args.join()

        if (!query) return message.channel.send("Please enter a search!")
        var href = search(query)

        if (href === false) return;

        const searchembed = new Discord.MessageEmbed()
            .setTitle(href.heading)
            .setDescription(href.AbstractText)
            .setImage(href.image)
            .setURL(href.AbstractURL)
            .setColor("GREEN")
            .setFooter("Powered by DuckDuckGo™")

        return message.channel.send(searchembed)

        async function search(query) {
            ddg.instantAnswer(query, {
                skip_disambig: '0'
            }, function (err, body) {
                if (err || body.meta.description === 'testing') {
                    message.channel.send('Sorry, something went wrong.')
                    return false
                } else {
                    console.log(body);
                    return body
                }
            });
        }
    }
}