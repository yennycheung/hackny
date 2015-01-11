$(function() {
	var height = $(window).innerHeight();
	function resizingElements(){
	    var height = $(window).innerHeight();
	    $(".nav li").css("line-height", height*0.1.toString()+"px");
	    $("section.welcome .divider").css("width", $(window).width()*0.35);
	    $("#middle-divider").css("height", $("section.about p").height());
	    if($(window).width() < 786) {
			$(".rslides img").css("height", height);
		}
		else{
			$(".rslides img").css("height", height*0.9);
		}
	    if($(window).width() < 900) {
			$("section.deadlines .breakpoint").removeClass("hide");
		}
		else{
			$("section.deadlines .breakpoint").addClass("hide");
		}
		if($(window).width() < 1125) {
			$("section.news .breakpoint").removeClass("hide");
		}
		else{
			$("section.news .breakpoint").addClass("hide");
		}
	}
	//using the responsiveslides.js plugin
	resizingElements();
	$(".rslides").responsiveSlides({
	  auto: true,             // Boolean: Animate automatically, true or false
	  speed: 700,            // Integer: Speed of the transition, in milliseconds
	  timeout: 2500,          // Integer: Time between slide transitions, in milliseconds
	  pager: false,           // Boolean: Show pager, true or false
	  nav: false,             // Boolean: Show navigation, true or false
	  random: false,          // Boolean: Randomize the order of the slides, true or false
	  pause: false,           // Boolean: Pause on hover, true or false
	  pauseControls: true,    // Boolean: Pause when hovering controls, true or false
	  prevText: "Previous",   // String: Text for the "previous" button
	  nextText: "Next",       // String: Text for the "next" button
	  maxwidth: "",           // Integer: Max-width of the slideshow, in pixels
	  navContainer: "",       // Selector: Where controls should be appended to, default is after the 'ul'
	  manualControls: "",     // Selector: Declare custom pager navigation
	  namespace: "rslides",   // String: Change the default namespace used
	  before: function(){},   // Function: Before callback
	  after: function(){}     // Function: After callback
	});

	$(".hashtag").typed({
		strings: ["Build Cool Things", "Coolest Startup Scene", "Build a Network", "Top Quality Mentorship", "Best City", "Hack On"],
		typeSpeed: 50
	});
	$(".menu").click(function(){
		$(".nav-dropdown").slideToggle();
	});
	$(".cross").click(function(){
		$(".nav-dropdown").slideToggle();
	});
	$(".item").hover(
		function(){
			$(this).prev().css("font-weight",600);
		},
		function(){
			$(this).prev().css("font-weight",300);
		}
	);
	$(window).resize(function(event){
		resizingElements();
	});
	
	//hiding the header upon scrolling up and vice versa
	var didScroll;
	var lastScrollTop = 0;
	var delta = 6;
	var navbarHeight = $('header').outerHeight();


	$(window).scroll(function(event){
	    didScroll = true;
	    $(".nav-dropdown").slideUp();
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
	    
	    if (st > lastScrollTop && st > navbarHeight && $(window).scrollTop()>height*0.9){
	        // Scroll Down
	        $('header').removeClass('nav-up').addClass('nav-down');
	    } else {
	        // Scroll Up
	        if(st + $(window).height() < $(document).height()) {
	            $('header').removeClass('nav-down').addClass('nav-up');
	        }
	    }	    
	    lastScrollTop = st;
	}

	$('a[href*=#]:not([href=#])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      if (target.length) {
	        $('html,body').animate({
	          scrollTop: target.offset().top-80
	        }, 1000);
	        return false;
	      }
	    }
	});
});