function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("no geo");
    }
}
function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    getWeatherData(latitude, longitude);
}


var xmlHttp = null;

function getWeatherData(foo, bar)
{

    console.log(foo);
    var Url = "https://api.forecast.io/forecast/32de9cd72bb1dc7bd2028db2e5a53d53/" + foo + "," + bar;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = ProcessRequest;
    xmlHttp.open( "GET", Url, true );
    xmlHttp.send( null );

    ProcessRequest();

}

function ProcessRequest()
{
    if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 )
    {
        if ( xmlHttp.responseText == "Not found" )
        {
            console.log("error");
        }
        else
        {
            var info = eval ( "(" + xmlHttp.responseText + ")" );
            console.log(info.minutely);
            var rain = info.minutely.icon;
            var answerTitle = document.getElementById("answer-title");
            var answerBody = document.getElementById("answer-body");
            var loadingCopy = document.getElementById("loading-copy");

            loadingCopy.style.display = "none";

            if (rain == "rain") {
              answerTitle.innerHTML = "Yup"
              answerBody.innerHTML = info.minutely.summary;
            }
            else {
              answerTitle.innerHTML = "Nope"
            }
        }
    }
}


document.addEventListener("DOMContentLoaded", function(event) {
  getLocation();
});
