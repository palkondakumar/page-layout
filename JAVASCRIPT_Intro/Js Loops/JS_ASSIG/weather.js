// TODO: 1. Select form, weather info, and table elements from the DOM
// TODO: 2. Handle form submission to fetch weather for a city
// TODO: 3. Validate input field (city name)
// TODO: 4. Display weather info dynamically
// TODO: 5. Add weather records to the table dynamically
// TODO: 6. Implement Edit button functionality to update a record
// TODO: 7. Implement Delete button functionality to remove a record
// TODO: 8. Optionally, store weather records in localStorage for persistence
// TODO: 9. Optionally, load weather records from localStorage on page load


const form = document.querySelector("form");
const cityInput = document.getElementById("city-input");
const weatherInfo = document.querySelector(".weather-info");
const tbody = document.querySelector("tbody");

let weatherData = JSON.parse(localStorage.getItem("weatherData")) || [];
let editIndex = -1;


displayTable();


form.addEventListener("submit", function (e) {
  e.preventDefault();

  const city = cityInput.value.trim();
  if (city === "") {
    alert("Please enter city name");
    return;
  }

  
  const weather = getWeather(city);

  weatherInfo.innerHTML = `<p><strong>${city}</strong>: ${weather}</p>`;

  if (editIndex === -1) {
    weatherData.push({ city, weather });
  } else {
    weatherData[editIndex] = { city, weather };
    editIndex = -1;
  }

  localStorage.setItem("weatherData", JSON.stringify(weatherData));

  displayTable();
  form.reset();
});


function getWeather(city) {
  const conditions = ["Sunny", "Cloudy", "Rainy", "Windy"];
  return conditions[Math.floor(Math.random() * conditions.length)];
}


function displayTable() {
  tbody.innerHTML = "";

  weatherData.forEach((item, index) => {
    const row = `
      <tr>
        <td>${item.city}</td>
        <td>${item.weather}</td>
        <td><button onclick="editData(${index})">Edit</button></td>
        <td><button onclick="deleteData(${index})">Delete</button></td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}


function editData(index) {
  cityInput.value = weatherData[index].city;
  editIndex = index;
}


function deleteData(index) {
  weatherData.splice(index, 1);
  localStorage.setItem("weatherData", JSON.stringify(weatherData));
  displayTable();
}