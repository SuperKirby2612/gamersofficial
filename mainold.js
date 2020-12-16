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


async function convert_audio(infile, outfile, cb) {
    try {
        let SoxCommand = require('sox-audio');
        let command = SoxCommand();
        streamin = fs.createReadStream(infile);
        streamout = fs.createWriteStream(outfile);
        command.input(streamin)
            .inputSampleRate(48000)
            .inputEncoding('signed')
            .inputBits(16)
            .inputChannels(2)
            .inputFileType('raw')
            .output(streamout)
            .outputSampleRate(16000)
            .outputEncoding('signed')
            .outputBits(16)
            .outputChannels(1)
            .outputFileType('wav');

        command.on('end', function () {
            streamout.close();
            streamin.close();
            cb();
        });
        command.on('error', function (err, stdout, stderr) {
            console.log('Cannot process audio: ' + err.message);
            console.log('Sox Command Stdout: ', stdout);
            console.log('Sox Command Stderr: ', stderr)
        });

        command.run();
    } catch (e) {
        console.log('convert_audio: ' + e)
    }
}
const SETTINGS_FILE = 'settings.json';

let DISCORD_TOK = null;
let witAPIKEY = null;
let SPOTIFY_TOKEN_ID = null;
let SPOTIFY_TOKEN_SECRET = null;

function loadConfig() {
    const CFG_DATA = JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8'));

    DISCORD_TOK = CFG_DATA.discord_token;
    witAPIKEY = CFG_DATA.wit_ai_token;
}
loadConfig()
// My Part //
const Discord = require('discord.js'),
DisTube = require('distube'),
client = new Discord.Client();
const PREFIX = "-g "

const {
    settings
} = require('cluster');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
    const command = require('./commands/' + file);

    client.commands.set(command.name, command)

}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
    client.user.setActivity('YOU', {
        type: 'WATCHING'
    });
});
client.login(DISCORD_TOK)

const _CMD_HELP = PREFIX + 'help';
const _CMD_JOIN = PREFIX + 'join';
const _CMD_LEAVE = PREFIX + 'leave';
const _CMD_DEBUG = PREFIX + 'debug';
const _CMD_TEST = PREFIX + 'hello';
const ping = PREFIX + 'ping';
const wipe = PREFIX + 'wipe';
const cheese = PREFIX + 'cheese';
const lock = PREFIX + 'lock';
const doggo = PREFIX + 'doggo';
const cat = PREFIX + 'cat';
const bobr = PREFIX + 'bobr';
const unicorn = PREFIX + 'unicorn';
const amongus = PREFIX + 'amongus';
const bruh = PREFIX + 'bruh'

const guildMap = new Map();

