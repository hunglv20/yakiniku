$(function(){
		var ua = navigator.userAgent;
		if(ua.indexOf('iPhone') < 0 && ua.indexOf('Android') < 0){
			$('.telhref').contents().unwrap();
		}
	});	
//===========================================================================

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v2.6";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


//===========================================================================
( function ( $ ) {
	$(document).ready(function(){
	//Mobile Detect
	var testMobile;
	var isMobile = {
	Android: function() {
	return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function() {
	return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function() {
	return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function() {
	return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function() {
	return navigator.userAgent.match(/IEMobile/i);
	},
	any: function() {
	return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
	};
	testMobile = isMobile.any();
	if (testMobile){
	$('.fix_parallax').css('background-attachment','inherit');
	}
	});
	}( jQuery ));