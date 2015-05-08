var API_URL = 'http://api.wunderground.com/api/f79a04da54ef10e8/geolookup/conditions/forecast10day/q/';
var zipBtn = document.querySelector('button.zipLocation');
var locBtn = document.querySelector('button.geoLocation');
var span = document.querySelector('span.temp');
var tableD = document.querySelector('tr');
var loc = document.querySelector('span.loc');

window.onload = function (){
  var windowOnLoad = API_URL + 'autoip.json';
  getJSON(windowOnLoad, function(data) {
    
    //--Gets the current location--//
    loc.innerHTML = data.location.city + ', ' + data.location.state + '  ' + data.location.zip;
    
    //--Gets the current temp--//
    span.innerHTML = 'is currently ' + data.current_observation.temp_f + 'º and ' + data.current_observation.weather;

    //--Gets the 5 day info --//
    for (i = 0; i < 5; i++) {
      var info = '';
      var day = data.forecast.simpleforecast.forecastday[i].date.weekday;
      info += '<td><p>' + day + '</p>';
      var high = data.forecast.simpleforecast.forecastday[i].high.fahrenheit;
      info += '<h3>' + high + 'º</h3>';
      var pic = data.forecast.simpleforecast.forecastday[i].icon_url;
      info += '<img' + ' src="' + pic + '">';
      var low = data.forecast.simpleforecast.forecastday[i].low.fahrenheit;
      info += '<h3>' + low + 'º</h3></td>';
      tableD.insertAdjacentHTML('beforeend', info);
    };//--Closes the for statement
  });//--Closes JSON
};//--Closes window.onLoad

zipBtn.onclick = function() {
  tableD.innerHTML = '';
  var input = document.querySelector('input');
  var zip = input.value;
  var zipCode = API_URL + zip + ".json";
  getJSON(zipCode, function(data) {
      //--Gets the current location--//
    loc.innerHTML = data.location.city + ', ' + data.location.state + '  ' + data.location.zip;
    //--Gets the current temp--//
    span.innerHTML = 'is currently ' + data.current_observation.temp_f + 'º and ' + data.current_observation.weather;

    //--Gets the 5 day info --//
    for (i = 0; i < 5; i++) {
      var info = '';
      var day = data.forecast.simpleforecast.forecastday[i].date.weekday;
      info += '<td><p>' + day + '</p>';
      var high = data.forecast.simpleforecast.forecastday[i].high.fahrenheit;
      info += '<h3>' + high + 'º</h3>';
      var pic = data.forecast.simpleforecast.forecastday[i].icon_url;
      info += '<img' + ' src="' + pic + '">';
      var low = data.forecast.simpleforecast.forecastday[i].low.fahrenheit;
      info += '<h3>' + low + 'º</h3></td>';
      tableD.insertAdjacentHTML('beforeend', info);
    };//--Closes the for statement
  }); //--Closes the getJSON function
}; //--Closes the zipBtn click

locBtn.onclick = function() {
  tableD.innerHTML = '';
  navigator.geolocation.getCurrentPosition(function(location) {
    var lat = location.coords.latitude;
    var long = location.coords.longitude;
    var geoLoc = API_URL + lat + ',' + long + ".json";
    getJSON(geoLoc, function(data) {
      //--Gets the current location--//
      loc.innerHTML = data.location.city + ', ' + data.location.state + '  ' + data.location.zip;
      //--Gets the current temp--//
      span.innerHTML = 'is currently ' + data.current_observation.temp_f + 'º and ' + data.current_observation.weather;

      //--Gets the 5 day info --//
      for (i = 0; i < 5; i++) {
        var info = '';
        var day = data.forecast.simpleforecast.forecastday[i].date.weekday;
        info += '<td><p>' + day + '</p>';
        var high = data.forecast.simpleforecast.forecastday[i].high.fahrenheit;
        info += '<h3>' + high + 'º</h3>';
        var pic = data.forecast.simpleforecast.forecastday[i].icon_url;
        info += '<img' + ' src="' + pic + '">';
        var low = data.forecast.simpleforecast.forecastday[i].low.fahrenheit;
        info += '<h3>' + low + 'º</h3></td>';
        console.log(info);
        tableD.insertAdjacentHTML('beforeend', info);
      };//--Closes the for statement
    });
  });
};

//--Get JSON Function
function getJSON(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      cb(JSON.parse(this.response));
    };
  };
  xhr.send();
};
