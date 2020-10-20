# 06_Server_Side_API

I give you my Weather Dashboard. Overall this one wasnt too tough. I was able to use things I learned from all the previous weeks.

- I used a bootstrap grid lay out to make formatting easier.

- OpenWeather API was used In order to render the forecast. I found the UV index a little tricky. Looking at the open weather API the UV index utilizes Latitude and Longitude. This forced me to nest two API/Ajax calls inside one function. I orginally wanted to do this is separate functions but because scope I wasnt able to set the Lat and Long variable in one function and grab it in another. Although as I sit here typing this I wonder if i could had declared the variables outside of the function and set their value inside the function. I will give it a try.

- I utilized local storage to keep recent searches. So this doesnt get too long I limit the recent searches to 5.

- I used Dom manipulation to create the various forecast elements. This got a little tricky with the Five day. I used a loop of 5 to create the forecast elements. I did this easily by ID'ing the forecast cards 1 through 5

- [Link to Deployed Project Contact](http://pewewardy.com/06_server_side_api/)
- [Link to Git Hub Repository](https://github.com/mattyparty/06_Server_Side_API/)

# Screen Shot of Deployed index page

![Weather Dashboard](/https://raw.githubusercontent.com/mattyparty/06_Server_Side_API/main/assets/WeatherDashboardScreenShot.png"Deployed Index Screen Shot")
