
const searchBtn = document.getElementById('searchBtn');
  searchBtn.addEventListener('click', () => {
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.trim();
  
    fetchWeatherData(city)
      .then(data => {
        updateWeatherUI(data);
        saveCityToLocalStorage(city);
      });
  });

// Fetching API
function fetchWeatherData(city) {
    const apiKey = '14585b8b2ecb4ec111940cc7096ec12b'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    return fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log('Parsed JSON Response:', data);
      return data;
    })
    .catch(error => console.error('Error fetching weather data:', error));
}

// Display Weather UI
  function updateWeatherUI(data) {
    const weatherInfoElement = document.getElementById('weatherInfo');
    const weatherDescription = data.weather[0].description;
    const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
    console.log('Weather Description:', weatherDescription);


    let weatherHTML = `
    <div class="weather-table">
      <table>
      <tr>
      <td>Place:</td>
      <td>${data.name}</td>
    </tr>
    <tr>
    <td>Latitude:</td>
    <td>${data.coord.lat}</td>
  </tr>
  <tr>
    <td>Longitude:</td>
    <td>${data.coord.lon}</td>
  </tr>
    
      <tr>
          <td>Temperature:</td>
          <td>${data.main.temp}°C</td>
        </tr>
        <tr>
          <td>Pressure:</td>
          <td>${data.main.pressure} hPa</td>
        </tr>
          <td>Weather:</td>
          <td>${weatherDescription}</td>
        </tr>
        <tr>
          <td>Humidity:</td>
          <td>${data.main.humidity}%</td>
        </tr>
        <tr>
          <td>Wind Speed:</td>
          <td>${data.wind.speed} m/s</td>
        </tr>
        <tr>
          <td>Sunrise:</td>
          <td>${sunriseTime}</td>
        </tr>
        <tr>
          <td>Sunset:</td>
          <td>${sunsetTime}</td>
        </tr>
      </table>
    </div>

  `;

  // Hide Searched Cities
  const savedCitiesList = document.getElementById('savedCitiesList');
  const searchedCities = document.getElementsByClassName('cities');
  savedCitiesList.classList.add('hide');
  
  for (let i = 0; i < searchedCities.length; i++) {
    searchedCities[i].classList.add('hide');
  }

    weatherInfoElement.innerHTML = weatherHTML;
  }
  

//  Clear Saved cities
  function clearSavedCities() {
    localStorage.removeItem('cities');
    loadSavedCities();
  }

  const clearBtn = document.getElementById('clearBtn');
clearBtn.addEventListener('click', () => {
  clearSavedCities();
  const searchedCities = document.getElementsByClassName('cities');
  for (let i = 0; i < searchedCities.length; i++) {
    searchedCities[i].innerHTML = ' Not Searched Yet ';
  }
});
  
  // Function to save city to local storage
  function saveCityToLocalStorage(city) {
  
    const savedCities = JSON.parse(localStorage.getItem('cities')) || [];
    if (!savedCities.includes(city)) {
      savedCities.push(city);
      localStorage.setItem('cities', JSON.stringify(savedCities));
    }
  }
  
function loadSavedCities() {
    const savedCities = JSON.parse(localStorage.getItem('cities')) || [];
    savedCitiesList.innerHTML = '<h4>SEARCHED CITIES</h4>:';
    savedCities.forEach(city => {
      const listItem = document.createElement('li');
      listItem.textContent = city;
      savedCitiesList.appendChild(listItem);

    });
    savedCitiesList.classList.remove('hide');
  }
  
  
  
  loadSavedCities();
  