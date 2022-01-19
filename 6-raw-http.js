const http = require('http')


const url = "http://api.weatherstack.com/current?access_key=08abfccb1aae4d3faad7915dc51d5d84&query=40.217528,28.984505"


const req = http.request(url, (res) => {

    let data;

    res.on('data', (chunk) => {
        data = JSON.parse(chunk.toString())
    })

    res.on('end', () => {
        console.log(data);
    })
})


req.on('error', (error) => {
    console.log('An error has occured. ')
    console.log(error);
})

req.end()