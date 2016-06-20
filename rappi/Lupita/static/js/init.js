(function($){
  $(function(){

    $('.button-collapse').sideNav();

  }); // end of document ready
})(jQuery); // end of jQuery name space


function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById("hours").innerText= h + ":" + m + ":" + s;
  var t = setTimeout(startTime, 500);
};
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
};

$(document).ready(function(){
  function wait(ms){
     var start = new Date().getTime();
     var end = start;
     while(end < start + ms) {
       end = new Date().getTime();
    }
  }
  wait(000);
  $('#preloader').fadeOut('slow',function(){$(this).remove();});
  $('.parallax').parallax();
});

var date = new Date;


var seconds = date.getSeconds();
var minutes = date.getMinutes();
var hour = date.getHours();

var year = date.getFullYear();
var month = date.getMonth(); // beware: January = 0; February = 1, etc.
var day = date.getDate();

var dayOfWeek = date.getDay(); // Sunday = 0, Monday = 1, etc.
var milliSeconds = date.getMilliseconds();

var datedisplay = "<h2>" + day + realmonth + "</h2>";

var realmonth = "";

switch (new Date().getMonth()) {
    case 0:
        realmonth = "ENERO";
        break;
    case 1:
        realmonth = "FEBRERO";
        break;
    case 2:
        realmonth = "MARZO";
        break;
    case 3:
        realmonth = "ABRIL";
        break;
    case 4:
        realmonth = "MAYO";
        break;
    case 5:
        realmonth = "JUNIO";
        break;
    case 6:
        realmonth = "JULIO";
        break;
     case 7:
        realmonth = "AGOSTO";
        break;
    case 8:
        realmonth = "SEPTIEMBRE";
        break;
    case 9:
        realmonth = "OCTUBRE";
        break;
     case 10:
        realmonth = "NOVIEMBRE";
        break;
    case 11:
        realmonth = "DICIEMBRE";
        break;   
}

switch (new Date().getDay()) {
    case 0:
        realday = "Lunes";
        break;
    case 1:
        realday = "Martes";
        break;
    case 2:
        realday = "Miércoles";
        break;
    case 3:
        realday = "Jueves";
        break;
    case 4:
        realday = "Viernes";
        break;
    case 5:
        realday = "Sábado";
        break;
    case 6:
        realday = "Domingo";
        break; 
}

document.getElementById("month").innerHTML = realmonth;
document.getElementById("day").innerHTML = day;
document.getElementById("year").innerHTML = year;
document.getElementById("dayOfWeek").innerHTML= realday;

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById("hours").innerText=
    h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function panelactivator() {
    var contentcol = document.getElementById("contentcol");
    var panel = document.getElementById("panel");
    var panelactivator = document.getElementById("panelactivator");

    $( contentcol ).toggleClass( "l10" );
    $(panel).toggle();
    $(panelactivator).toggleClass( "right" );
}