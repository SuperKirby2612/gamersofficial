const Discord = require('discord.js')
const covid = require('novelcovid')

module.exports = {
    name: 'covid',
    description: 'Sends current covid-19 stats for the world.',
    category: 'Misc',
    slash: 'both',
    async execute(message, args, client) {
        const covidStats = await covid.all()

        const CovidEmbed = new Discord.MessageEmbed()
            .setTitle('🦠 Covid Stats 🦠')
            .setColor("BLUE")
            .addFields({
                name: `☣ Cases ☣`,
                value: covidStats.cases.toLocaleString(),
                inline: true
            }, {
                name: `🕒☣ Daily Cases ☣🕒`,
                value: covidStats.todayCases.toLocaleString(),
                inline: true
            }, {
                name: `💀 Deaths 💀`,
                value: covidStats.deaths.toLocaleString(),
                inline: true
            }, {
                name: `🕒💀 Daily Deaths 💀🕒`,
                value: covidStats.todayDeaths.toLocaleString(),
                inline: true
            }, {
                name: `🏥 Recovered 🏥`,
                value: covidStats.recovered.toLocaleString(),
                inline: true
            }, {
                name: `🕒🏥 Daily Recoveries 🏥🕒`,
                value: covidStats.todayRecovered.toLocaleString(),
                inline: true
            }, {
                name: `⚠ Active Cases ⚠`,
                value: covidStats.active.toLocaleString(),
                inline: true
            }, {
                name: `❗ Critical Cases ❗`,
                value: covidStats.critical.toLocaleString(),
                inline: true
            }, {
                name: `🧪 Tested 🧪`,
                value: covidStats.tests.toLocaleString(),
                inline: true
            })
        message.channel.send(CovidEmbed)
    }
}