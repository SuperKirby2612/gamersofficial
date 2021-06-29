// Other Part //
function getCurrentDateString() {
    return (new Date()).toISOString() + ' ::';
};
__originalLog = console.log;
console.log = function () {
    var args = [].slice.call(arguments);
    __originalLog.apply(console.log, [getCurrentDateString()].concat(args));
};
const fs = require('fs');
const util = require('util');
const path = require('path');
const {
    google
} = require('googleapis')
require('dotenv').config()

function necessary_dirs() {
    if (!fs.existsSync('./temp/')) {
        fs.mkdirSync('./temp/');
    }
    if (!fs.existsSync('./data/')) {
        fs.mkdirSync('./data/');
    }
}
necessary_dirs()


function clean_temp() {
    const dd = './temp/';
    fs.readdir(dd, (err, files) => {
        if (err) throw err;

        for (const file of files) {
            fs.unlink(path.join(dd, file), err => {
                if (err) throw err;
            });
        }
    });
}
clean_temp(); // clean files at startup

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

let DISCORD_TOK = null;
let witAPIKEY = null;
let MONGOOSE_TOK = null;
let GOOGLE_TOK = null;
let SPOTIFY_TOKEN_ID = null;
let SPOTIFY_TOKEN_SECRET = null;
var newsapikey = process.env.NEWSAPI_KEY

// My Part //
const Discord = require('discord.js')
const Distube = require('distube')
const client = new Discord.Client({
    partials: ['MESSAGE', 'REACTION'],
    ws: {
        intents: Discord.Intents.ALL
    }
})
exports.client = client
const PREFIX = "-g"
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const got = require('got')
const covid = require('novelcovid')
const {
    settings
} = require('cluster');
const {
    config
} = require('process');
const opts = {
    MaxResults: 1,
    key: process.env.YOUTUBE_TOKEN,
    type: 'video'
}
const Levels = require('discord-xp')

Levels.setURL(process.env.MONGO_URI)

const WOKcommands = require('wokcommands')

const canvacord = require('canvacord')

const nsfwjs = require('nsfwjs')

const fspromises = require('fs').promises

const download = require('image-downloader')

const toPercent = require('decimal-to-percent')

const dig = require('discord-image-generation')

const texttoimage = require('text-to-image')

const request = require('node-superfetch')

var DDG = require('node-ddg-api').DDG;

const ddg = new DDG('gamersofficial');

exports.ddg = ddg

const weather = require('weather-js')

const swearjar = require('swearjar_modified')

var iso8601 = require('iso8601-convert')

const countries = require('country-data').countries

const lookup = require('country-data').lookup;

const newsapi = require('newsapi')

const disbut = require('discord-buttons')(client)

const {
    MessageButton,
    MessageActionRow
} = require('discord-buttons');

const captchacheck = require('./utils/captcha')

const Twitter = require('twitter');
const tclient = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_SECRET
});

exports.tclient = tclient

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('commands/').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
    const command = require('./commands/' + file);

    client.commands.set(command.name, command)
}

