const weather = document.querySelector(".js-weather");
const COORDS = 'coords';
const API_KEYS = "0c3a164ef24b540504674b49ab527c4f"

function getWeather(latitude, longitude) {
    fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEYS}&units=metric`
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `${temperature} @ ${place}`;
        });
}
function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}
function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    }
    saveCoords(coordsObj)
    getWeather(latitude,longitude)
}
function handleGeoError() {
    console.log("ERROR");
}
function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}
function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}


function init() {
    loadCoords();
}

init();