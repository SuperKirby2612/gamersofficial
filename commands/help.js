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
.addField('Lock', 'Locks a specified channel to a specified role (and any role lower). Syntax: Lock <#channel> <@role>')
.addField('Unlock', 'Unlocks a specified locked channel to the linked locked role (and any role lower). Syntax: Unlock <#channel> <@role>')
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

module.exports = {
    name: 'help',
    description: 'Gives this command list',
    category: 'Misc',
    cooldown: '5s',
    async execute(message, args, client) {
      const msgcontent = args.join(' ')
      console.log(msgcontent.toLowerCase())
      if (!msgcontent) {
        const helpbasic = new Discord.MessageEmbed()
        .setTitle('Help')
        .setColor('GREEN')
        .setDescription('In which part of the bot do you need help with? Pick One\n🛠`Moderation`  😁`Fun`  ✨`Misc`  🤖`All`')
      } if (msgcontent.toLowerCase() === 'moderation') {
        message.channel.send(help1)
      } if (msgcontent.toLowerCase() === 'fun') {
        message.channel.send(help2)
      } if (msgcontent.toLowerCase() === 'misc') {
        message.channel.send(help3)
      } if (msgcontent.toLowerCase() === 'all') {
        const all = ReactionPages(message, [help1, help2, help3], false, ['⬅', '➡'], 180 * 1000)
        message.channel.send(all)
      }
    }
  }