const distube = new Distube(client, {
    searchSongs: false,
    emitNewSongOnly: true
})

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`)
    new WOKcommands(client, 'commands', 'features')
        .setMongoPath(process.env.MONGO_URI)
        .setDefaultPrefix('.')
    setInterval(async () => {
        let channel = client.channels.fetch("856953236846280744")
            .then(async (channel) => {
                let myButton = new MessageButton()
                    .setLabel("Yes")
                    .setStyle("green")
                    .setID("yes")
                let myButton2 = new MessageButton()
                    .setLabel("No")
                    .setStyle("red")
                    .setID("no")
                var row = new MessageActionRow()
                    .addComponent(myButton)
                    .addComponent(myButton2);
                channel.send("<@771374646540501032> <@695228246966534255>, It's time for your daily recording. Would you like to start? (Just join a vc and press the button!)", row)
            })
    }, 86400000)
    if (true === true) {
        client.api.applications(client.user.id).commands.post({
            data: {
                name: 'help',
                description: "Sends a list of all commands and their syntax.",

                options: [{
                    name: "category",
                    description: 'Options: moderation, fun, misc',
                    type: 3,
                    required: true
                }]
            }
        });
        client.api.applications(client.user.id).commands.post({
            data: {
                name: 'support',
                description: "Find out how you can support me!",

                options: [{
                    name: "category",
                    description: 'Options: youtube, donation, discord',
                    type: 3,
                    required: true
                }]
            }
        });
        client.api.applications(client.user.id).commands.post({
            data: {
                name: 'whois',
                description: "Gives information on a user.",

                options: [{
                    name: "user",
                    description: "User that you want information on.",
                    type: 6,
                    required: true,
                }, ]
            }
        });
        client.api.applications(client.user.id).commands.post({
            data: {
                name: 'wikisearch',
                description: "Searches a query on the wiki, if a wiki page is not found, the next best result will be sent..",

                options: [{
                    name: "query",
                    description: "Query that you want to search on Wikipedia",
                    type: 3,
                    required: true,
                }, ]
            }
        });
        client.api.applications(client.user.id).commands.post({
            data: {
                name: 'weather',
                description: "Sends the current weather of a city.",

                options: [{
                    name: "city",
                    description: "City that you want the weather of.",
                    type: 3,
                    required: true,
                }, ]
            }
        });
        client.api.applications(client.user.id).commands.post({
            data: {
                name: 'unlock',
                description: "Unlocks a specified locked channel to the linked locked role (and any role lower).",

                options: [{
                    name: "channel",
                    description: "Channel that you want to unlock.",
                    type: 7,
                    required: true,
                }, {
                    name: 'role',
                    description: 'Role of which you want to unlock the channel to.',
                    type: 8,
                    required: true
                }]
            }
        });
        client.api.applications(client.user.id).commands.post({
            data: {
                name: 'search',
                description: "Searches a query on google.",

                options: [{
                    name: "query",
                    description: "Query that you want to search on Google",
                    type: 3,
                    required: true,
                }, ]
            }
        });
        client.api.applications(client.user.id).commands.post({
            data: {
                name: 'sanitize',
                description: "Cleans a specified channel. (Removes innapropiate language)",

                options: [{
                    name: "channel",
                    description: "Channel that you want to clean.",
                    type: 7,
                    required: true,
                }]
            }
        });
        client.api.applications(client.user.id).guilds('760129849154338827').commands.post({
            data: {
                name: 'streamtweets',
                description: "Streams any new tweets with a specified hashtag to a specified channel",

                options: [{
                    name: 'hashtag',
                    description: 'The hashtag you want to stream.',
                    type: 3,
                    required: true
                }, {
                    name: "channel",
                    description: "Channel that you want to stream to.",
                    type: 7,
                    required: true,
                }, ]
            }
        });
    }
    client.guilds.cache.forEach(async (guild) => {
        guild.channels.cache.forEach(async (channel) => {
            if (await db.has(`tweetstream-${guild.id}-${channel.id}`)) {
                var hashtag = await db.get(`tweetstream-${guild.id}-${channel.id}`)
                var stream = tclient.stream('statuses/filter', {
                    track: hashtag
                });
                stream.on('data', async function (event) {
                    if (!await db.has(`tweetstream-${guild.id}-${channel.id}`)) return;
                    var lasttweet = await db.get(`lasttweettime-${guild.id}-${channel.id}`)
                    if (lasttweet === undefined) {
                        await db.set(`lasttweettime-${guild.id}-${channel.id}`, 'false')
                    }
                    if ((Date.now() - lasttweet) < 30000 || lasttweet === 'false') return;
                    await db.set(`lasttweettime-${guild.id}-${channel.id}`, Date.now())
                    if ((parseInt(event.timestamp_ms) - Date.now()) > 60000) return;
                    if (event.filter_level !== 'low') return;
                    if (swearjar.profane(event.text) && await db.has(`swear-${guild.id}`) && !await db.has(`censor-${guild.id}`)) return;
                    if (await db.has(`censor-${guild.id}`)) {
                        var streamembed = new Discord.MessageEmbed()
                            .setTitle('New Tweet by a verified user!')
                            .setColor('#08a0e9')
                            .setURL(`https://www.twitter.com/${event.user.screen_name}/status/${event.id_str}`)
                            .setThumbnail(event.user.profile_image_url)
                            .addField(`${event.user.screen_name} says...`, swearjar.censor(event.text))
                            .setTimestamp()
                        channel.send(streamembed)
                    } else {
                        if (event.user.verified) {
                            var streamembed = new Discord.MessageEmbed()
                                .setTitle('New Tweet by a verified user!')
                                .setColor('#08a0e9')
                                .setURL(`https://www.twitter.com/${event.user.screen_name}/status/${event.id_str}`)
                                .setThumbnail(event.user.profile_image_url)
                                .addField(`${event.user.screen_name} says...`, event.text)
                                .setTimestamp()
                            channel.send(streamembed)
                        } else {
                            var streamembed = new Discord.MessageEmbed()
                                .setTitle('New Tweet!')
                                .setColor('#08a0e9')
                                .setURL(`https://www.twitter.com/${event.user.screen_name}/status/${event.id_str}`)
                                .setThumbnail(event.user.profile_image_url)
                                .addField(`${event.user.screen_name} says...`, event.text)
                                .setTimestamp()
                            channel.send(streamembed)
                        }
                    }
                });

                stream.on('error', function (error) {
                    console.log(error)
                });
            }
        })
    });
    setInterval(() => {
        const statustypes = [
            `WATCHING`,
            `LISTENING`,
            `PLAYING`
        ]
        const statuses = [
            `YOU`,
            `over ${client.users.cache.size} members`,
            `over ${client.guilds.cache.size} guilds`,
            `a tv show`,
            `�̤͈̠̖̫͚̻̣͗͜�̈́͋҉̦͍�̴̭̥̯̌ͯ̈̿�̸͇̠̽ͬ�̶̖̪͇̑ͦ̈͗�͙̣̹̰̟̀̀`
        ]
        const status = statuses[Math.floor(Math.random() * statuses.length)]
        const statustype = statustypes[Math.floor(Math.random() * statustypes.length)]
        client.user.setActivity(status, {
            type: statustype
        })
    }, Math.floor(Math.random() * 119 * 1000) + 1)
});
client.login(process.env.discord_token)

distube
    .on("playSong", (message, queue, song) => {
        const playSongEmbed = new Discord.MessageEmbed()
            .setTitle(`Playing ${song.name}`)
            .setColor('GREEN')
            .setDescription(`Song Name: ${song.name}\nSong Duration: ${song.formattedDuration}\nRequested by: ${song.user}`)
            .setURL(song.url)
            .setThumbnail(song.thumbnail)
            .setFooter(`👍 ${song.likes} 👎 ${song.dislikes} 👁 ${song.views}`)
        message.channel.send(playSongEmbed)
    })

const isInvite = async (guild, code) => {
    return await new Promise(resolve => {
        guild.fetchInvites().then((invites) => {
            for (const invite of invites) {
                if (code === invite[0]) {
                    resolve(true)
                    return
                }
            }
            resolve(false)
        })
    })
}

const lb = PREFIX + 'lb'

const db = require('./db');
client.on('clickButton', async (button) => {
    if (button.id === 'yes') {
        const member = await button.clicker.member.guild.members.cache.get(button.clicker.user.id)
        const voicechannel = member.voice.channel
        if (!voicechannel) return button.message.channel.send("You need to be in a voice channel to use that command!")

        const connection = await member.voice.channel.join()
        const receiver = connection.receiver.createStream(member, {
            mode: 'pcm',
            end: "silence"
        })
        if (button.clicker.user.id === '771374646540501032') {
            const knum = await db.get("currentrnum-k")
            await db.set("currentrnum-k", (knum + 1))
            var knumfile = knum + 1
            const writer = receiver.pipe(fs.createWriteStream(`./VoiceExp/kamil-${knumfile}.pcm`))
            writer.on("finish", () => {
                member.voice.channel.leave()
                button.message.channel.send("Finished recording. Saved to D:/VoiceExp. To play back audio, please use .rplay. To play back the first audio, please use .rplayfirst.")
            })
        } else if (button.clicker.user.id === '695228246966534255') {
            const lnum = await db.get("currentrnum-l")
            await db.set("currentrnum-l", (lnum + 1))
            var lnumfile = lnum + 1
            const writer = receiver.pipe(fs.createWriteStream(`./VoiceExp/luca-${lnumfile}.pcm`))
            writer.on("finish", () => {
                member.voice.channel.leave()
                button.message.channel.send("Finished recording. Saved to D:/VoiceExp. To play back audio, please use .rplay. To play back the first audio, please use .rplayfirst.")
            })
        } else {
            return button.message.channel.send('Sorry, right now this feature is in experimental mode and only selected people can use it!')
        }
    }
    else if (button.id === 'no') {
        button.message.channel.send('Ok, click the button whenever you want to record your voice ^-^')
    }
    button.defer()
});
client.on('message', async (message) => {
    if (message.guild === null) return;
    if (message.author.bot) return;
    const guildid = message.guild.id;
    const authorid = message.author.id;
    client.commands.get('xp').execute(message, authorid, guildid)
    if (message.guild.member(client.user).nickname) {
        message.guild.member(client.user).setNickname('GamerCentral')
    }
})

