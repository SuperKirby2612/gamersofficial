const Discord = require('discord.js')
const discordclient = require('./main')
/* Example usage of some features of the Perspective API */
const googleapis = require('googleapis');

require('dotenv').config();

// Some supported attributes
// attributes = ["TOXICITY", "SEVERE_TOXICITY", "IDENTITY_ATTACK", "INSULT",
// "PROFANITY", "THREAT", "SEXUALLY_EXPLICIT", "FLIRTATION", "SPAM",
// "ATTACK_ON_AUTHOR", "ATTACK_ON_COMMENTER", "INCOHERENT",
// "INFLAMMATORY", "OBSCENE", "SPAM", "UNSUBSTANTIAL"];

discordclient.on('message', (message) => {

const attributeThresholds = {
  'IDENTITY_ATTACK': 0.75,
  'SEVERE_TOXICITY': 0.75,
  'SPAM': 0.75,
  'SEXUALLY_EXPLICIT': 0.75
};

async function analyzeText(text) {
  const analyzer = new googleapis.Commentanalyzer.Commentanalyzer();

  // This is the format the API expects
  const requestedAttributes = {};
  for (const key in attributeThresholds) {
    requestedAttributes[key] = {};
  }

  const req = {
    comment: {text: text},
    languages: ['en'],
    requestedAttributes: requestedAttributes,
  };

  const res = await analyzer.comments.analyze({
    key: process.env.PERSPECTIVE_API_KEY,
    resource: req},
  );

  data = {};

  for (const key in res['data']['attributeScores']) {
    data[key] =
        res['data']['attributeScores'][key]['summaryScore']['value'] >
        attributeThresholds[key];
  }
  return console.log(data)
}

module.exports.analyzeText = analyzeText
})