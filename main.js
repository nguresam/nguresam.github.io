const api = {
    key: "e838908f15d6daf9073bc4eeb1bec755",
    base: "https://api.openweathermap.org/data/2.5/",
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if(evt.keyCode == 13) {
        getResults(searchbox.value);
        localStorage.setItem("city", searchbox.value);
    }
}

function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
       .then(weather => {
           return weather.json();
        }).then(displayResults);
}

function displayResults (weather) {
    /*console.log(weather);*/
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector('.current .temp');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}

window.onload = () =>{
    const city =  localStorage.getItem('city') ?? "London";
    if(!!city) getResults(city);
    
}

//Make sure sw are supported
if('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('./sw_cachedPages.js')
          .then(reg => console.log('Service Worker:Registered'))
          .catch(err => console.log(`Service Worker: Error: ${err}`))
    })
}