client.on('message', async (message) => {
    // Error: Cannot read property 'id' of null, Reason: The code is reading 'message' as the DM that it sends at line 175, Fixed: Yes
    if (message.guild === null) return;
    if (message.author.bot) return;
    const messageArray = message.content.split(" ")
    const cmd = messageArray[0]
    const args = messageArray.slice(1)
    const code = message.content.split('discord.gg/')[1];
    if (await db.has(`antiinvite-${message.guild.id}`) === false) return;
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return;
    if (message.content.includes('discord.gg/')) {
        const isServerInvite = await isInvite(message.guild, code)
        var randomnum = Math.floor(Math.random() * 9999) + 1
        if (!isServerInvite) {
            message.delete()
            const antiinviteembed = new Discord.MessageEmbed()
                .setTitle('Anti-Invite Warning!')
                .setColor('RED')
                .setDescription('You are not allowed to send invites in this server unless you have the MANAGE MESSAGES permission! If you think this is a mistake, please contact one of the admins and show them your message!')
                .addField('Your message', message.content)
            message.author.send(antiinviteembed)
        }
    }
})
/*client.on('message', (message) => {
    if (message.author.bot) return;
    API_KEY = process.env.PERSPECTIVE_API_KEY
    DISCOVERY_URL = 'https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze'
    google.discoverAPI(DISCOVERY_URL)
        .then(client => {
            const analyzeRequest = {
                comment: {
                    text: message.content,
                },
                requestedAttributes: {
                    'SPAM': {
                        scoreThreshold: 0.8
                    },
                    'IDENTITY_ATTACK': {
                        scoreThreshold: 0.8
                    },
                    'SEVERE_TOXICITY': {
                        scoreThreshold: 0.8
                    },
                    'SEXUALLY_EXPLICIT': {
                        scoreThreshold: 0.8
                    }
                },
                "languages": ['en']
            };

            client.comments.analyze({
                    key: API_KEY,
                    resource: analyzeRequest,
                }),
                (err, response) => {
                    if (err) throw err;
                    if (response.data.attributeScores === undefined) return;
                    if (response.data.attributeScores["SPAM"].spanScores !== undefined) {
                        const msgperspectivespam = JSON.stringify(response.data.attributeScores["SPAM"].spanScores, null, 2)
                        var rawprobposspam = msgperspectivespam.search("value")
                        var subrealmsgspam = msgperspectivespam.substr(rawprobposspam + 8, 5)
                        var realmsgspam = Number.parseFloat(subrealmsgspam)
                        const probability = toPercent(realmsgspam)
                        if (realmsgspam > 0.8) {
                            message.delete()
                            const SpamEmbed = new Discord.MessageEmbed()
                                .setTitle('Spam Alert')
                                .setColor('RED')
                                .setDescription('Sorry, I removed your message because my system marked it as spam! | My system is not perfect so, sorry if I was incorrect!')
                                .setFooter(`Probability: ${probability} | Type: Automatic single-message detection`)
                                .setTimestamp()
                            message.channel.send(SpamEmbed)
                                .then(msg => {
                                    msg.delete({
                                        timeout: 5000
                                    })
                                    var spamnum = db.get(`spam-${message.author.id}-${message.guild.id}`)
                                    if (spamnum === null) {
                                        db.set(`spam-${message.author.id}-${message.guild.id}`, 0)
                                    } else if (spamnum !== null) {
                                        db.set(`spam-${message.author.id}-${message.guild.id}`, spamnum + 1)
                                        var spamnum2 = db.get(`spam-${message.author.id}-${message.guild.id}`)
                                    }
                                })
                        }
                    } else if (response.data.attributeScores["IDENTITY_ATTACK"]) {
                        const msgperspectiveia = JSON.stringify(response.data.attributeScores["IDENTITY_ATTACK"].spanScores, null, 2)
                        var rawprobposia = msgperspectiveia.search("value")
                        var subrealmsgia = msgperspectiveia.substr(rawprobposia + 8, 5)
                        var realmsgia = Number.parseFloat(subrealmsgia)
                        const probability = toPercent(realmsgia)
                        if (realmsgia > 0.8) {
                            message.delete()
                            const IAEmbed = new Discord.MessageEmbed()
                                .setTitle('Identity Attack Alert')
                                .setColor('RED')
                                .setDescription('Sorry, I removed your message because my system marked it as identity attack! | My system is not perfect so, sorry if I was incorrect!')
                                .setFooter(`Probability: ${probability} | Type: Automatic single-message detection`)
                                .setTimestamp()
                            message.channel.send(IAEmbed)
                                .then(msg => {
                                    msg.delete({
                                        timeout: 5000
                                    })
                                    var ianum = db.get(`ia-${message.author.id}-${message.guild.id}`)
                                    if (ianum === null) {
                                        db.set(`ia-${message.author.id}-${message.guild.id}`, 0)
                                    } else if (ianum !== null) {
                                        db.set(`ia-${message.author.id}-${message.guild.id}`, ianum + 1)
                                        var ianum2 = db.get(`ia-${message.author.id}-${message.guild.id}`)
                                        if (ianum2 === 3) {

                                        }
                                    }
                                })
                        }
                    }
                }
        })
        .catch(err => {
            throw err;
        })
})*/
client.on("guildCreate", function (guild) {
        let defaultChannel = "";
        if (guild.channels.cache.find(c => c.name = 'general')) {
            defaultChannel = guild.channels.cache.get(c => c.name = 'general')
        } else {
            guild.channels.cache.forEach((channel) => {
                if (channel.type == "text" && defaultChannel == "") {
                    if (channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
                        defaultChannel = channel;
                    }
                }
            })
        }
        const joinembed = new Discord.MessageEmbed()
            .setTitle('Hello!')
            .setColor('GREEN')
            .addFields({
                name: 'Introduction',
                value: 'I see you have made the smart choice to invite me to your server! To start, try saying -g help for a list of commands! Also all jokes aside, thanks for adding this bot! (Help command currently not working)'
            }, {
                name: 'Useful commands',
                value: 'Don\'t worry, if you don\'t want a specific command available or only a certain role to access a specific command try: -g command disable (Command name) to disable a command and -g requiredrole (Command name) (@role). If I\'m in the way of another bot or you just wanna change my prefix do -g prefix (New prefix name)'
            }, {
                name: 'Help',
                value: 'For help, run the help command. It will provide a list of the current commands!'
            }, {
                name: 'Other stuff',
                value: 'If you added me for the xp system or anything that doesn\'t require a command to run, then it\'s fine, everything is already running right now!'
            }, {
                name: 'Credits',
                value: 'This bot was made by Super Kirby#6272, I have a youtube channel and if you could subscribe that would be very helpful! Just click the title (Hello!) to subscribe! This bot was also hugely impacted by the WOKcommands library which made the prefix, requiredrole and disable command!'
            })
            .setFooter('Click the title to subscribe ^v^', '')
            .setURL('https://www.youtube.com/channel/UCns3wCMCeusJyfDWsjKZRfQ?sub_confirmation=1')
        defaultChannel.send(joinembed)
    }),
    client.on('message', async (message) => {
        if (message.author.bot) return;
        if (message.guild === null) return;
        if (await db.has(`swear-${message.guild.id}`) === false) return
        if (swearjar.profane(message.content)) {
            if (await db.has(`censor-${message.guild.id}`) === false) {
                message.delete()
                const profanityembed = new Discord.MessageEmbed()
                    .setTitle('Profanity Detected!')
                    .addField(`Reminder/Warning`, `<@${message.author.id}>, that word is not allowed in this server! (||${message.content}||)`)
                    .addField(`Warn`, `Although, I hope you didn't mean to hurt anybody, I have deleted your message`)
                    .addField('Want to censor instead?', 'Instead of deleting the text, do you want me to censor it? To enable censoring, text -g censor to toggle it!')
                    .setFooter('CyberBullying is a serious crime, if you are harrassing/have harrassed or vice versa, please contact 999 for help!')
                    .setColor('RED')
                const privprofanityembed = new Discord.MessageEmbed()
                    .setTitle('Profanity Detected!')
                    .addField(`Reminder/Warning`, `<@${message.author.id}>, that word is not allowed in the server **${message.guild.name}**! (||${message.content}||)`)
                    .addField(`Warn`, `Although, I hope you didn't mean to hurt anybody, I have deleted your message`)
                    .setFooter('CyberBullying is a serious crime, if you are harrassing/have harrassed or vice versa, please contact 999 for help!')
                    .setColor('RED')
                message.channel.send(profanityembed)
                    .then(msg => {
                        msg.delete({
                            timeout: 5000
                        })
                    })
                message.author.send(privprofanityembed)
            } else {
                message.delete()
                var cleancontent = swearjar.censor(message.content)
                const webhooks = await message.channel.fetchWebhooks();
                const webhook = webhooks.first()
                if (webhook === undefined || null) {
                    message.channel.createWebhook(message.author.username, {
                        avatar: message.author.displayAvatarURL(),
                    })
                }
                try {
                    const webhooks2 = await message.channel.fetchWebhooks();
                    var webhook2 = webhooks2.first();
                    if (webhook2 === undefined) {
                        var webhook2 = await message.channel.createWebhook(message.author.username, {
                            avatar: message.author.displayAvatarURL()
                        })
                    }
                    await webhook2.edit({
                        name: message.author.username,
                        avatar: message.author.displayAvatarURL()
                    })
                    await webhook2.send(cleancontent, {
                        name: message.author.username
                    });
                } catch (error) {
                    console.error('Error trying to send: ', error);
                    message.delete()
                }
            }
        }
    })
