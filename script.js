const apiKey = "dfc1c10ad238c9c7c322e48ecb66d6ae";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");
const weatherIcon = document.querySelector(".weather-icon");


async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".invalid").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else {
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "./assets/clouds.png";
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "./assets/clear.png";
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "./assets/rain.png";
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "./assets/drizzle.png";
        }
        else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "./assets/mist.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".invalid").style.display = "none";
    }


}

// For Pressing Enter button
searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

// For Pressing Search icon
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});