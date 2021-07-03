const axios = require('axios') //you can use any http client
const tf = require('@tensorflow/tfjs')
const nsfw = require('nsfwjs')
var db = require('../db')

module.exports = {
    name: 'nsfweval',
    description: 'nsfweval',
    category: 'Moderation',
    slash: 'both',
    async execute(message, args) {
        if (await db.has(`nsfw-${message.guild.id}`) === false) return;
        if (message.author.bot) return;
        if (message.channel.type === 'nsfw') return;
        if (message.attachments.size === 0) return;
        if (message.attachments.size > 1) return remove(message);
        const attachmentarray = message.attachments.array()
        fn()
        async function remove(message) {
            message.delete()
            message.channel.send('Sorry I had to remove your message because it contained more than 1 image and anti-nsfw is turned on, try sending each image separately!')
        }
    }
}

async function fn() {
  const pic = await axios.get(`link-to-picture`, {
    responseType: 'arraybuffer',
  })
  const model = await nsfw.load('file://D:/luca/Downloads/fluffythedog.jpg', 1)
  const image = await tf.node.decodeImage(pic.data,3)
  const predictions = await model.classify(image)
  image.dispose()
  console.log(predictions)
}