client.on('message', async (message) => {
    if (message.guild === null) return;
    if (message.author.bot) return;
    if (await db.has(`onewordonly-${message.guild.id}-${message.channel.id}`)) {
        if (message.content.includes(' ')) {
            if (message.author.bot) return;
            if (message.content.toLowerCase().endsWith('onewordonly')) return;
            if (message.author.id === '748177086107091044') return oneworddelete(message);
            if (message.author.id === '737633914146914354') return oneworddelete(message);
            if (message.author.id === '771413271223468085') return oneworddelete(message);
            if (message.author.id === '629824530134597643') return oneworddelete(message);
            if (message.author.id === '695228246966534255') return oneworddelete(message);
            if (message.member.hasPermission('MANAGE_MESSAGES')) return;
            oneworddelete(message)
        }
        if (message.content.includes('ㅤ')) {
            if (message.author.bot) return;
            if (message.author.id === '748177086107091044') return oneworddelete1(message)
            if (message.author.id === '737633914146914354') return oneworddelete1(message)
            if (message.author.id === '771413271223468085') return oneworddelete1(message)
            if (message.author.id === '629824530134597643') return oneworddelete1(message)
            if (message.author.id === '695228246966534255') return oneworddelete1(message)
            if (message.member.hasPermission('MANAGE_MESSAGES')) return;
            oneworddelete1(message)
        }
    }
})

function oneworddelete(message) {
    message.delete()
    var onewordembed = new Discord.MessageEmbed()
        .setTitle('One Word Only!')
        .setColor('RED')
        .setDescription(`Sorry <@${message.author.id}>, you can only type one word at a time in this channel!`)
    message.channel.send(onewordembed)
        .then(async (msg) => {
            msg.delete({
                timeout: 3000
            })
        })
}