client.on('message', async (message) => {
    const args = message.content.slice(PREFIX.length).split(/ +/);
    try {
        if (!('guild' in message) || !message.guild) return; // prevent private messages to bot
        const mapKey = message.guild.id;
        if (message.content.trim().toLowerCase() == _CMD_JOIN) {
            if (!message.member.voice.channelID) {
                message.reply('Error: please join a voice channel first.')
            } else {
                if (!guildMap.has(mapKey))
                    await connect(message, mapKey)
                else
                    message.reply('Already connected')
            }
        } else if (message.content.trim().toLowerCase() == _CMD_LEAVE) {
            if (guildMap.has(mapKey)) {
                let val = guildMap.get(mapKey);
                if (val.voice_Channel) val.voice_Channel.leave()
                if (val.voice_Connection) val.voice_Connection.disconnect()
                if (val.musicYTStream) val.musicYTStream.destroy()
                guildMap.delete(mapKey)
                message.reply("Disconnected.")
            } else {
                message.reply("Cannot leave because not connected.")
            }
        } else if (message.content.trim().toLowerCase() == _CMD_HELP) {
            message.reply(getHelpString());
        } else if (message.content.trim().toLowerCase() == _CMD_DEBUG) {
            console.log('toggling debug mode')
            let val = guildMap.get(mapKey);
            if (val.debug)
                val.debug = false;
            else
                val.debug = true;
        } else if (message.content.trim().toLowerCase() == _CMD_TEST) {
            message.reply('hello back =)')
        } else if (message.content.trim().toLowerCase() == ping) {
            client.commands.get('ping').execute(message, args)
        } else if (message.content.trim().toLowerCase() == wipe) {
            client.commands.get('wipe').execute(message, args)
        } else if (message.content.trim().toLowerCase() == cheese) {
            client.commands.get('cheese').execute(message, args)
        } else if (message.content.trim().toLowerCase() == lock) {
            client.commands.get('lock').execute(message, args)
        } else if (message.content.trim().toLowerCase() == doggo) {
            client.commands.get('doggo').execute(message, args)
        } else if (message.content.trim().toLowerCase() == cat) {
            client.commands.get('cat').execute(message, args)
        } else if (message.content.trim().toLowerCase() == bobr) {
            client.commands.get('bobr').execute(message, args)
        } else if (message.content.trim().toLowerCase() == unicorn) {
            client.commands.get('unicorn').execute(message, args)
        } else if (message.content.trim().toLowerCase() == amongus) {
            client.commands.get('amongus').execute(message, args)
        } else if (message.content.trim().toLowerCase() == bruh) {
            client.commands.get('bruh').execute(message, args)
        }
    } catch (e) {
        console.log('discordClient message: ' + e)
    }
    //Other (again)
    function getHelpString() {
        let out = '**COMMANDS:**\n'
        out += '```'
        out += PREFIX + 'join\n';
        out += PREFIX + 'leave\n';
        out += '```'
        return out;
    }
    const {
        Readable
    } = require('stream');

    const SILENCE_FRAME = Buffer.from([0xF8, 0xFF, 0xFE]);

    class Silence extends Readable {
        _read() {
            this.push(SILENCE_FRAME);
            this.destroy();
        }
    }

    async function connect(msg, mapKey) {
        try {
            let voice_Channel = await client.channels.fetch(msg.member.voice.channelID);
            if (!voice_Channel) return msg.reply("Error: The voice channel does not exist!");
            let text_Channel = await client.channels.fetch(msg.channel.id);
            if (!text_Channel) return msg.reply("Error: The text channel does not exist!");
            let voice_Connection = await voice_Channel.join();
            voice_Connection.play(new Silence(), {
                type: 'opus'
            });
            guildMap.set(mapKey, {
                'text_Channel': text_Channel,
                'voice_Channel': voice_Channel,
                'voice_Connection': voice_Connection,
                'musicQueue': [],
                'musicDispatcher': null,
                'musicYTStream': null,
                'currentPlayingTitle': null,
                'currentPlayingQuery': null,
                'debug': false,
            });
            speak_impl(voice_Connection, mapKey)
            voice_Connection.on('disconnect', async (e) => {
                if (e) console.log(e);
                guildMap.delete(mapKey);
            })
            msg.reply('connected!')
        } catch (e) {
            console.log('connect: ' + e)
            msg.reply('Error: unable to join your voice channel.');
            throw e;
        }
    }


    function speak_impl(voice_Connection, mapKey) {
        voice_Connection.on('speaking', async (user, speaking) => {
            if (speaking.bitfield == 0 /*|| user.bot*/ ) {
                return
            }
            console.log(`I'm listening to ${user.username}`)

            const filename = './temp/audio_' + mapKey + '_' + user.username.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '_' + Date.now() + '.tmp';
            let ws = fs.createWriteStream(filename);

            // this creates a 16-bit signed PCM, stereo 48KHz stream
            const audioStream = voice_Connection.receiver.createStream(user, {
                mode: 'pcm'
            })
            audioStream.pipe(ws)

            audioStream.on('error', (e) => {
                console.log('audioStream: ' + e)
            });
            ws.on('error', (e) => {
                console.log('ws error: ' + e)
            });
            audioStream.on('end', async () => {
                const stats = fs.statSync(filename);
                const fileSizeInBytes = stats.size;
                const duration = fileSizeInBytes / 48000 / 4;
                console.log("duration: " + duration)

                if (duration < 0.5 || duration > 19) {
                    console.log("TOO SHORT / TOO LONG; SKIPPING")
                    fs.unlinkSync(filename)
                    return;
                }

                const newfilename = filename.replace('.tmp', '.raw');
                fs.rename(filename, newfilename, (err) => {
                    if (err) {
                        console.log('ERROR270:' + err)
                        fs.unlinkSync(filename)
                    } else {
                        let val = guildMap.get(mapKey)
                        const infile = newfilename;
                        const outfile = newfilename + '.wav';
                        try {
                            convert_audio(infile, outfile, async () => {
                                let out = await transcribe(outfile);
                                if (out != null)
                                    process_commands_query(out, mapKey, user);
                                if (!val.debug) {
                                    fs.unlinkSync(infile)
                                    fs.unlinkSync(outfile)
                                }
                            })
                        } catch (e) {
                            console.log('tmpraw rename: ' + e)
                            if (!val.debug) {
                                fs.unlinkSync(infile)
                                fs.unlinkSync(outfile)
                            }
                        }
                    }

                });


            })
        })
    }


    function process_commands_query(txt, mapKey, user) {
        if (txt && txt.length) {
            let val = guildMap.get(mapKey);
            val.text_Channel.send(user.username + ': ' + txt)
        }
    }


    //////////////////////////////////////////
    //////////////// SPEECH //////////////////
    //////////////////////////////////////////
    async function transcribe(file) {

        return transcribe_witai(file)
        // return transcribe_gspeech(file)
    }

    // WitAI
    let witAI_lastcallTS = null;
    const witClient = require('node-witai-speech');
    async function transcribe_witai(file) {
        try {
            // ensure we do not send more than one request per second
            if (witAI_lastcallTS != null) {
                let now = Math.floor(new Date());
                while (now - witAI_lastcallTS < 1000) {
                    console.log('sleep')
                    await sleep(100);
                    now = Math.floor(new Date());
                }
            }
        } catch (e) {
            console.log('transcribe_witai 837:' + e)
        }

        try {
            console.log('transcribe_witai')
            const extractSpeechIntent = util.promisify(witClient.extractSpeechIntent);
            var stream = fs.createReadStream(file);
            const output = await extractSpeechIntent(witAPIKEY, stream, "audio/wav")
            witAI_lastcallTS = Math.floor(new Date());
            console.log(output)
            stream.destroy()
            if (output && '_text' in output && output._text.length)
                return output._text
            if (output && 'text' in output && output.text.length)
                return output.text
            return output;
        } catch (e) {
            console.log('transcribe_witai 851:' + e)
        }
        if ('transcribe_witai' == 'test') {
            console.log("Test found!")
        }
    }
})
//DisTube
const distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true, highWaterMark: 1 << 25 });

