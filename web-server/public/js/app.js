console.log('Client side js file is loaded.');

let address = "Bursa";




const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const p_location = document.getElementById('location');
const p_weatherDescription = document.getElementById('weather-description');
const p_temperature = document.getElementById('temperature');
const p_feelslike = document.getElementById('feelslike');
const p_humidity = document.getElementById('humidity')

weatherForm.onsubmit = (event) => {
    event.preventDefault();

    p_location.textContent = "Loading...";
    p_weatherDescription.textContent = "";
    p_temperature.textContent = "";
    p_feelslike.textContent = "";
    p_humidity.textContent = "";

    const location = search.value;

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {

            if (data.error) {
                p_location.textContent = data.error;
                console.log(data.error);
            }
            else {
                p_location.textContent = "Location: " + data.location;
                p_weatherDescription.textContent = "Weather Description: " + data.weather_description;
                p_temperature.textContent = "Temperature: " + data.temperature;
                p_feelslike.textContent = "Feelslike Temperature: " + data.feelslike;
                p_humidity.textContent = "Humidity (%): " + data.humidity;
            }
        })
    })
}





