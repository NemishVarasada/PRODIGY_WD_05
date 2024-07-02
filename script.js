const apiKey = '386658be22f34d20c6b2e0573aeee7d4';
const searchForm = document.getElementById('search-form');
const currentWeather = document.getElementById('current-weather');

searchForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent default form submission behavior

  const city = document.getElementById('city').value.trim();

  if (city) {
    fetchWeatherData(city);
  } else {
    alert('Please enter a city name.');
  }
});

function fetchWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        const { name, main, weather, wind } = data;
        const temperature = Math.round(main.temp);
        const description = weather[0].description;
        const iconCode = weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
        const windSpeed = wind.speed;

        currentWeather.innerHTML = `
          <h2>${name}</h2>
          <p>${temperature}°C - ${description}</p>
          <img src="${iconUrl}" alt="${description} weather icon">
          <ul>
            <li>Feels Like: ${Math.round(main.feels_like)}°C</li>
            <li>Humidity: ${main.humidity}%</li>
            <li>Wind Speed: ${windSpeed} m/s</li>
          </ul>
        `;
      } else {
        alert(`Error: ${data.message}`);
      }
    })
    .catch(error => {
      alert(`Error fetching weather data: ${error}`);
    });
}
