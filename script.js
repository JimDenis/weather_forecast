
// Get hard coded weather so no call need to be made. For testing only !!!!!
function getWeatherDummy() {
  //console.log("In getWeatherDummy"); 
  
  
  $("#cityInfo").html("<h2>Detroit" + " (" + date + ") </h2>");
  $("#cityInfo").append("<p>Temperature: " + "40.08" + " @F"+ "</p>");  
  $("#cityInfo").append("<p>Humidity: " + "64" + " %" + "</p>");  
  $("#cityInfo").append("<p>Wind Speed: " + "6.93" + " MPH" + "</p>");
  $("#cityInfo").append("<p>UV Index: " + "2.1" + "</p>");
   
      
}

// Invalid input.... Assuming city name spelled wrong. Comes here for a 404 or 400 error.
function invalidInput(cod,msg) {
  //console.log("In invalidInput"); 
    
  $("#cityInfo").html("<h2>Sorry... App failed</h2>");
  $("#cityInfo").append("<p>Looks like bad input</p>");  
  $("#cityInfo").append("<p>Please check the spelling and Run again</p>");  
  //$("#cityInfo").append("Error code is " + cod + " Error message is " + msg);

  $("#flex1").empty();
  $("#flex2").empty(); 
  $("#flex3").empty();
  $("#flex4").empty();
  $("#flex5").empty();
        
}

// Bad calls that do not include 404 or 400 error. 
function systemError(cod,msg) {
  console.log("In systemError"); 
    
  $("#cityInfo").html("<h2>SYSTEM ERROR</h2>");
  $("#cityInfo").append("Error code is " + cod + " Error message is " + msg);
  $("#cityInfo").append("<p>Please that losed Jim to look at it</p>");  

  $("#flex1").empty();
  $("#flex2").empty(); 
  $("#flex3").empty();
  $("#flex4").empty();
  $("#flex5").empty();
        
}


// Get todays weather for a city
function getWeather() {
 //console.log("In getWeather");
  var WeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q="
  var queryURL = WeatherUrl + city + apiKey + units;

  var weatherIconUrl1 = "https://openweathermap.org/img/w/"
  var iconNum = "";
  var weatherIconUrl3 = ".png";
  
 
   
  $.ajax({
     url: queryURL,
     method: "GET"
   })
     // After data comes back from the request
     .then(function(response) {     
 //      console.log(response);
 //      console.log("!!!!!!!!!!!!!");
 //      console.log(response.responseJSON.cod); 
 //      console.log("!!!!!!!!!!!!!");
 //      console.log(response.name);
 //      console.log(response.main.temp);
 //      console.log(response.main.humidity);
 //      console.log(response.wind.speed);
 //      console.log(response.coord.lon);
 //      console.log(response.coord.lat);
       lon = response.coord.lon;
       lat = response.coord.lat;
       iconNum = response.weather[0].icon
 //      console.log("lat & lon");
 //      console.log("lon = " + lon);
 //      console.log("lat = " + lat);
 //      console.log("icon num = " + iconNum);
 //      console.log(queryURL2);
       

    //
    //   console.log(response.value);
    $("#cityInfo").html("<h2>" + response.name + " (" + date + ") " + "</h2>");
    
    var weatherIconUrl = weatherIconUrl1 + iconNum + weatherIconUrl3
    //console.log(weatherIconUrl)

    var weatherIcon = $("<img>");
    // Setting the weatherIcon's src attribute to imageUrl
    weatherIcon.attr("src", weatherIconUrl);
    weatherIcon.attr("alt", "weather pic");
       
    $("#cityInfo").append(weatherIcon);

    $("#cityInfo").append("<p>Temperature: " + response.main.temp + "&#"+ 8457 + "</p>");  
    $("#cityInfo").append("<p>Humidity: " + response.main.humidity + " %" + "</p>");  
    $("#cityInfo").append("<p>Wind Speed: " + response.wind.speed + " MPH" + "</p>");

    getUVI();
    //getForecast();
 
}).catch(function(err){
  console.log(err)
  console.log("!!!!!!!!!!!!!");
  console.log(err.responseJSON.cod);
  console.log(err.responseJSON.message);
  console.log("!!!!!!!!!!!!!");
  if (err.responseJSON.cod == 404 || err.responseJSON.cod == 400)  {
     invalidInput(err.responseJSON.cod, err.responseJSON.message);
  } else {
    systemError(err.responseJSON.cod, err.responseJSON.message);
  } 

})

      
}