function oneworddelete1(message) {
    message.delete()
    var onewordembed1 = new Discord.MessageEmbed()
        .setTitle('No Invisible Characters!')
        .setColor('RED')
        .setDescription(`Sorry <@${message.author.id}>, you can only type one word at a time in this channel, don't try to bypass that with invisible characters!`)
    message.channel.send(onewordembed)
        .then(async (msg) => {
            msg.delete({
                timeout: 3000
            })
        })
}
client.on('messageDelete', async (messageDelete) => {
    if (!messageDelete.guild) return;
    if (messageDelete.mentions.users.first() === undefined && messageDelete.mentions.roles.first() === undefined) return;
    if (messageDelete.author.bot) return;
    var delusermentions = messageDelete.mentions.users.array()
    var delrolementions = messageDelete.mentions.roles.array()
    var delmentions = [].concat(delusermentions, delrolementions)
    if (delmentions.length === 0) return;
    else {
        await Discord.Util.delayFor(900);

        const fetchedLogs = await messageDelete.guild.fetchAuditLogs({
            limit: 1,
            type: 'MESSAGE_DELETE',
        });
        const deletionLog = fetchedLogs.entries.first();
        const {
            executor,
            target
        } = deletionLog
        if (!deletionLog) {
            var delperson = '(No correct MESSAGE_DELETE audit logs were found, sorry!)'
        } else if (deletionLog.extra.channel.id !== messageDelete.channel.id) {
            var delperson = '(No correct MESSAGE_DELETE audit logs were found, sorry!)'
        } else if (fetchedLogs.createdTimestamp > (Date.now() - 5000)) {
            var delperson = '(No correct MESSAGE_DELETE audit logs were found, sorry!)'
        } else {
            var delperson = executor
        }
        const delembed = new Discord.MessageEmbed()
            .setTitle('Ghost Ping!')
            .setColor('RED')
            .setDescription(`Ghost ping detected!\n<@${messageDelete.author.id}> just pinged ${delmentions.join(', ')} and then someone deleted the message!`)
            .addField('Deleted message content', `||${messageDelete.content}||`)
            .addField('Who deleted?', `The audit log shows that ${delperson} probably deleted this message. (Although, my system is not perfect! (tbh, it's almost always wrong, don't blame me, blame discord))`)
        messageDelete.channel.send(delembed)
    }
})
client.on('messageUpdate', async (oldMessage, messageDelete) => {
    if (!messageDelete.guild) return;
    if (oldMessage.author.bot) return;
    if (messageDelete.mentions.users.first() === undefined && messageDelete.mentions.roles.first() === undefined) return;
    if (oldMessage.mentions.users.first() === undefined) return;
    var delusermentions = messageDelete.mentions.users.array()
    var delrolementions = messageDelete.mentions.roles.array()
    var delmentions = [].concat(delusermentions, delrolementions)
    if (delmentions.length === 0) return;
    else {
        const editembed = new Discord.MessageEmbed()
            .setTitle('Ghost Ping!')
            .setColor('RED')
            .setDescription(`Ghost ping detected!\n<@${messageDelete.author.id}> just pinged ${delmentions.join(', ')} and then someone edited the message!`)
            .addField('Message content', `New Content: ||${messageDelete.content}||, Old Content: ||${oldMessage.content}||`)
        messageDelete.channel.send(editembed)
    }
})
client.on('guildMemberUpdate', (before, after) => {

    if (after.user.id !== "782233856572784680") return;

    if (after.nickname === before.nickname) return;

    after.setNickname('dont change name pls');
    setInterval(() => {
        after.setNickname('GamerCentral')
    }, 10000)
});
client.on('guildMemberAdd', async (member) => {
    if (await db.has(`captcha-${member.guild.id}`) === false) return;
    captchacheck(member)
})
client.ws.on('INTERACTION_CREATE', async (interaction) => {
    if (interaction.type === 3) return;
    const command = interaction.data.name.toLowerCase()
    const args = interaction.data.options

    if (command === 'help') {
        const description = args.find(arg => arg.name.toLowerCase() === 'category').value
        const recon = require('reconlx')
        const ReactionPages = recon.ReactionPages
        const Discord = require('discord.js')
        const help1 = new Discord.MessageEmbed()
            .setTitle('Moderation')
            .setColor('GREEN')
            .addField('Anti-GhostPing', 'When turned on, whenever a user mentions someone in a message and then deletes it, the bot will \'expose\' them')
            .addField('Anti-invite-off', 'Turns Anti-invite off (Works only if Anti-invite is on!) Syntax: aioff')
            .addField('Anti-invite-on', 'Turns on Anti-invite. Syntax: aion')
            .addField('Anti-swear', 'When turned on, whenever a user swears, it wil delete the message. Syntax: Antiswear (Switches between on and off)')
            .addField('Censor', 'Instead of deleting a message, it will censor the swears in the message! Syntax: Censor (Switches between on and off). (Anti-swear has to be on to use this!)')
            .addField('Ban', 'Bans a specific user. Syntax: Ban <@user> <reason>')
            .addField('Kick', 'Kicks a specific user. Syntax: Kick <@user> <reason>')
            .addField('Lock', 'Locks a specified channel to a specified role. Syntax: Lock <#channel> <@role>')
            .addField('Unlock', 'Unlocks a specified locked channel to the linked locked role. Syntax: Unlock <#channel> <@role>')
            .addField('Wipe', 'Clones a specified channel then deletes the old one, wiping all the messages from it. Syntax: Wipe <#channel>')
            .setFooter('Remember all commands start with the prefix, the default prefix is: -g .')
        const help2 = new Discord.MessageEmbed()
            .setTitle('Fun')
            .setColor('GREEN')
            .addField('Bobr', 'Sends a picture of bob ross (Don\'t ask me why). Syntax: Bobr')
            .addField('Bruh', 'Use when someone bruh moment. Syntax: Bruh')
            .addField('Cat', 'Sends a random picture of a cat. Syntax: Cat')
            .addField('Deep-fry', 'Sends a deep-fried version of an attached photo. Syntax: Upload an image, in the comments section when you upload it type (PREFIX)df')
            .addField('Doggo', 'Sends a random picture of a doggo. Syntax: Doggo')
            .addField('Invisible', 'Sends invisible characters to you so that you can copy them. Syntax: Invisible')
            .addField('Meme', 'Sends a random meme from r/memes. Syntax: Meme')
            .addField('Rank', 'Gives your current rank (Based on the xp system for messages). Syntax: Rank')
            .addField('Triggered', 'Sends a gif version with the TRIGGERED subtitle and a shaky image of a still image. Syntax: Upload an image, in the comments section when you upload it type (PREFIX)triggered')
            .addField('Weirdify', 'Sends a weird version of an attached photo. Syntax: Upload an image, in the comments section when you upload it type (PREFIX)wrd')
            .setFooter('Remember all commands start with the prefix, the default prefix is: -g .')
        const help3 = new Discord.MessageEmbed()
            .setTitle('Misc')
            .setColor('GREEN')
            .addField('Covid', 'Sends the current world-wide stats for covid-19. Syntax: Covid')
            .addField('Help', 'This command lol. Syntax: Help <all, misc, fun or moderation>')
            .addField('Search', 'Searches a query on google. Syntax: Search <query>')
            .addField('Weather', 'Sends the current weather of a city. Syntax: Weather <city>')
            .addField('Whois', 'Gives information on a user. Syntax: Whois <@user>')
            .addField('Wikisearch', 'Searches a query on the wiki, if a wiki page is not found, the next best result will be sent. Syntax: Wikisearch <query>')
            .setFooter('Remember all commands start with the prefix, the default prefix is: -g .')

        if (description === 'moderation') {
            var embeddata = await createAPIMessage(interaction, help1)
        } else if (description === 'misc') {
            var embeddata = await createAPIMessage(interaction, help3)
        } else if (description === 'fun') {
            var embeddata = await createAPIMessage(interaction, help2)
        }
        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: embeddata
            }
        })
    } else if (command === 'support') {
        const description = args.find(arg => arg.name.toLowerCase() === 'category').value
        if (description === 'youtube') {
            sendMessage(interaction, 'https://www.youtube.com/superkirby?sub_confirmation=1')
        } else if (description === 'donation') {
            sendMessage(interaction, 'Hey, I see you\'re interested in donating! I really do appreciate that but I don\'t have a service that accepts donations. Maybe in the future...')
        } else if (description === 'discord') {
            sendMessage(interaction, 'Hey, thanks for being interested, here is a cool discord server: https://www.discord.gg/H3UmmggFYs')
        }
    } else if (command === 'whois') {
        const userid1 = args.find(arg => arg.name.toLowerCase() === 'user').value
        const user1 = client.users.cache.get(userid1);
        const guild1 = client.guilds.cache.get(interaction.guild_id)
        const member1 = guild1.member(user1)
        const channel1 = guild1.channels.cache.get(interaction.channel_id)
        let usercreated = user1.createdTimestamp
        const HighestRole = member1.roles.highest
        const nitroboost = new Date(member1.premiumSinceTimestamp).toLocaleDateString()
        if (nitroboost !== '1/1/1970') {
            var nitroboost1 = new Date(member1.premiumSinceTimestamp).toLocaleDateString()
        }
        if (member1.bannable) {
            var banemoji = '✅'
        }
        if (member1.hasPermission('BAN_MEMBERS')) {
            var adminemoji = '✅'
        }
        if (user1.bot) {
            var botemoji = '✅'
        }
        if (user1.flags.toArray().includes('HOUSE_BRAVERY')) {
            var HypeSquad1 = 'Bravery'
        } else if (user1.flags.toArray().includes('HOUSE_BRILLIANCE')) {
            var HypeSquad2 = 'Brilliance'
        } else if (user1.flags.toArray().includes('HOUSE_BALANCE')) {
            var HypeSquad3 = 'Balance'
        }
        var flags0 = user1.flags.toArray()
        var realflags = arrayRemove(flags0, 'HOUSE_BRAVERY', 'HOUSE_BRRILLIANCE', 'HOUSE_BALANCE')
        let realflagsnone = null;
        if (realflags = []) {
            let realflagsnone = 'None'
        }
        const usercolor = member1.displayHexColor
        const whoisembed = new Discord.MessageEmbed()
            .setAuthor(`User Info for ${user1.username}`, user1.displayAvatarURL())
            .setColor(usercolor)
            .setTitle('User Info')
            .addFields({
                name: 'Nametag',
                value: user1.username + '#' + user1.discriminator,
                inline: true,
            }, {
                name: 'Nickname',
                value: member1.nickname || 'None',
                inline: true,
            }, {
                name: 'Bot',
                value: botemoji || '❌',
                inline: true,
            }, {
                name: 'Server Join Date',
                value: new Date(member1.joinedTimestamp).toLocaleDateString(),
                inline: true,
            }, {
                name: 'Discord Join Date',
                value: new Date(user1.createdTimestamp).toLocaleDateString(),
                inline: true,
            }, {
                name: 'Nitro Boost Date',
                value: nitroboost1 || 'Hasnt boosted',
                inline: true,
            }, {
                name: 'Bannable',
                value: banemoji || '❌',
                inline: true,
            }, {
                name: 'Admin',
                value: adminemoji || '❌',
                inline: true,
            }, {
                name: 'Highest Role',
                value: `${HighestRole.name}` || 'This user does not have any roles',
                inline: true,
            }, {
                name: 'Status',
                value: member1.presence.status.toUpperCase(),
                inline: true,
            }, {
                name: 'HypeSquad',
                value: HypeSquad1 || HypeSquad2 || HypeSquad3 || 'None',
                inline: true,
            }, )

        channel1.send(whoisembed)

    } else if (command === 'wikisearch') {
        const guild1 = client.guilds.cache.get(interaction.guild_id)
        const channel1 = guild1.channels.cache.get(interaction.channel_id)

        let wikigoogleKey = process.env.googlewikitok
        let csx = "b8ae984500dc84811"
        let query = args.find(arg => arg.name.toLowerCase() === 'query').value
        let result;

        let href = await wikisearch(query, interaction, wikigoogleKey, csx)

        const wikisearchembed = new Discord.MessageEmbed()
            .setTitle(href.title)
            .setDescription(href.snippet)
            .setImage(href.pagemap && href.pagemap.cse_thumbnail ? href.pagemap.cse_thumbnail[0].src : null)
            .setURL(href.link)
            .setColor("GREEN")
            .setFooter("Powered by Google™ and WikiPedia™")

        sendMessage(interaction, wikisearchembed)
    } else if (command === 'weather') {
        let city = args.find(arg => arg.name.toLowerCase() === 'city').value
        let degreetype = 'C'

        await weather.find({
            search: city,
            degreeType: degreetype
        }, function (err, result) {
            if (!city) return sendMessage(interaction, 'Please specify the city!')
            if (err || result === undefined || result.length === 0) return sendMessage(interaction, 'Sorry, I don\'t recognize that city, try being less specific!')

            let current = result[0].current
            let location = result[0].location

            let degreetype1 = location.degreetype

            const weatherembed = new Discord.MessageEmbed()
                .setAuthor(current.observationpoint)
                .setDescription(`${current.skytext}`)
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

            return sendMessage(interaction, weatherembed)
        })
    } else if (command === 'unlock') {
        const userid = interaction.member.user.id
        const user = client.users.cache.get(userid);
        const guild = client.guilds.cache.get(interaction.guild_id)
        const member = guild.member(user)
        const channel = guild.channels.cache.get(interaction.channel_id)
        if (!member.hasPermission("MANAGE_CHANNELS")) return sendMessage(interaction, 'Sorry, you don\'t have the correct permissions to do that! `(MANAGE CHANNELS)`')

        let lockchannel = guild.channels.cache.get(args.find(arg => arg.name.toLowerCase() === 'channel').value)
        if (channel.type !== 'text') return sendMessage(interaction, `Sorry, I cannot unlock that channel because the type of the channel is type: \`${channel.type}\`. I only support text channels!`)

        if (!await db.has(`lock-${guild.id}-${lockchannel.id}`)) return sendMessage(interaction, 'That channel isn\'t locked!')

        let lockrole = guild.roles.cache.get(args.find(arg => arg.name.toLowerCase() === 'role').value)

        const unlockembed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('🔓 CHANNEL UNLOCKED 🔓')
            .setDescription(`Successfully unlocked the channel \`${lockchannel.name}\` to \`${lockrole.name}\`.`)

        lockchannel.updateOverwrite(lockrole, {
            SEND_MESSAGES: true
        });

        db.delete(`lock-${guild.id}-${lockchannel.id}`)

        sendMessage(interaction, unlockembed)
    } else if (command === 'lock') {
        const userid = interaction.member.user.id
        const user = client.users.cache.get(userid);
        const guild = client.guilds.cache.get(interaction.guild_id)
        const member = guild.member(user)
        const channel = guild.channels.cache.get(interaction.channel_id)
        if (!member.hasPermission("MANAGE_CHANNELS")) return sendMessage(interaction, 'Sorry, you don\'t have the correct permissions to do that! `(MANAGE CHANNELS)`')

        let lockchannel = guild.channels.cache.get(args.find(arg => arg.name.toLowerCase() === 'channel').value)
        if (channel.type !== 'text') return sendMessage(interaction, `Sorry, I cannot lock that channel because the type of the channel is type: \`${channel.type}\`. I only support text channels!`)

        if (await db.has(`lock-${guild.id}-${lockchannel.id}`)) return sendMessage(interaction, 'That channel is already locked!')

        let lockrole = guild.roles.cache.get(args.find(arg => arg.name.toLowerCase() === 'role').value)

        const lockembed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('🔒 CHANNEL LOCKED 🔒')
            .setDescription(`Successfully locked the channel \`${lockchannel.name}\` to \`${lockrole.name}\`. To unlock the channel, just say -g unlock (or /unlock) and if you mentioned a channel or role, remember to re-mention it in the unlock command!`)

        lockchannel.updateOverwrite(lockrole, {
            SEND_MESSAGES: false
        });

        db.set(`lock-${guild.id}-${lockchannel.id}`, true)

        sendMessage(interaction, lockembed)
    } else if (command === 'search') {
        let googleKey = process.env.googletok
        let csx = "984e3a39fc150ebad"
        let query = args.find(arg => arg.name.toLowerCase() === 'query').value
        let result;

        let href = await search(query, googleKey, csx, interaction)

        const searchembed = new Discord.MessageEmbed()
            .setTitle(href.title)
            .setDescription(href.snippet)
            .setImage(href.pagemap && href.pagemap.cse_thumbnail ? href.pagemap.cse_thumbnail[0].src : null)
            .setURL(href.link)
            .setColor("GREEN")
            .setFooter("Powered by Google™")

        return sendMessage(interaction, searchembed)

    } else if (command === 'sanitize') {
        const userid = interaction.member.user.id
        const user = client.users.cache.get(userid);
        const guild = client.guilds.cache.get(interaction.guild_id)
        const member = guild.member(user)
        if (!member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('Sorry, you don\'t have the correct permissions to do that! `(MANAGE_CHANNELS)`')
        var channel = await client.channels.fetch(args.find(arg => arg.name.toLowerCase() === 'channel').value)
            .catch(err => {
                sendMessage(interaction, 'Sorry, I\'m having trouble finding that channel!')
            })
        if (channel.type !== 'text') return sendMessage(interaction, `Sorry, I cannot sanitize that channel because the type of the channel is type: \`${channel.type}\`. I only support text channels!`)
        channel.send('🧹 Starting cleanup...')
            .then(msg => {
                setTimeout(() => {
                    msg.edit('🍽 Cleaning the dishes...')
                        .then(msg1 => {
                            setTimeout(() => {
                                msg1.edit('🦠 Checking for covid-19...')
                                    .then(msg2 => {
                                        setTimeout(() => {
                                            const randomnum = Math.floor(Math.random() * 2)
                                            if (randomnum === 1) {
                                                msg2.edit('🦠 Bad news! We found some covid-19! Disinfecting... 🤿')
                                                    .then(msg3 => {
                                                        setTimeout(() => {
                                                            const randomnum1 = Math.floor(Math.random() * 2)
                                                            if (randomnum1 === 1) {
                                                                msg3.edit('💉 Uh oh! We disinfected this channel but couldn\'t cure everyone!')
                                                                    .then(msg4 => {
                                                                        setTimeout(() => {
                                                                            msg4.edit('⚗ Please wait, we are waiting for symptoms to pass...')
                                                                                .then(msg5 => {
                                                                                    setTimeout(() => {
                                                                                        msg5.edit('💊 Everyone\'s symptoms have passed!')
                                                                                            .then(msg => {
                                                                                                setTimeout(async () => {
                                                                                                    msg.edit('💬 Checking for any cases of Swearge (The urge to swear) in the last 100 messages...')
                                                                                                    await checkMessages(msg, channel)
                                                                                                }, 5000)
                                                                                            })
                                                                                    }, 5000)
                                                                                })
                                                                        }, 10000)
                                                                    })
                                                            } else {
                                                                msg3.edit('🧪 Good news! We disinfected this channel and cured everyone!')
                                                                    .then(msg41 => {
                                                                        setTimeout(async () => {
                                                                            msg41.edit('💬 Checking for any cases of Swearge (The urge to swear) in the last 100 messages...')
                                                                            await checkMessages(msg, channel)
                                                                        }, 5000)
                                                                    })
                                                            }
                                                        }, 5000)
                                                    })
                                            } else {
                                                msg2.edit('🦠 Good news! No covid-19 found.')
                                                    .then(msg31 => {
                                                        setTimeout(async () => {
                                                            msg31.edit('💬 Checking for any cases of Swearge (The urge to swear) in the last 100 messages...')
                                                            await checkMessages(msg, channel)
                                                        }, 5000)
                                                    })
                                            }
                                        }, 5000)
                                    })
                            }, 5000)
                        })
                }, 5000)
            })
    } else if (command === 'streamtweets') {
        const userid = interaction.member.user.id
        const user = client.users.cache.get(userid);
        const guild = client.guilds.cache.get(interaction.guild_id)
        const member = guild.member(user)
        if (!member.hasPermission('MANAGE_CHANNELS')) return sendMessage(interaction, 'Sorry, you don\'t have the correct permissions to do that! `(MANAGE_CHANNELS)`')
        var hashtag = args.find(arg => arg.name === 'hashtag').value
        if (!hashtag.startsWith('#')) return sendMessage(interaction, 'That\'s not a hashtag, it doesn\'t start with #')
        if (hashtag.includes(' ')) {
            var spacelocation = hashtag.search(' ')
            var hashtag = hashtag.slice(0, spacelocation)
        }
        var stream = tclient.stream('statuses/filter', {
            track: hashtag
        });
        var channel = await client.channels.fetch(args.find(arg => arg.name === 'channel').value)
        if (await db.has(`tweetstream-${guild.id}-${channel.id}`)) return sendMessage(interaction, `Sorry, there\'s already a tweet stream in <#${channel.id}>. You can disable it with the command dstweets <#channel>!`)
        await db.set(`tweetstream-${guild.id}-${channel.id}`, hashtag)
        sendMessage(interaction, `Streaming all tweets that include ${hashtag} to <#${channel.id}>. You can disable this with the command dstweets <#channel>`)
        stream.on('data', async function (event) {
            var lasttweet = await db.get(`lasttweettime-${guild.id}-${channel.id}`)
            if (lasttweet === undefined) {
                await db.set(`lasttweettime-${guild.id}-${channel.id}`, false)
            }
            if ((Date.now() - lasttweet) < 30000 || lasttweet === false) return;
            await db.set(`lasttweettime-${guild.id}-${channel.id}`, Date.now())
            if ((parseInt(event.timestamp_ms) - Date.now()) > 60000) return;
            if (event.filter_level !== 'low') return;
            if (swearjar.profane(event.text) && await db.has(`swear-${guild.id}`) && !await db.has(`censor-${guild.id}`)) return;
            if (await db.has(`censor-${guild.id}`)) {
                var streamembed = new Discord.MessageEmbed()
                    .setTitle('New Tweet by a verified user!')
                    .setColor('#08a0e9')
                    .setURL(`https://www.twitter.com/${event.user.screen_name}/status/${event.id_str}`)
                    .setThumbnail(event.user.profile_image_url)
                    .addField(`${event.user.screen_name} says...`, swearjar.censor(event.text))
                    .setTimestamp()
                channel.send(streamembed)
            } else {
                if (event.user.verified) {
                    var streamembed = new Discord.MessageEmbed()
                        .setTitle('New Tweet by a verified user!')
                        .setColor('#08a0e9')
                        .setURL(`https://www.twitter.com/${event.user.screen_name}/status/${event.id_str}`)
                        .setThumbnail(event.user.profile_image_url)
                        .addField(`${event.user.screen_name} says...`, event.text)
                        .setTimestamp()
                    channel.send(streamembed)
                } else {
                    var streamembed = new Discord.MessageEmbed()
                        .setTitle('New Tweet!')
                        .setColor('#08a0e9')
                        .setURL(`https://www.twitter.com/${event.user.screen_name}/status/${event.id_str}`)
                        .setThumbnail(event.user.profile_image_url)
                        .addField(`${event.user.screen_name} says...`, event.text)
                        .setTimestamp()
                    channel.send(streamembed)
                }
            }
        });

        stream.on('error', function (error) {
            console.log(error)
        });
    }
})
async function createAPIMessage(interaction, content) {
    const apiMessage = await Discord.APIMessage.create(client.channels.resolve(interaction.channel_id), content)
        .resolveData()
        .resolveFiles()

    return {
        ...apiMessage.data,
        files: apiMessage.files
    }
}
async function sendMessage(interaction, content) {
    var channelid = interaction.channel_id
    client.channels.fetch(channelid).then(channel => {
        channel.send(content)
    }).catch(console.error)
}

