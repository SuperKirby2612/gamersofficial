const db = require('../db')
const randomdigit = require('./randigit')
const pexels = require('pexels')
const pclient = pexels.createClient(process.env.PEXELS_KEY)
const Discord = require('discord.js')

async function captchacheck(member = Discord.GuildMember) {
    setTimeout(async () => {
        const captchapromise = new Promise(async (res, rej) => {
            if (await db.has(`captcha-${member.guild.id}`) === false) return () => {
                rej('Something went wrong...')
            }
            const cqueryarray = ['tiger', 'apple', 'banana', 'tree', 'lion', 'pickaxe', 'baloon', 'camera', 'wrench', 'pen', 'phone', 'snowglobe', 'piano', 'pencil', 'bike']
            const cquery = cqueryarray[Math.floor(Math.random() * cqueryarray.length) + 1]
            const randomquery = cqueryarray[Math.floor(Math.random() * cqueryarray.length) + 1]
            await pclient.photos.search({
                query: cquery
            }).then(async photos => {
                var cphoto = photos.photos[0].src.original
                if (cphoto === undefined) {
                    var cphoto = await db.get(`cphoto1-${member.user.id}-${member.guild.id}`)
                } else {
                    await db.set(`cphoto1-${member.user.id}-${member.guild.id}`, photos.photos[1].src.original)
                }
                var cchannelid1 = await db.get(`captcha-channelid-${member.guild.id}`)
                var cchannel1 = member.guild.channels.cache.get(c => c.id === cchannelid1)
                if (cquery === randomquery) {
                    var captchaanswer = 'yes'
                } else {
                    var captchaanswer = 'no'
                }
                var captchaembed = new Discord.MessageEmbed()
                    .setTitle('Captcha')
                    .setColor('GREEN')
                    .setDescription(`Are your DMs open? Oh, seems like they are! Welcome to **${member.guild.name}**! Before you continue, I've got to make sure you aren\'t a bot! Please look at the image below and tell me are there any ${randomquery}s in this image? You have 5 minutes to reply. (Reply with either yes or no)`)
                    .setImage(cphoto)
                    .setURL(cphoto)
                member.user.send(captchaembed)
                    .then((msg) => {
                        var captchafilter = m => m.author.id === member.user.id
                        const captchacollector = msg.channel.createMessageCollector(captchafilter, {
                            time: 5 * 1000 * 60
                        })
                        captchacollector.on('collect', async (m) => {
                            if (m.content.toLowerCase() === 'yes' && captchaanswer === 'yes') {
                                var croleid = await db.get(`captcha-roleid-${member.guild.id}`)
                                var crole = member.guild.roles.cache.get(r => r.id === croleid)
                                member.roles.set(crole)
                                m.channel.send(`You passed the captcha! You can now access the whole of **${member.guild.name}**!`)
                                rej()
                            } else if (m.content.toLowerCase() === 'yes' && captchaanswer === 'no') {
                                if (await db.has(`captchaincorrect-${m.author.id}`)) {
                                    var randomcode = randomdigit(6)
                                    const captchaincorrectembed = new Discord.MessageEmbed()
                                        .setTitle('Captcha Failure')
                                        .setDescription('It seems like you got the answer incorrect twice! (Or maybe I was wrong!). Try entering this code in the verification channel of the guild you are getting verified for!')
                                        .addField('Code', `\`${randomcode}\``)
                                        .setColor('RED')
                                    msg.channel.send(captchaincorrectembed)
                                    await db.delete(`captchaincorrect-${m.author.id}`)
                                    var codecollector = cchannel1.createMessageCollector(captchafilter, {
                                        time: 5 * 1000 * 60,
                                        max: 1
                                    })
                                    codecollector.on('collect', async (m) => {
                                        if (randomcode !== m.content) {
                                            m.channel.send(`Sorry <@${member.user.id}>! You failed the captcha because you typed the incorrect code!`)
                                            member.kick('Failed Captcha')
                                            rej('Incorrect code')
                                        }
                                    })
                                } else {
                                    m.channel.send('Incorrect answer! Although, we all make mistakes sometimes! I will give you another chance!')
                                    await db.set(`captchaincorrect-${m.author.id}`, 'true')
                                    captchacheck(member)
                                    rej('Incorrect answer')
                                }
                            } else if (m.content.toLowerCase() === 'no' && captchaanswer === 'yes') {
                                if (await db.has(`captchaincorrect-${m.author.id}`)) {
                                    var randomcode = await randomdigit(6)
                                    const captchaincorrectembed = new Discord.MessageEmbed()
                                        .setTitle('Captcha Failure')
                                        .setDescription('It seems like you got the answer incorrect twice! (Or maybe I was wrong!). Try entering this code in the verification channel of the guild you are getting verified for!')
                                        .addField('Code', `\`${randomcode}\``)
                                        .setColor('RED')
                                    msg.channel.send(captchaincorrectembed)
                                    await db.delete(`captchaincorrect-${m.author.id}`)
                                    var codecollector = cchannel1.createMessageCollector(captchafilter, {
                                        time: 5 * 1000 * 60,
                                        max: 1
                                    })
                                    codecollector.on('collect', async (m) => {
                                        if (randomcode !== m.content) {
                                            m.channel.send(`Sorry <@${member.user.id}>! You failed the captcha because you typed the incorrect code!`)
                                            member.kick('Failed Captcha')
                                            rej('Incorrect code')
                                        }
                                    })
                                } else {
                                    m.channel.send('Incorrect answer! Although, we all make mistakes sometimes! I will give you another chance!')
                                    await db.set(`captchaincorrect-${m.author.id}`, 'true')
                                    captchacheck(member)
                                }
                            } else if (m.content.toLowerCase() === 'no' && captchaanswer === 'no') {
                                var croleid = await db.get(`captcha-roleid-${member.guild.id}`)
                                var crole = member.guild.roles.cache.get(r => r.id === croleid)
                                member.roles.set(crole)
                                m.channel.send(`You passed the captcha! You can now access the whole of **${member.guild.name}**!`)
                                rej()
                            } else {
                                m.channel.send('That wasn\'t one of the supported answers!')
                                member.kick('Failed Captcha')
                                rej('Unsupported Answer')
                            }
                        })
                        captchacollector.on('end', async (collected) => {
                            if (collected.size === 0) return () => {
                                cchannel.send(`Sorry <@${member.user.id}>, you failed the captcha!`)
                                member.kick(`Failed Captcha`)
                                rej('Didn\'t respond in time')
                            }
                        })
                    })
                    .catch(async () => {
                        var cchannelid = await db.get(`captcha-channelid-${member.guild.id}`)
                        var cchannel = member.guild.channels.cache.get(c => c.id === cchannelid)
                        cchannel.send(`Hey <@${member.user.id}>, your DMs are closed! DM me with 👋 to open your DMs to me! You've got 5 minutes to DM me with 👋!`)
                        member.createDM(true)
                            .then(c => {
                                var wavefilter = m => m.author.id === member.user.id && m.content === '👋'
                                var wavecollector = c.createMessageCollector(wavefilter, {
                                    time: 5 * 1000 * 60,
                                    max: 1
                                })
                                wavecollector.on('collect', async m => {
                                    member.user.send(captchaembed)
                                        .catch(() => {
                                            cchannel.send(`Sorry <@${member.user.id},> I still can\'t access your DMs.`)
                                            member.kick('Failed Captcha')
                                            rej('No DM access')
                                        })
                                })
                                wavecollector.on('end', async collected => {
                                    if (collected.size === 0) return () => {
                                        cchannel.send(`Sorry <@${member.user.id}>! You didn\'t open your DMs to me so you failed the captcha!`)
                                        member.kick('Failed Captcha')
                                        rej('DMs weren\'t opened')
                                    }
                                })
                            })
                    })
            })
        })
    }, 2000)
}

module.exports = captchacheck