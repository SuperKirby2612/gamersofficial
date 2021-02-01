const Discord = require('discord.js')
const weather = require('weather-js')

module.exports = {
    name: 'Weather',
    description: 'Sends the weather forecast of a specified city. Syntax: -g weather (City name). If you are not comfortable with sharing your city on public servers, you can always DM me!',
    category: 'Misc',
    async execute(message, args, client) {
        let city = args.join(" ")
        let degreetype = 'C'

        await weather.find({search: city, degreeType: degreetype}, function(err, result) {
            if (!city) return message.channel.send('Please specify the city!')
            if (err || result === undefined || result.length === 0) return message.channel.send('Sorry, I don\'t recognize that city, try being less specific!')

            let current = result[0].current
            let location = result[0].location

            let degreetype1 = location.degreetype 

            const weatherembed = new Discord.MessageEmbed()
            .setAuthor(current.observationpoint)
            .setDescription(`> ${current.skytext}`)
            .setThumbnail(current.imageUrl)
            .setTimestamp()
            .setColor(0x7289DA)

            weatherembed.addField("Latitude", location.lat, true)
            .addField("Longitude", location.long, true)
            .addField('Feels like', `${current.feelslike}°${degreetype1}`, true)
            .addField('Wind', current.winddisplay, true)
            .addField('Humidity', `${current.humidity}%`, true)
            .addField('Timezone', `${location.timezone}`, true)
            .addField('Temp', `${current.temperature}°${degreetype1}`, true)
            .addField('Observation Point', current.observationpoint, true)

            return message.channel.send(weatherembed)
        })
    }
}