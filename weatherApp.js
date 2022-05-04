'use strict';

const _apk = '4a41aa3a534033703ed0bbcf3636f22e';

$(function () {
    if (navigator.geolocation) {
        let currentposition = navigator.geolocation.getCurrentPosition(parsePosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

function parsePosition(position) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${_apk}`;
    getWeatherData(weatherUrl);
}

function getWeatherData(weatherUrl) {
    var xhrobj = new XMLHttpRequest();
    xhrobj.open('GET', weatherUrl);
    xhrobj.send();

    xhrobj.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(xhrobj.responseText);
            $("#w-cityname").text(response.name);
            $("#w-country").text(response.sys.country);
            $("#w-currentTime").text(moment().format("ddd, hA"));
            $("#w-currentTemperature").text(Math.round(response.main.temp));
            $("#w-feelslike").text(Math.round(response.main.feels_like));
            $("#w-humidity").text(Math.round(response.main.humidity));
            $("#w-wind").text(Math.round(response.wind.speed));
            $("#w-currentDesc").text(response.weather[0].description);
            $("#w-sunrise").text(moment(response.sys.sunrise).format('HH:MM'));
            $("#w-sunset").text(moment(response.sys.sunset).format('HH:MM'));
            //$("#w-icon").attr('src',`http://openweathermap.org/img/w/${response.weather[0].icon}.png`)            
        }
    }
}