// Get todays UVI for a city
function getUVI() {
  //console.log("In getUVI");
  var uviUrl = "https://api.openweathermap.org/data/2.5/uvi?"
  var latStng = "lat=";
  var lonStng = "&lon=";
    
  //console.log("nothing2");
  //console.log("lon = " + lon);
  //console.log("lat = " + lat);
  var queryURL = uviUrl + latStng + lat + lonStng + lon + apiKey + units;
  //console.log(queryURL);    

  $.ajax({
     url: queryURL,
     method: "GET"
  })
    // After data comes back from the request
    .then(function(response) {
     // console.log(response);
     // console.log(response.value);
      $("#cityInfo").append("<p>UV Index: " + response.value + "</p>");
      getForecast();
  }) 
      
}

//Get long range forecst
function getForecast() {

  var ForcastUrl = "https://api.openweathermap.org/data/2.5/forecast?q="
  var forcastCall = ForcastUrl + city + apiKey + units; 

  $("#flex1").empty();
  $("#flex2").empty(); 
  $("#flex3").empty();
  $("#flex4").empty();
  $("#flex5").empty();

  $.ajax({
    url: forcastCall,
    method: "GET"
  })
    // After data comes back from the request
    .then(function(response) {
  //  console.log(queryURL);
  //  console.log(response);
  
      var holdCurrent= "";
      var holdHighest = ""; 
      var dayOut = 0;
      for (i=0; i<40; i++) {
      //  console.log((response.list[i].dt_txt).slice(0,10));
  
        holdCurrent = response.list[i].dt_txt.slice(0,10);

  
        if (holdCurrent == todayDate) {
          continue;
        } else if (dayOut === 0) {
            //console.log(response.list[i].main.temp);
            //console.log(response.list[i].main.humidity);
            //var iconNum = response.list[i].weather[0].icon
            //console.log(iconNum)

            $("#flex1").append(holdCurrent); 

            //var weatherIconUrl = weatherIconUrl1 + iconNum + weatherIconUrl3
            //console.log(weatherIconUrl)

           // var weatherIcon = $("<img>");
           // Setting the catImage src attribute to imageUrl
           //weatherIcon.attr("src", weatherIconUrl);
           //weatherIcon.attr("alt", "weather pic");
       
            //$("#flex1").append(weatherIcon);
            $("#flex1").append("<p>Temperature: " + response.list[i].main.temp + "&#"+ 8457 + "</p>");  
            //$("#flex1").append(weatherIcon);
            $("#flex1").append("<p>Humidity: " + response.list[i].main.humidity + " %" + "</p>");
            var dayOut = dayOut + 1;  
            holdHighest = holdCurrent;
          //console.log(holdHighest); 
        } else if (holdCurrent != holdHighest && dayOut <5) { 
         //   console.log(response.list[i].main.temp)
         //   console.log(response.list[i].main.humidity)
            var dayOut = dayOut + 1;  
            var flexStg = "#flex" + dayOut;
            $(flexStg).append(holdCurrent); 
           // $(flexStg).append(weatherIcon);
            $(flexStg).append("<p>Temperature: " + response.list[i].main.temp +  "&#"+ 8457 + "</p>");  
            $(flexStg).append("<p>Humidity: " + response.list[i].main.humidity + " %" + "</p>");
            holdHighest = holdCurrent;
          //  console.log(holdHighest)
        }
        
      }
  
      doButtonAndStorage();
   })  
  
}


