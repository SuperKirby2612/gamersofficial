const { isNumber } = require("underscore");

async function randomdigit(digits = Number) {
    if (!isNumber(digits)) throw new TypeError(`${digits} is not a number!`)
    var array = []
    for (i = 0; i < digits; i++) {
        var number = array.push(Math.floor(Math.random() * 8) + 1)
    }
    return array.join("")
}

module.exports = randomdigit