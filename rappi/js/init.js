(function($){
  $(function(){

    $('.button-collapse').sideNav();

  }); // end of document ready
})(jQuery); // end of jQuery name space

$( document ).ready(function() {
    
    setTimeout(function() { 
      var animationName = 'animated bounceInUp'
      var ocult = 'ocult'
      $('nav.initial-appear').addClass(animationName).removeClass(ocult);
      $('div.initial-appear').addClass(animationName).removeClass(ocult);  
    }, 500);
  });

$(function() {

  var animationName = 'animated bounceInLeft'
  var animationend = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'
  var ocult = 'ocult'
  
  $('a.button').on('click' ,function() {
    $ ('div.newsdiv').addClass(animationName).removeClass(ocult).one(animationend,function() {
      //$(this).removeClass(animationName);       
    });

  });

});


//function to change the title in news navbar -->
function titleFunction(newsname)
  {
    document.getElementById("newstitle").innerHTML = newsname;
  }

//function to change the json
    
$("input.refreshjson").click(function(){
  var jsoninput = document.getElementById("userInput").value;
  $("ul.toempty").empty();

  $.getJSON(jsoninput, function(data) {
      $.each(data, function(i, f) {
        var tblRow = "<li>" + "<div class='collapsible-header' onclick='titleFunction(this.innerHTML)'>"+ f.firstName + "</div>" + "<div class='collapsible-body'>" + "<p>" + f.firstName + f.lastName + f.job + f.roll + "</p>" + "</div>" + "</li>"
        $(tblRow).appendTo("#newsdata");     
    });
  });
});