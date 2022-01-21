const request = require('request');


const mapboxBaseURL = "https://api.mapbox.com"
const mapboxToken = "pk.eyJ1IjoiaGVpbHl4IiwiYSI6ImNreTVtMzZwYTBtd3MzMXBxd3FoNHEwaWIifQ.wIjqWifUhzMq-aobbydAcw"


const geocode = (address, callback) => {
    const requestURL = mapboxBaseURL + "/geocoding/v5/mapbox.places/" + 
        address + ".json?access_token=" + mapboxToken + "&limit=1"

    request({ url: requestURL, json: true }, (err, res) => {
        if (err) 
            callback('Unable to connect to location services.', undefined)
        else if (!res.body.features)
            callback('Unable to find location. Try another search.', undefined)
        else if (res.body.features.length === 0)
            callback('Unable to find location. Try another search.', undefined)
        else {
            callback(undefined, {
                longitude: res.body.features[0].center[0],
                latitude: res.body.features[0].center[1],
                location: res.body.features[0].place_name
            })
        }
        
    })

}


module.exports = geocode
