(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();

  }); // end of document ready
})(jQuery); // end of jQuery name space

// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('header').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('header').removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('header').removeClass('nav-up').addClass('nav-down');
        }
    }
    
    lastScrollTop = st;
}

var play = document.getElementById('videocenterbutton');
var video = document.getElementById('youtubevid');
var videoPlaying = false;

function playPause() {
    if (videoPlaying) {
        video.pause();
        videoPlaying = false;
    }
    else {
        video.play();
        videoPlaying = true;
    }
}
var video = document.getElementById('youtubevid');
function closevid() {
    $('#video1').closeModal();
    video.pause();
    videoPlaying= false;
}

var leanoverlay = document.getElementsByClassName("lean-overlay");
$overlay = $('<div class="lean-overlay"></div>'),
$overlay.click(function(){
    console.log("1")
});



function closemodal() {
    $('#video1').closeModal();
    video.pause();
    videoPlaying= false;
    var close = document.getElementById("closemodal");
    close.style.display = 'none';
};


function showcloser(){
    var close = document.getElementById("closemodal");
    close.style.display = 'block';
}
