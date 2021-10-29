var fetchWeather = "/weather";

const weatherForm = document.querySelector('form');

//si escribimos enter en lugar de picar buscar el api se va a cargar
const search = document.querySelector('input');

const weatherIcon = document.querySelector('.weatherIcon i');
const weatherCondition = document.querySelector('.weatherCondition');

const tempElement = document.querySelector('.temperature span');

const locationElement = document.querySelector('.place');

const dateElement = document.querySelector('.date');

//array para que el mes salga en letra
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

dateElement.textContent = new Date().getDate() + ", " + monthNames[new Date().getMonth()].substring(0, 3); //substring para que enseñe solos las primeras 3 letras

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(search.value)
    //mostrar loading el lugar desde el api
    locationElement.textContent = "Loading...";
    //necesiatos hacer la info de la barra vacia para que no se confunda en la sig llamada
    tempElement.textContent = "";
    const locationApi = fetchWeather + "?address=" + search.value;
    fetch(locationApi).then(response => {
        response.json().then(data => {
            if (data.error) {
                locationElement.textContent = data.error;
                tempElement.textContent = "";
                weatherCondition.textContent = "";
            } else {
                console.log()
                if (data.description === "rain" || data.description === "fog") {
                    weatherIcon.className = "wi wi-day-" + data.description
                } else {
                    weatherIcon.className = "wi wi-day-cloudy"
                }
                locationElement.textContent = data.cityName;
                tempElement.textContent = (data.temperature - 273.5).toFixed(2) + String.fromCharCode(176);
                weatherCondition.textContent = data.description.toUpperCase();
            }
        })
    });
})