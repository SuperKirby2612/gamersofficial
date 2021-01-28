// Number 1 //
if (args.length) {
    console.log(`${args}`)
    let args = 'play'.replace('play', '')
    var args = 
    google.youtube('v3').search.list({
        key: process.env.YOUTUBE_TOKEN,
        part: 'snippet',
        q: args
    }).then((response) => {
        const {
            data
        } = response
        data.items.forEach((item) => {
            message.channel.send(`Title: ${item.snippet.title}\nDescription${item.snippet.description}\n`)
        })
    }).catch((err) => message.channel.send('Error occured, error specified:' + err))
} else {
    message.channel.send('Please specify a video! Syntax: -g play [Video name]')
}
// Number 2 //
let CurrentDate = new Date()
let cDay = CurrentDate.getDate()
let cMonth = CurrentDate.getMonth() + 1
let cYear = CurrentDate.getFullYear()
let cMinute = CurrentDate.getMinutes()
let cHour = CurrentDate.getHours()
// Number 3 //
const _Embed = new Discord.MessageEmbed()
.setColor('#33FF57')
.setTitle('Gamer - Music')
.setAuthor('Gamer', 'https://i.ibb.co/ryM4Qx2/Gamers-Official-pfp.png')
.setThumbnail('https://www.clker.com/cliparts/y/d/Q/p/e/s/purple-musical-note-hi.png')
.addFields({
    name: 'Please enter a query',
    value: 'Please enter a search query and remember to be specific!'
})

message.channel.send(_Embed);
let _filter = m => m.author.id === message.author.id
let _query = await message.channel.awaitMessages(_filter, {
max: 1
})
let results = await search(_query, opts).catch(err => console.log((err))

)
console.log(results)
// Number 4 //
const randomXp = Math.floor(Math.random() * 9) + 1
        const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXp);
        if (hasLeveledUp) {
            const user = await Levels.fetch(message.author.id, message.guild.id)
            const userid = message.author.id
            var LevelUpEmbed = new Discord.MessageEmbed()
                .setTitle('Level up!')
                .setColor('GREEN')
                .addFields({
                    name: "Well done!",
                    value: `You just advanced to level \`${user.level}\`, <@${userid}>!`
                })
                .setThumbnail('http://images.hellogiggles.com/uploads/2015/01/05/spongebob.jpg')
                .setFooter('XP: You get XP by messaging on this discord server, spamming will not give you XP!')
            message.channel.send(LevelUpEmbed)
        }
        // Number 5 //
        if (member.hasPermission('KICK_MEMBERS')) {
            let muterole = 'Muted';
            let role = message.guild.roles.find(x => x.name == roleName);
            if (!role) {
                guild.roles.create({
                    data: {
                        name: 'Muted',
                        color: 'GRAY',
                    },
                    reason: 'Role was needed for mute',
                })

                let user = message.mentions.members.first();
                //Return if no user is defined
                if (!user) return message.reply(`You didn't mention a user!`).then(msg => {
                    msg.delete({
                        timeout: 3000
                    })
                });
                //Return if <time in seconds> is NOT a number
                if (Number.isInteger(args[1] * 1) === false) return message.reply(`"${args[1]}" is not an number.`).then(msg => {
                    msg.delete({
                        timeout: 3000
                    })
                });
                //Return if no reason is entered
                if (args[2] === '') return message.reply('You must enter a reason to mute someone.').then(msg => {
                    msg.delete({
                        timeout: 3000
                    })
                })
                //Store user roles, Return if user has an immune role
                let roles = message.guild.members.cache.get(user.id)._roles
                let userroles = []
                //Define time in seconds
                let mutetime = args[1]
                mutetime = (mutetime * 60) * 1000
                //Define reason
                let reason = args
                reason.shift()
                reason.shift()
                reason = reason.join(' ')
                if (user.hasPermission('MODERATOR')) {
                    return message.reply("Sorry, You can't mute a moderator!")
                }
                try {} catch {
                    try {
                        user.send(`You have been muted for "${(mutetime / 1000) / 60}" minutes for "${reason}" by ${message.author.username}`)
                    } catch (err) {
                        return console.log(err)
                    }
                }
                //Mute user
                for (role of roles) {
                    if (!role.includes(muterole)) {
                        userroles.push(role)
                        user.roles.remove(role)
                    }
                }
                user.roles.add(muterole)

                function unmute(args) {
                    user.roles.add(args)
                    user.roles.remove(muterole)
                    console.log('User Unmuted')
                }
                setTimeout(unmute, mutetime, userroles);
            }
        } else {
            return message.reply("Sorry, you don't have the correct permissions for that command!")
        }
        // Number 6 //
        
    // name: 'lock',
    // description: "Makes the role specified (If not specified then it just picks everyone) not able to type in the specified channel (If not specified then it just picks the current channel)(MODS ONLY) Syntax: -g lock",
    // category: 'Moderation',
    //async execute(message, args) {

   //     let lockchannel = message.mentions.channel || message.channel.id

   //     let lockrole = message.mentions.roles.first() || message.guild.roles.everyone.id
        
   //     const lockembed = new Discord.MessageEmbed()
    //    .setColor('#ff0000')
    //    .setTitle('🔒 CHANNEL LOCKED 🔒')
   //     .setDescription(`Successfully locked the channel \`${lockchannel}\` to \`${lockrole}\`. To unlock the channel, just say -g unlock and if you mentioned a channel or role remember to re-mention them in the unlock command!`)
        
  //      lockchannel.updateOverwrite(lockrole, { SEND_MESSAGES: false }, `Overwrite permissions`)
        
  //      message.channel.send(lockembed)
  //  }
  // Number 7 //