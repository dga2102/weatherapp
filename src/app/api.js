// Weather code → description mapping
const weatherMap = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Fog",
  51: "Light drizzle",
  61: "Light rain",
  63: "Rain",
  71: "Snow",
  80: "Light Showers",
  95: "Thunderstorm"
};

// Fetch 7-day forecast + current weather
async function getForecast(lat = 51.5072, lon = -0.1276) {
  const url = `https://api.open-meteo.com/v1/forecast?
    latitude=${lat}&longitude=${lon}
    &timezone=auto
    &daily=weathercode,temperature_2m_max,temperature_2m_min,wind_speed_10m_max
    &current_weather=true`
    .replace(/\s+/g, "");

  const res = await fetch(url);
  // const data = await res.json();
  return res.json();

  fillToday(data);
  fillWeekly(data);
}

// Fill the "Today" section
// function fillToday(data) {
//   const date = new Date(data.daily.time[0]);

//   document.querySelector(".today-date").textContent =
//     date.toDateString();

//   document.querySelector(".today-temp").textContent =
//     `${data.current_weather.temperature}°C`;

//   document.querySelector(".today-condition").textContent =
//     weatherMap[data.current_weather.weathercode];

//   document.querySelector(".today-location").textContent =
//     "London"; // replace later with search result
// }

// // Fill the 7 forecast cards
// function fillWeekly(data) {
//   const cards = document.querySelectorAll(".weather-card");

//   for (let i = 0; i < cards.length; i++) {
//     const date = new Date(data.daily.time[i]);

//     cards[i].querySelector(".day").textContent =
//       date.toLocaleDateString("en-GB", { weekday: "long" });

//     cards[i].querySelector(".date").textContent =
//       date.toLocaleDateString();

//     cards[i].querySelector(".summary").textContent =
//       weatherMap[data.daily.weathercode[i]];

//     cards[i].querySelector(".temp").textContent =
//       `${data.daily.temperature_2m_max[i]}° / ${data.daily.temperature_2m_min[i]}°`;

//     cards[i].querySelector(".wind").textContent =
//       `${data.daily.wind_speed_10m_max[i]} km/h`;
//   }
// }

export { getForecast, weatherMap }
// Call API on page load
getForecast();
