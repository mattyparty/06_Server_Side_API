var cityName = "Wichita";
var apikey = "e29b1c89c8da9ec620dfeea74ecf210c";
var queryUrlCurrentForecast =
  "http://api.openweathermap.org/data/2.5/weather?q=" +
  cityName +
  "&appid=" +
  apikey;

$.ajax({
  url: queryUrlCurrentForecast,
  method: "GET",
}).then(function (response) {
  console.log(response);
  //   console.log(response.main.temp);
});
