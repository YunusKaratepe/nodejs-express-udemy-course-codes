const request = require('request');

const weatherstackToken = "08abfccb1aae4d3faad7915dc51d5d84"
const weatherstackURL = "http://api.weatherstack.com/current"


const weatherstack = (long, lat, callback) => {

    const url = weatherstackURL + "?access_key=" + weatherstackToken 
    + "&query=" + long + "," + lat


    request({ url: url, json: true }, (err, res) => {
        if (err) {
            callback('Unable to connect to service.', undefined)
        } 
        else if (res.body.error) {
            callback(res.body.error, undefined)
        }
        else {
            callback(undefined, res.body.current)
        }
    })
}

module.exports = weatherstack