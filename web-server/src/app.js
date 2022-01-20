const express = require('express');
const path = require('path');
const hbs = require('hbs');


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
    res.send({
        location: "Bursa, Turkey",
        forecast: "Snowy"
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



