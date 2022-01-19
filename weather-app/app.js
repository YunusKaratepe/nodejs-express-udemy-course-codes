const geocode = require('./utils/geocode');
const weatherstack = require('./utils/weatherstack');
const yargs = require('yargs');
const { string } = require('yargs');

yargs.version('1.1.0')

function app (address) {
    geocode(address, (err, { latitude, longitude, location }={}) => {
        if (err) console.log('Error', err)
        else {
            // weather stack gets latitude-longitude
            weatherstack(latitude, longitude, 
                (err, { weather_descriptions, temperature, feelslike }) => {
                if (err)
                    console.log('Error', err);
                else {
                    console.log(location);
                    console.log("The weather is " + weather_descriptions[0]);
                    console.log("Temperature is " + temperature + " (C)");
                    console.log("Feels like temperature is " + feelslike + " (C)");
                }
            })
        }
    })
}

yargs.command({
    command: "weather",
    describe: "Get weather information for given location.",
    builder: {
        location: {
            describe: "Address for weather information.",
            demandOption: true,
            type: "string"
        }
    },
    handler (argv) {
        app(argv.location)
    }
})



yargs.parse()








