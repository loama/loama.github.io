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
  var animationName1 = 'animated bounceInRight'
  var animationName2 = 'animated bounceOutRight'
  var animationend = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'
  var ocult = 'ocult'
  
  $('a.button').on('click' ,function() {
    $ ('ul.news-collap').addClass(animationName).removeClass(cero-opacity).one(animationend,function() {
      //$(this).removeClass(animationName);       
    });

  });

  $('a.jsonopenbtn').on('click' ,function() {
  	$ ('a.jsonopenbtn').addClass(ocult);
    $ ('div.card-json').removeClass(animationName2).addClass(animationName1).removeClass(ocult);

  });

  $('i.ocultjson').on('click' ,function() {
    $ ('div.card-json').removeClass(animationName1).addClass(animationName2).addClass(ocult);
    $ ('a.jsonopenbtn').removeClass(ocult);
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