function arrayRemove(arr, value) {

    return arr.filter(function (ele) {
        return ele != value;
    });
}
async function wikisearch(query, interaction, googleKey, csx) {
    const {
        body
    } = await request.get("https://www.googleapis.com/customsearch/v1/siterestrict?https://wikipedia.org").query({
        key: googleKey,
        cx: csx,
        safe: "off",
        q: query
    })

    if (!body.items) {
        sendMessage(interaction, 'Sorry, I couldn\'t find anything on wikipedia that matches your query!')
        return null
    }
    return body.items[0]
}
async function search(query, googleKey, csx, interaction) {
    const {
        body
    } = await request.get("https://www.googleapis.com/customsearch/v1").query({
        key: googleKey,
        cx: csx,
        safe: "off",
        q: query
    })

    if (!body.items) {
        sendMessage(interaction, 'Sorry, I couldn\'t find anything that matches your query!')
        return null
    }
    return body.items[0]
}
async function checkMessages(msgtoedit, channel) {
    await channel.messages.fetch({
        limit: 100
    }).then(async messages => {
        setTimeout(async () => {
            await messages.forEach(async message1 => {
                if (swearjar.profane(message1.content)) {
                    message1.delete()
                }
            })
            msgtoedit.edit(`✨ Good news! We disinfected all cases of Swearge in this channel! (if any)`)
        }, 5000)
    })
}