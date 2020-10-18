var citySearches = [];

function init() {
  var citySearchStorage = JSON.parse(localStorage.getItem("citySearchStorage"));
  if (citySearchStorage !== null) {
    citySearches = citySearchStorage;
  }
}

function storeCities() {
  // Stringify and set push citySearches Array to local Storage
  localStorage.setItem("citySearchStorage", JSON.stringify(citySearches));
}

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
// function to clear the forecast before updating with new
function clearForecasts() {
  $("#current-conditions").empty();
  $("#0").empty();
  $("#1").empty();
  $("#2").empty();
  $("#3").empty();
  $("#4").empty();
}

$("#search-city-btn").on("click", function (event) {
  event.preventDefault();
  var searchCity = $("#search-field").val().trim();
  clearForecasts();
  renderWeatherData(searchCity);
  belfast(searchCity);
  citySearches.push(searchCity);

  storeCities();
  renderRecentSearches();
});

$("#search-history").on("click", "tr", function (event) {
  clearForecasts();
  renderWeatherData($(this).text());
});

function belfast(city) {
  if (city === "belfast") {
    $("#jumbo").empty();
    $("#jumbo").append("<h1>Miss You Simon!!!</h1>");
  }
}

function renderRecentSearches() {
  $("#search-history").empty();
  for (let i = 0; i < citySearches.length; i++) {
    var searchHistory = '<tr><th scope="row">' + citySearches[i] + "</th></tr>";

    $("#search-history").append(searchHistory);
  }
}

init();
console.log(citySearches.length);
renderRecentSearches();
renderWeatherData("Wichita");
