var newsapikey = process.env.NEWSAPI_KEY
const db = require('../db')
const Discord = require('discord.js')
const countries = require('country-data').countries
const lookup = require('country-data').lookup;
const newsapi = require('newsapi')
const got = require('got')

module.exports = {
    name: 'news',
    description: 'news',
    category: 'Misc',
    async execute(message, args) {
        var time = new Date
        if (await db.has(`dailynews-${time.getUTCDate()}`)) {
            var news = await db.get(`dailynews-${time.getUTCDate()}`)
            const newsembed = new Discord.MessageEmbed()
                .setTitle(news.title)
                .setURL(news.url)
                .setImage(news.thumbnail.url)
                .setDescription(news.description)
                .setColor('RANDOM')
                .setFooter(news.footer.text)
            message.channel.send(newsembed)
        } else {
            var url = 'http://newsapi.org/v2/top-headlines?' + 'country=us' + '&pageSize=1' + '&page=1' + '&apiKey=' + newsapikey;
            got(url)
                .then(response => {
                    var content = JSON.parse(response.body)
                    if (content.status === 'ok') {
                        const newsembed = new Discord.MessageEmbed()
                            .setTitle(content.articles[0].title)
                            .setURL(content.articles[0].url)
                            .setImage(content.articles[0].urlToImage)
                            .setDescription(content.articles[0].description)
                            .setColor('RANDOM')
                            .setFooter(`Written by ${content.articles[0].author} from ${content.articles[0].source.name}`)
                        message.channel.send(newsembed)
                        db.set(`dailynews-${time.getUTCDate()}`, newsembed)
                    } else {
                        return message.channel.send('Sorry, I had some trouble getting the latest news from newsapi.org, here is the status message: ' + content.status)
                    }
                })
        }
    }
}