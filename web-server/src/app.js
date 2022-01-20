const express = require('express')
const path = require('path');

const public_path = path.join(__dirname, '../public')

const app = express()

app.set('view engine', 'hbs')
app.use(express.static(public_path))

app.get('/', (req,res) => {
    res.render('index', {
        title: "Home Page",
        name: "Yunus Karatepe"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Page"
    })
})

app.get('/weather', (req, res) => {
    res.send({
        location: "Bursa, Turkey",
        forecast: "Snowy"
    })
})

// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
})



