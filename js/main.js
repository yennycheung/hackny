$(function() {
	var height = $(window).innerHeight();
    $(".cover-pic").css("height", height*0.9);
    $(".nav li").css("line-height", height*0.1.toString()+"px");
    $(".divider").css("width", $(window).width()*0.35);
	$(".hashtag").typed({
		strings: ["Build Cool Things", "Coolest Startup Scene", "Best City", "Hack On"],
		typeSpeed: 50
	});
	$(".item").hover(
		function(){
			$(this).prev().css("font-weight",600);
		},
		function(){
			$(this).prev().css("font-weight",300);
		}
	);

	//hiding the header upon scrolling up and vice versa
	var didScroll;
	var lastScrollTop = 0;
	var delta = 6;
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

	// Tablet Animation 
	if($(window).width() > 767) {
		$(".banner .darkgreengradient").on('click', function(e) {
			$("html, body").animate({
				scrollTop : $footeroffset + 640
			});
			e.preventDefault();
		});
	}
	
	//Mobile Animation
	if($(window).width() < 570) {

		// homepage banner button click
		$(".banner .darkgreengradient").on('click', function(e) {
			$("html, body").animate({
				scrollTop : $footeroffset + 580
			});
			e.preventDefault();
		});

		//Mobiel Nav
		var $header = $("header"),
			$btn = $header.find(".togglebtn"),
			$nav = $header.find("ul.nav"),
			$url = window.location.href;

		$header.addClass('closed');	
		
		// changes URL based on page call back
		urlChanges("index", "home"); 
		urlChanges("team", "team"); 
		urlChanges("careers", "careers"); 
		urlChanges("contacts", "contacts");
		urlChanges("blog", "blog"); 

		// dropdown menu animation and url based changes. 
		$("header .togglebtn, .closed .nav li:first-child a").click(function(e) {
			e.preventDefault();
			var $down = $header.hasClass('closed');

			if($down) {
				$btn.removeClass('rotatedback')
						.addClass('rotated');
				$header.animateAuto("height", 200)
						.removeClass('closed').addClass('opened');
			} else {
				$btn.removeClass('rotated')
						.addClass('rotatedback');
				$header.animate( {"height" : "59px" }, 200)
						.removeClass('opened').addClass('closed');
			}
		});	
	}
	
	// changes the mobile nav menu based on the URL of the page
	function urlChanges(url, text) {
		if($url.indexOf(url) > -1) {
    		$nav.find("li a:contains('"+text.capitalize()+"')").parent().prependTo($nav).addClass('active');
		}
	}

	//Email Form AJAX and Validation
	$('#requestform').submit( function() {
		$('#requestform #email').removeClass('error');
		var email = $('#requestform input#email').val();
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if(re.test(email)) {
		  var dataString = '&email=' + email;
	
			$.ajax({
			type: "POST",
			url: "learn-request.php",
			data: dataString,
			success: function(){
			  		$('#requestform').fadeOut('1000', function() {
						$(this).siblings('.thanks').fadeIn(1000);
					});
				}
			});
		
			return false;
		} else {
		  // alert('not ok');
		  if(re.test(email) == false) $('#requestform #email').addClass('error');
		  return false;
		}
	  });

	$('#contactForm').submit(function(){
		  $('#contactForm #subject').removeClass('error');
		  $('#contactForm #message').removeClass('error');
		  var subject = $('#contactForm #subject').val();
		  var message = $('#contactForm #message').val();
		  if(subject.length > 1 && subject != 'Subject' && message.length > 1 && message != 'Message') {
		    var dataString = 'subject='+ subject + '&message=' + message;
		    $.ajax({
		      type: "POST",
		      url: "contact-request.php",
		      data: dataString,
		      success: function(){
		        $('#contactForm').fadeOut('1000', function() {
		          $('#contactText').text("Thanks, we have recieved your contact request!")
		        });
		      }
		    });
		    return false;
		  } else {
		    // alert('not ok');
		    if(subject.length < 2 || subject == 'Subject') $('#contactForm #subject').addClass('error');
		    if(message.length < 2 || message == 'Message') $('#contactForm #message').addClass('error');
		    return false;
		  }
		});

	//HIDE SHOW VALUES
	 $('form input:text, form textarea').each(function(){
        $.data(this, 'default', this.value);
    }).focus(function(){
        if ($.data(this, 'default') == this.value) {
            this.value = '';
        }
    }).blur(function(){
        if (this.value == '') {
            this.value = $.data(this, 'default');
        }
    });

});


// sets first letter to capital 
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

// Animates height back to auto
jQuery.fn.animateAuto = function(prop, speed, callback){
    var elem, height, width;
    return this.each(function(i, el){
        el = jQuery(el), elem = el.clone().css({"height":"auto","width":"auto"}).appendTo("body");
        height = elem.css("height"),
        width = elem.css("width"),
        elem.remove();
        
        if(prop === "height")
            el.animate({"height":height}, speed, callback);
        else if(prop === "width")
            el.animate({"width":width}, speed, callback);  
        else if(prop === "both")
            el.animate({"width":width,"height":height}, speed, callback);
    });  
}