client.on("message", async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(PREFIX)) return;
    const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
    const command = args.shift();

    if (command == "play")
        distube.play(message, args.join(" "));

    if (["repeat", "loop"].includes(command))
        distube.setRepeatMode(message, parseInt(args[0]));

    if (command == "stop") {
        distube.stop(message);
        message.channel.send("Stopped!");
    }

    if (command == "queue") {
        let queue = distube.getQueue(message);
        message.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
            `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
        ).join("\n"));
    }

    if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`].includes(command)) {
        let filter = distube.setFilter(message, command);
        message.channel.send("Current queue filter: " + (filter || "Off"));
    }

    if (command == "volume") {

    }
});
//Distube Queue
const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;
//Distube event listeners
distube
    .on("playSong", (message, queue, song) => message.channel.send(
        `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`
    ))
    .on("addSong", (message, queue, song) => message.channel.send(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    ))
    .on("playList", (message, queue, playlist, song) => message.channel.send(
        `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    ))
    .on("addList", (message, queue, playlist) => message.channel.send(
        `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
    ))
    // DisTubeOptions.searchSongs = true
    .on("searchResult", (message, result) => {
        let i = 0;
        message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
    })
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", (message) => message.channel.send(`Searching canceled`))
    .on("error", (message, err) => message.channel.send(
        "An error encountered: " + err
    ));