// Get incoming city & build a button for that city 
function getInput() {
//  console.log("In getInput");
  //var inCity = document.getElementById(cityInput).value;
  var incoming = document.forms["cityForm"]["cityName"].value;
   

  //console.log(incoming);
  city = incoming;
  //var incomingLen = city.length;

  //console.log("**** input  = " + incoming);
  //console.log("**** lenght = " + incomingLen);

  getWeather() 
}

  function doButtonAndStorage() {

    //console.log("In doButtonAndStorage");
      var exists = false;

      for (i=0; i <= (citiesEntered.length - 1); i++) {
       // console.log(city.toUpperCase()); 
       // console.log(citiesEntered[i].toUpperCase()); 
        if (city.toUpperCase() === citiesEntered[i].toUpperCase()) {
          var exists = true; 
        }  
      }  

      //console.log(exists);

      if (! exists) {
      //  continue;
      //} else {  
          var a = $("<button>");
          // Adding a class
          a.addClass("City");
          // Adding a data-attribute with a value of the movie at index i
          a.attr("data-name", city);
          // Providing the button's text with a value of the movie at index i
          a.text(city);
          // Adding the button to the HTML
          $("#buttons-view").append(a)

          var x = citiesEntered.push(city);

          //console.log(citiesEntered);
          citiesEnteredJS = JSON.stringify(citiesEntered)
          localStorage.setItem("Cites", citiesEnteredJS);
      }


}

//Goes to local storage & see if cities are out there. If there are build buttons.
function getLocalStorage() {

  var getCities = localStorage.getItem("Cites");

  if (getCities != null) {

    var getCitiesPAR = JSON.parse(getCities);
    //console.log(getCitiesPAR);
    //console.log(getCitiesPAR.length)

    for (i=0; i < getCitiesPAR.length; i++) {

      //console.log(getCitiesPAR[i]);
      var a = $("<button>");
      // Adding a class
      a.addClass("City");
      // Adding a data-attribute with a value of the movie at index i
      a.attr("data-name", getCitiesPAR[i]);
      // Providing the button's text with a value of the movie at index i
      a.text(getCitiesPAR[i]);
      // Adding the button to the HTML
      $("#buttons-view").append(a)

      var x = citiesEntered.push(getCitiesPAR[i]);
      city = getCitiesPAR[i];

    } //End for loop 

    getWeather()

   } //End if

  } //End fuction

  // Get hard coded weather so no call need to be made. For testing only !!!!!
function clearList() {

 //console.log("In clearList"); 

  var value = localStorage.length; 
  localStorage.clear("cities"); 

  $("#buttons-view").empty(0)
  citiesEntered.length = 0;

//  console.log(citiesEntered);
    
}

//PROGRAM STARTS HERE !!!!!!!!

//Global Vars
var d = new Date();
var yyyy = d.getFullYear();
var mm   = d.getMonth() + 1;
var dd   = d.getDate();
var hh   = d.getHours();
var min  = d.getMinutes();
var citiesEntered = [];

document.getElementById("btnCity").focus();

//console.log(yyyy, mm, dd, hh, min);

if (mm < 10) {
  mm = mm.toString();
  mm = "0" + mm;
}

if (dd < 10) {
  dd = dd.toString();
  dd = "0" + dd;
}

var dateTime = mm + "/" + dd + "/" + yyyy + " " + hh + ":" + min;
var date = mm + "/" + dd + "/" + yyyy;
var todayDate = yyyy + "-" + mm + "-" + dd;

//console.log(todayDate);

var apiKey = "&appid=073c4a93eb9c28d272af822a568d0d53";
var units = "&units=imperial";
var city = "";
var lat = "";
var long = ""; 

getLocalStorage();

//console.log(citiesEntered.length);


// Button listeners to start the process

$("#btnCity").on("click", function () {
  getInput();
});

$("#btnClear").on("click", function () {
  clearList();
});


// Button listeners for city buttons to start the process

$("#buttons-view").on("click", "button", function (e) {
  e.preventDefault();
  city = e.target.textContent;
  getWeather();
});

        
