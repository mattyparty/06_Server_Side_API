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
var apikey = "e29b1c89c8da9ec620dfeea74ecf210c";
function renderWeatherData(city) {
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
    var currentDate = moment(response.dt * 1000).format("DD MMM YYYY");
    var currentCity = "<h2>" + city + " (" + currentDate + ")</h2>";

    var currentTemp = "<h4>Temperature: " + response.main.temp + " °F</h4>";
    var currentHumidity = "<h4>Humidty: " + response.main.temp + " %</h4>";
    var currentWindspeed =
      "<h4>Wind Speed: " + response.wind.speed + " MPH</h4>";
    // Get long and latitdue for UV index API Call below
    var long = response.coord.lon;
    var lat = response.coord.lat;

    $("#current-conditions").append(currentCity);
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
      //Apend Current UV Index
      var uvIndex = "<h4>UV Index: " + responseUv.value + "</h4>";
      $("#current-conditions").append(uvIndex);
    });
    //Five Day Forecast Data Conditions
    queryUrlFiveDayForecast =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      long +
      "&exclude=hourly&units=imperial&appid=" +
      apikey;

    $.ajax({
      url: queryUrlFiveDayForecast,
      method: "GET",
    }).then(function (responseFiveDay) {
      //appending the five day forecast elements
      for (var i = 0; i < 5; i++) {
        //var i = 0;
        // setting variable for forcast container id
        var forecastConainter = $("#" + i);
        // setting variables for various forecast elements
        var forecastDate =
          "<h6>" +
          moment(responseFiveDay.daily[i].dt * 1000).format("DD MMM YYYY") +
          "</h6>";
        var forecastImageUrl =
          "http://openweathermap.org/img/wn/" +
          responseFiveDay.daily[i].weather[0].icon +
          "@2x.png";

        var forecastTemp =
          "<h6>Temp: " + responseFiveDay.daily[i].temp.day + " °F</h6>";
        var forecastHumid =
          "<h6>Humidity: " + responseFiveDay.daily[i].humidity + " %</h6>";
        // appending forecast elements to DOM

        forecastConainter.append(forecastDate);
        $("<img />", { src: forecastImageUrl }).appendTo(forecastConainter);
        forecastConainter.append(forecastTemp);
        forecastConainter.append(forecastHumid);
        ///////////////
      }
    });
  });
}

renderWeatherData("Wichita");
