var searchButton = document.getElementById("searchButton");
var searchInput = document.getElementById("searchInput");
var myKey = "7942df8d530afcd79d7082dc1c43784e";
var title = document.querySelector(".name");
var icon = document.querySelector(".icon");
var date = document.querySelector(".date");
var temp = document.querySelector(".temp");
var humidity = document.querySelector(".humidity");
var windSpeed = document.querySelector(".windSpeed");
var myWeather = document.getElementById("myWeather");
var nameSpan = document.querySelector(".nameSpan");
var uviSpan = document.querySelector(".uviSpan");
var dateSpan = document.querySelector(".dateSpan");
var iconSpan = document.querySelector(".iconSpan");
var tempSpan = document.querySelector(".tempSpan");
var humiditySpan = document.querySelector(".humiditySpan");
var windSpeedSpan = document.querySelector(".windSpeedSpan");
var day1 = document.querySelector(".day1");

searchButton.addEventListener("click", () => {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      searchInput.value +
      "&appid=7942df8d530afcd79d7082dc1c43784e&units=imperial"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      var nameValue = data.name;
      var iconValue = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
      var dateValue = new Date(data.dt * 1000);
      var tempValue = data.main.temp;
      var humidityValue = data.main.humidity + "%";
      var windSpeedValue = data.wind.speed + "mph";

      nameSpan.innerHTML = nameValue;
      dateSpan.innerHTML = dateValue;
      tempSpan.innerHTML = tempValue;
      humiditySpan.innerHTML = humidityValue;
      windSpeedSpan.innerHTML = windSpeedValue;
      iconSpan.innerHTML = iconValue;

      var saveCoordlat = data.coord.lat;
      var saveCoordlon = data.coord.lon;

      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${saveCoordlat}&lon=${saveCoordlon}&exclude=hourly,daily&appid=7942df8d530afcd79d7082dc1c43784e`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          var uviValue = data.current.uvi;

          uviSpan.innerHTML = uviValue;

          if (uviValue <= 2) {
            $(".uviSpan").removeClass("textOrange");
            $(".uviSpan").removeClass("textRed");
            $(".uviSpan").addClass("textGreen");
          } else if (uviValue > 2 && uviValue <= 5) {            
            $(".uviSpan").removeClass("textGreen");
            $(".uviSpan").removeClass("textRed");
            $(".uviSpan").addClass("textOrange");
          } else {            
            $(".uviSpan").removeClass("textOrange");
            $(".uviSpan").removeClass("textGreen");
            $(".uviSpan").addClass("textRed");            
          }

          fetch(
            "https://api.openweathermap.org/data/2.5/forecast?q=chicago&appid=7942df8d530afcd79d7082dc1c43784e"
          )
            .then((response) => response.json())
            .then((data) => {
              console.log(data);

              
              var day1Value = data.list.[0];

              day1.innerHTML = day1Value
            });
        });
    });
});
