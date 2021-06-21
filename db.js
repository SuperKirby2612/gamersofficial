const { reconDB } = require('reconlx')
const { client } = require('./main')

const db = new reconDB(client, {
    uri: process.env.MONGO_URI
  })
  
  module.exports = db;