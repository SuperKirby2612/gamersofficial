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


const SETTINGS_FILE = 'settings.json';

let DISCORD_TOK = null;
let witAPIKEY = null;
let MONGOOSE_TOK = null;
let GOOGLE_TOK = null;
let SPOTIFY_TOKEN_ID = null;
let SPOTIFY_TOKEN_SECRET = null;

function loadConfig() {
    const CFG_DATA = JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8'));

    DISCORD_TOK = process.env.discord_token
    witAPIKEY = CFG_DATA.wit_ai_token;
    MONGOOSE_TOK = process.env.MONGO_URI
    GOOGLE_TOK = process.env.googletok
}
loadConfig()
// My Part //
const Discord = require('discord.js'),
    Distube = require('distube'),
    client = new Discord.Client({
        partials: ['MESSAGE', 'REACTION'],
    })
const PREFIX = "-g"
const mongoose = require('mongoose')
mongoose.connect(MONGOOSE_TOK, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const search = require('youtube-search')
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
    key: SETTINGS_FILE.YOUTUBE_TOKEN,
    type: 'video'
}
const Levels = require('discord-xp')

Levels.setURL(MONGOOSE_TOK)

const WOKcommands = require('wokcommands')

const canvacord = require('canvacord')

const nsfwjs = require('nsfwjs')

const fspromises = require('fs').promises

const wavconvert = require('wav-converter')

const download = require('image-downloader')

const toPercent = require('decimal-to-percent')

const dig = require('discord-image-generation')

const texttoimage = require('text-to-image')

const swearjar = require('swearjar')

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

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
    new WOKcommands(client, 'commands', 'features')
        .setMongoPath(MONGOOSE_TOK)
        .setDefaultPrefix('-g ')
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
                required: false
            }]
        }
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
client.login(DISCORD_TOK)

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
const rec = PREFIX + 'record'

const db = require('./db');
const {
    isUndefined
} = require('underscore');
client.on("voiceStateUpdate", async function (oldMember, newMember) {
    if (oldMember !== null && newMember === null && recordstate === true) {
        writer.end();
    }
})
client.on('message', async (message) => {
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

        if (message.content.trim().toLowerCase() == '-g record') { // Apparently, a sound needs to be played before the bot can start hearing! Not fixed
            const voicechannel = message.member.voice.channel
            if (!voicechannel) return message.channel.send('Please join a VC first!');
            var recordstate = true;
            const connection = await message.member.voice.channel.join().then(async (connectionvc) => {
                connectionvc.play(path.join(__dirname, 'discordjoinvcsound.mp3'))
            })
            setTimeout(async () => {
                const receiver1 = await connection.receiver.createStream(message.member, {
                    mode: 'pcm',
                    end: "manual"
                })
                const idplus = `${message.author.id}-${Date.now()}`
                const writer = await receiver1.pipe(fs.createWriteStream(`./temp/recorded-${idplus}.pcm`))
                writer.on('finish', async () => {
                    await message.channel.send('I stopped recording because you left the VC.');
                    var pcmData = fs.readFileSync(path.resolve(`./temp/recorded-${idplus}.pcm`))
                    var wavData = wavconvert.encodeWav(pcmData, {
                        numChannels: 1,
                        sampleRate: 16000,
                        byteRate: 16
                    })
                    fs.writeFileSync(path.resolve(`./temp/recorded-${idplus}.wav`), wavData)
                    var wavfile = `./temp/recorded-${idplus}.wav`
                    var stats = fs.statSync(wavfile)
                    var fileSizeInBytes = stats.size;
                    var size = fileSizeInBytes / (1024 * 1024);
                    if (size >= 8) return message.channel.send('Sorry, the recording\'s size was too big so I had to cancel the operation!')
                    var recordstate = false;
                    message.channel.send('Here is your audio file!')
                    await message.channel.send({
                        files: [`./temp/recorded-${idplus}.pcm`]
                    })
                })
            }, 500)
        } else if (cmd === '-gplay') {
            if (!message.member.voice.channel) return message.channel.send('Sorry, you need to be in a VC to play a song!')
            distube.play(message, args.join(" "))
        }

    }),
    client.on('message', async (message) => {
        try {
            if (message.content.trim().toLowerCase() == lb) {
                const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10)
                if (rawLeaderboard.length < 1) return reply('Nobody has any XP, so there is no leaderboard, try sending a message!')

                const newLeaderboard = Levels.computeLeaderboard(client, rawLeaderboard)

                const lbmap = (await newLeaderboard).map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`)
                var LeaderboardEmbed = new Discord.MessageEmbed()
                    .setTitle('🏆 Leaderboard 🏆')
                    .setColor('BLUE')
                    .setDescription(`${lbmap.join("\n\n")}`)
                message.channel.send(LeaderboardEmbed)
            }
        } catch (e) {
            console.log('discordClient message: ' + e);
        }
    })
client.on('voiceStateUpdate', (oldMember, newMember) => {
    if (oldMember.channelID !== null && newMember.channelID === null) {
    }
})
client.on('message', (message) => {
    if (message.author.bot) return;
    API_KEY = process.env.PERSPECTIVE_API_KEY
    DISCOVERY_URL = 'https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1'
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
})
client.on("guildCreate", function (guild) {
        let defaultChannel = "";
        guild.channels.cache.forEach((channel) => {
            if (channel.type == "text" && defaultChannel == "") {
                if (channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
                    defaultChannel = channel;
                }
            }
        })
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
    var delusermentions = messageDelete.mentions.users.array()
    var delrolementions = messageDelete.mentions.roles.array()
    var delmentions = [].concat(delusermentions, delrolementions)
    if (delmentions === []) return;
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
client.on('guildMemberUpdate', (before, after) => {

    if (after.user.id !== "782233856572784680") return;

    if (after.nickname === before.nickname) return;

    after.setNickname('dont change name pls');
    setInterval(() => {
        after.setNickname('GamerCentral')
    }, 10000)
});
client.ws.on('INTERACTION_CREATE', async (interaction) => {
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