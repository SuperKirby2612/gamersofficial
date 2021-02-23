const { client } = require('../main')
const { GiveawayClient } = require('reconlx')

const giveaway = new GiveawayClient(client, {
    mongoURI: `${process.env.MONGO_URI}`,
    emoji: null,
    defaultColor: '0089D3'
})

module.exports = giveaway