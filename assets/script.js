// var citySearches = [];

// init();

// function renderLocalStorage() {
//   localStorage.setItem("citySearchStorage", JSON.stringify(citySearches));
// }
// // Takes the value from the search field
// $("#search-city-btn").on("click", function (event) {
//   event.preventDefault();
//   var searchCity = $("#search-field").val();
// });

// var cityName = "Wichita";
// var apikey = "e29b1c89c8da9ec620dfeea74ecf210c";
// var queryUrlCurrentForecast =
//   "http://api.openweathermap.org/data/2.5/weather?q=" +
//   cityName +
//   "&appid=" +
//   apikey;

// $.ajax({
//   url: queryUrlCurrentForecast,
//   method: "GET",
// }).then(function (response) {
//   console.log(response);
//   //   console.log(response.main.temp);
// });

// function renderData() {}
// // F
// $("#search-city-btn").on("click", function (event) {
//   event.preventDefault();
//   var searchCity = $("#search-field").val();
//   console.log(searchCity);
//   if (searchCity === "") {
//     return;
//   }
//   citySearches.push(searchCity);

//   searchCity.value = "";
//   renderLocalStorage();
// });

// function init() {
//   var storedCitySearches = JSON.parse(
//     localStorage.getItem("citySearchStorage")
//   );
// }

function renderWeatherData(city) {
  var apikey = "e29b1c89c8da9ec620dfeea74ecf210c";
  //Current Forecast API Call
  var queryUrlCurrentForecast =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=" +
    apikey;

  $.ajax({
    url: queryUrlCurrentForecast,
    method: "GET",
  }).then(function (response) {
    var currentTemp = "<h3>Temperature: " + response.main.temp + " °F</h3>";
    var currentHumidity = "<h3>Humidty: " + response.main.temp + " %</h3>";
    var currentWindspeed =
      "<h3>Wind Speed: " + response.wind.speed + " MPH</h3>";
    // Get long and latitdue for UV index API Call below
    var long = response.coord.lon;
    var lat = response.coord.lat;

    $("#current-conditions").append(currentTemp);
    $("#current-conditions").append(currentHumidity);
    $("#current-conditions").append(currentWindspeed);
    // Uv Index API Call
    var queryUrlCurrentUvIndex =
      "http://api.openweathermap.org/data/2.5/uvi?lat=" +
      lat +
      "&lon=" +
      long +
      "&appid=" +
      apikey;

    $.ajax({
      url: queryUrlCurrentUvIndex,
      method: "GET",
    }).then(function (responseUv) {
      //Apend Current Weather Conditions
      var uvIndex = "<h3>UV Index: " + responseUv.value + "</h3>";
      $("#current-conditions").append(uvIndex);
    });
  });
}
function renderFiveDayForecast(city) {
  var apikey = "e29b1c89c8da9ec620dfeea74ecf210c";
  queryUrlFiveDayForecast =
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&units=imperial&appid=" +
    apikey;
  $.ajax({
    url: queryUrlFiveDayForecast,
    method: "GET",
  }).then(function (responseFiveDay) {
    console.log(responseFiveDay);
    console.log(responseFiveDay.list[3].main.temp);
    $("#day-one").append(responseFiveDay.list[3].main.temp);
    $("#day-one").append(
      '<img id="theImg" src="http://openweathermap.org/img/wn/10d@2x.png" />'
    );
    $("#day-two").append(responseFiveDay.list[11].main.temp);
    $("#day-three").append(responseFiveDay.list[19].main.temp);
    $("#day-four").append(responseFiveDay.list[27].main.temp);
    $("#day-five").append(responseFiveDay.list[35].main.temp);
  });
}
renderWeatherData("Wichita");
renderFiveDayForecast("Wichita");
