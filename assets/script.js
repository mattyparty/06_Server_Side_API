var apikey = "e29b1c89c8da9ec620dfeea74ecf210c";
var queryURL =
  "http://api.openweathermap.org/data/2.5/weather?q=wichita,ks,usa&APPID=e29b1c89c8da9ec620dfeea74ecf210c";

$.ajax({
  url: queryURL,
  method: "GET",
}).then(function (response) {
  //   console.log(response);
  //   console.log(response.main.temp);
  currentTempFah = (response.main.temp - 273.15) * (9 / 5) + 32;
  console.log(currentTempFah);
  Math.round(parseInt(currentTempFah));
  console.log(currentTempFah);
});
