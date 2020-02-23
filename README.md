# weather_forcast
Homework # 6 a weather forecast

Just key in the city name & the weather for that day & that city will pop up. In the bottom in the blue area is the 5 day forecast for that city. Any city entered will also have a new button created. This screen will also "remember" what you put in for the next time you use the app.

Release 2: 02/23/20

Added a clear list button. This will clear all the city name buttons. 

Added API call validation. If a 404 (no city found) or a 400 (no city entered) comes back from the first call it will tell the user the problem is likely a spelling error & they should reenter the input. Any other error will be viewed as a "system error" & the use will be told the app is currently not working.  

Added logic so each city entered will only have one button. If they reenter the same city twice it WILL NOT show up in the buttons twice.

Added logic to not allow bad entries of the city name to be added as buttons.  

This app can be found on https://jimdenis.github.io/weather_forecast/.