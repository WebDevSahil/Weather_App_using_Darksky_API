const searchElement = document.querySelector('#city-search-element');
const searchBox = new google.maps.places.SearchBox(searchElement);
searchBox.addListener('places_changed', () => {
  const place = searchBox.getPlaces()[0];
  if (place == null) return
  const latitude = place.geometry.location.lat();
  const longitude = place.geometry.location.lng();
  fetch('/weather', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ latitude: latitude, longitude: longitude })
  }).then(res => res.json())
    .then(data => {
      console.log(data);
      setWeatherData(data, place.formatted_address);
    });
});

const icon = new Skycons({ color: '#222' });
const locationElement = document.getElementById('location');
const status = document.getElementById('status');
const temp = document.getElementById('temp');
const precip = document.getElementById('precip');
const wind = document.getElementById('wind');
icon.set('icon', 'clear-day');
icon.play();

function setWeatherData(data, place) {
  locationElement.textContent = place;
  status.textContent = data.summary;
  temp.textContent = data.temperature;
  precip.textContent = `${data.precipProbability * 100}%`;
  wind.textContent = data.windSpeed;
  icon.set('icon', data.icon);
  icon.play();
}