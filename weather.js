const apiKey = "7febe60cf456be45fd3d754f43f30a00"; // Your API key

function getWeather() {
  const city = document.getElementById("city-input").value.trim();
  const result = document.getElementById("weather-result");

  if (!city) {
    result.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.cod !== "200") {
        result.innerHTML = `<p>City not found!</p>`;
        return;
      }

      const { list } = data; // list contains 5-day data
      let forecastHTML = `<h3>5-Day Forecast for ${city}</h3>`;

      list.forEach((forecast, index) => {
        if (index % 8 === 0) { // Show forecast every 8 hours (1 per day)
          const date = new Date(forecast.dt * 1000);
          const iconUrl = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;

          const weatherType = forecast.weather[0].main.toLowerCase();
          const forecastClass = getWeatherClass(weatherType);

          forecastHTML += `
            <div class="forecast ${forecastClass}">
              <h4>${date.toDateString()}</h4>
              <img src="${iconUrl}" alt="${forecast.weather[0].description}">
              <p><strong>${forecast.main.temp}°C</strong> - ${forecast.weather[0].description}</p>
              <p>Humidity: ${forecast.main.humidity}%</p>
              <p>Wind Speed: ${forecast.wind.speed} m/s</p>
            </div>
          `;
        }
      });

      result.innerHTML = forecastHTML;
      document.getElementById("add-to-screen-btn").style.display = "block"; // Show "Add to Screen" button
    })
    .catch((err) => {
      console.error("Error fetching weather:", err);
      result.innerHTML = `<p>Something went wrong!</p>`;
    });
}

function getWeatherClass(weatherType) {
  switch (weatherType) {
    case 'clear':
      return 'sunny';
    case 'rain':
      return 'rainy';
    case 'clouds':
      return 'cloudy';
    case 'wind':
      return 'windy';
    default:
      return '';
  }
}

function addToScreen() {
  const result = document.getElementById("weather-result");
  const weatherInfo = result.innerHTML;

  // You can update the screen with this info in any way you prefer.
  // For now, we'll append the current weather info to a separate screen container.
  const screen = document.createElement("div");
  screen.classList.add("screen-weather");
  screen.innerHTML = weatherInfo;
  document.body.appendChild(screen);

  // Optionally, you can hide the "Add to Screen" button after adding
  document.getElementById("add-to-screen-btn").style.display = "none";
}
