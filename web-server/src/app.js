const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const weatherstack = require('./utils/weatherstack')

function weatherApp (address, callback) {
    geocode(address, (geocode_error, { latitude, longitude, location }={}) => {
        if (geocode_error) callback ({ error: geocode_error })
        else {
            // weather stack gets latitude-longitude
            weatherstack(latitude, longitude, 
                (weatherstack_error, { weather_descriptions, temperature, feelslike, humidity }={}) => {
                if (weatherstack_error)
                    callback ({ error: weatherstack_error });
                else {
                    callback({
                        location: location,
                        weather_description: weather_descriptions[0],
                        temperature: temperature,
                        feelslike: feelslike,
                        humidity: humidity
                    })
                }
            })
        }
    })
}


// define paths for Express config
const public_path = path.join(__dirname, '../public')
const views_path = path.join(__dirname, '../templates/views')
const partials_path = path.join(__dirname, '../templates/partials')

// express app
const app = express()

// express configuration
app.set('view engine', 'hbs')
app.set('views', views_path)
hbs.registerPartials(partials_path)

// setup static directory
app.use(express.static(public_path))

app.get('/', (req,res) => {
    res.render('index', {
        title: "Home",
        name: "Yunus Karatepe"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Yunus Karatepe",
        image_info: "Sylvanas Windrunner"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: "Yunus Karatepe",
        joke: "Help Me!"
    })
})

app.get('/weather', (req, res) => {
    
    if (!req.query.address) {
        return res.send({
            error: "You must provide a address term."
        })
    }

    weatherApp(req.query.address, (data) => {
        return res.send(data)
    })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term."
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404 Help article not found",
        name: "Yunus Karatepe"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404 Page not found",
        name: "Yunus Karatepe"
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
})



