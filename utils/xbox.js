const db = require('../db')
const {
    client
} = require('../main')
const Discord = require('discord.js')

async function xboxonline() {
    setInterval(async () => {
        const Time = new Date()
        if (Time.getUTCHours() > 19 || Time.getUTCHours() < 8) return;
        global.fetch = require('node-fetch')
        fetch("https://xapi.us/v2/2535461209776305/presence", {
                headers: {
                    "X-Auth": "98b1fb1b9fb01defd4ab51c53004c3a8601f35c6"
                }
            })
            .then(async (res) => {
                res.json()
                    .then(async d => {
                        var channel = client.guilds.channels.cache.get(c => c.id === '816234231767891988')
                        var oldstate = await db.get(`xboxlaststate-leo`)
                        await db.set(`xboxlaststate-leo`, d.state)
                        if (d.state === 'Online') {
                            if (oldstate === 'Offline') {
                                const xboxonlineleoembed = new Discord.MessageEmbed()
                                    .setTitle('New Player Online!')
                                    .setColor('GREEN')
                                    .setDescription(`<@&816233905928798212>, LeoTheMop has gone online! :6951_Online:`)
                                channel.send(xboxonlineleoembed)
                            }
                        } else if (d.state === 'Offline') {
                            if (oldstate === 'Online') {
                                const xboxofflineleoembed = new Discord.MessageEmbed()
                                    .setTitle('New Player Offline!')
                                    .setColor('RED')
                                    .setDescription(`<@&816233905928798212>, LeoTheMop has gone offline! :8997_offline:`)
                                channel.send(xboxofflineleoembed)
                            }
                        }
                    })
            })
    }, 5 * 1000 * 60)
    setInterval(async () => {
        const Time = new Date()
        if (Time.getUTCHours() > 19 || Time.getUTCHours() < 8) return;
        global.fetch = require('node-fetch')
        fetch("https://xapi.us/v2/2535452083447774/presence", {
                headers: {
                    "X-Auth": "98b1fb1b9fb01defd4ab51c53004c3a8601f35c6"
                }
            })
            .then(async (res) => {
                res.json()
                    .then(async d => {
                        var channel = client.guilds.channels.cache.get(c => c.id === '816234231767891988')
                        var oldstate = await db.get(`xboxlaststate-luca`)
                        await db.set(`xboxlaststate-luca`, d.state)
                        if (d.state === 'Online') {
                            if (oldstate === 'Offline') {
                                const xboxonlinelucaembed = new Discord.MessageEmbed()
                                    .setTitle('New Player Online!')
                                    .setColor('GREEN')
                                    .setDescription(`<@&816233905928798212>, Super Kirby2612 has gone online! :6951_Online:`)
                                channel.send(xboxonlinelucaembed)
                            }
                        } else if (d.state === 'Offline') {
                            if (oldstate === 'Online') {
                                const xboxofflinelucaembed = new Discord.MessageEmbed()
                                    .setTitle('New Player Offline!')
                                    .setColor('RED')
                                    .setDescription(`<@&816233905928798212>, Super Kirby2612 has gone offline! :8997_offline:`)
                                channel.send(xboxofflinelucaembed)
                            }
                        }
                    })
            })
    }, 5 * 1000 * 60)
    setInterval(async () => {
        const Time = new Date()
        if (Time.getUTCHours() > 19 || Time.getUTCHours() < 8) return;
        global.fetch = require('node-fetch')
        fetch("https://xapi.us/v2/2535422104660323/presence", {
                headers: {
                    "X-Auth": "98b1fb1b9fb01defd4ab51c53004c3a8601f35c6"
                }
            })
            .then(async (res) => {
                res.json()
                    .then(async d => {
                        var channel = client.guilds.channels.cache.get(c => c.id === '816234231767891988')
                        var oldstate = await db.get(`xboxlaststate-kamil`)
                        await db.set(`xboxlaststate-kamil`, d.state)
                        if (d.state === 'Online') {
                            if (oldstate === 'Offline') {
                                const xboxonlinekamilembed = new Discord.MessageEmbed()
                                    .setTitle('New Player Online!')
                                    .setColor('GREEN')
                                    .setDescription(`<@&816233905928798212>, Pulsedog YT has gone online! :6951_Online:`)
                                channel.send(xboxonlinekamilembed)
                            }
                        } else if (d.state === 'Offline') {
                            if (oldstate === 'Online') {
                                const xboxofflinekamilembed = new Discord.MessageEmbed()
                                    .setTitle('New Player Offline!')
                                    .setColor('RED')
                                    .setDescription(`<@&816233905928798212>, Pulsedog YT has gone offline! :8997_offline:`)
                                channel.send(xboxofflinekamilembed)
                            }
                        }
                    })
            })
    }, 5 * 1000 * 60)
    setInterval(async () => {
        const Time = new Date()
        if (Time.getUTCHours() > 19 || Time.getUTCHours() < 8) return;
        global.fetch = require('node-fetch')
        fetch("https://xapi.us/v2/2535461209776305/presence", {
                headers: {
                    "X-Auth": "98b1fb1b9fb01defd4ab51c53004c3a8601f35c6"
                }
            })
            .then(async (res) => {
                res.json()
                    .then(async d => {
                        var channel = client.guilds.channels.cache.get(c => c.id === '816234231767891988')
                        var oldstate = await db.get(`xboxlaststate-zack`)
                        await db.set(`xboxlaststate-zack`, d.state)
                        if (d.state === 'Online') {
                            if (oldstate === 'Offline') {
                                const xboxonlinezackembed = new Discord.MessageEmbed()
                                    .setTitle('New Player Online!')
                                    .setColor('GREEN')
                                    .setDescription(`<@&816233905928798212>, Zacktnt has gone online! :6951_Online:`)
                                channel.send(xboxonlinezackembed)
                            }
                        } else if (d.state === 'Offline') {
                            if (oldstate === 'Online') {
                                const xboxofflinezackembed = new Discord.MessageEmbed()
                                    .setTitle('New Player Offline!')
                                    .setColor('RED')
                                    .setDescription(`<@&816233905928798212>, Zacktnt has gone offline! :8997_offline:`)
                                channel.send(xboxofflinezackembed)
                            }
                        }
                    })
            })
    }, 5 * 1000 * 60)
    setInterval(async () => {
        const Time = new Date()
        if (Time.getUTCHours() > 19 || Time.getUTCHours() < 8) return;
        global.fetch = require('node-fetch')
        fetch("https://xapi.us/v2/2535429093326799/presence", {
                headers: {
                    "X-Auth": "98b1fb1b9fb01defd4ab51c53004c3a8601f35c6"
                }
            })
            .then(async (res) => {
                res.json()
                    .then(async d => {
                        var channel = client.guilds.channels.cache.get(c => c.id === '816234231767891988')
                        var oldstate = await db.get(`xboxlaststate-lem`)
                        await db.set(`xboxlaststate-lem`, d.state)
                        if (d.state === 'Online') {
                            if (oldstate === 'Offline') {
                                const xboxonlinelemembed = new Discord.MessageEmbed()
                                    .setTitle('New Player Online!')
                                    .setColor('GREEN')
                                    .setDescription(`<@&816233905928798212>, ACE PORK has gone online! :6951_Online:`)
                                channel.send(xboxonlinelemembed)
                            }
                        } else if (d.state === 'Offline') {
                            if (oldstate === 'Online') {
                                const xboxofflinelemembed = new Discord.MessageEmbed()
                                    .setTitle('New Player Offline!')
                                    .setColor('RED')
                                    .setDescription(`<@&816233905928798212>, ACE PORK has gone offline! :8997_offline:`)
                                channel.send(xboxofflinelemembed)
                            }
                        }
                    })
            })
    }, 5 * 1000 * 60)
    setInterval(async () => {
        const Time = new Date()
        if (Time.getUTCHours() > 19 || Time.getUTCHours() < 8) return;
        global.fetch = require('node-fetch')
        fetch("https://xapi.us/v2/2535448370823648/presence", {
                headers: {
                    "X-Auth": "98b1fb1b9fb01defd4ab51c53004c3a8601f35c6"
                }
            })
            .then(async (res) => {
                res.json()
                    .then(async d => {
                        var channel = client.guilds.channels.cache.get(c => c.id === '816234231767891988')
                        var oldstate = await db.get(`xboxlaststate-dom`)
                        await db.set(`xboxlaststate-dom`, d.state)
                        if (d.state === 'Online') {
                            if (oldstate === 'Offline') {
                                const xboxonlinedomembed = new Discord.MessageEmbed()
                                    .setTitle('New Player Online!')
                                    .setColor('GREEN')
                                    .setDescription(`<@&816233905928798212>, PULSEninja#6420 has gone online! :6951_Online:`)
                                channel.send(xboxonlinedomembed)
                            }
                        } else if (d.state === 'Offline') {
                            if (oldstate === 'Online') {
                                const xboxofflinedomembed = new Discord.MessageEmbed()
                                    .setTitle('New Player Offline!')
                                    .setColor('RED')
                                    .setDescription(`<@&816233905928798212>, PULSEninja#6420 has gone offline! :8997_offline:`)
                                channel.send(xboxofflinedomembed)
                            }
                        }
                    })
            })
    }, 5 * 1000 * 60)
}

module.exports = xboxonline