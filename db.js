const { reconDB } = require('reconlx')

const db = new reconDB({
    uri : process.env.MONGO_URI
  })
  
  module.exports = db;