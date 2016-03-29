(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();

  }); // end of document ready
})(jQuery); // end of jQuery name space

function SubmitForm()
{
     document.forms['contactus'].action='action1.php';
     document.forms['contactus'].target='frame_result1';
     document.forms['contactus'].submit();
 
     document.forms['contactus'].action='action2.php';
     document.forms['contactus'].target='frame_result2';
     document.forms['contactus'].submit();

     document.forms['contactus'].action='action2.php';
     document.forms['contactus'].target='frame_result2';
     document.forms['contactus'].submit();
     return true;
}
