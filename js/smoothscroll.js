$(function () {
        // PageTopヘッダ分ずらす
        var headH = 80;

        // PageTop
        $('a[href^=#], area[href^=#]').not('a[href=#], area[href=#]').each(function () {
                // jquery.easing
                jQuery.easing.quart = function (x, t, b, c, d) {
                        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
                };
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname && this.hash.replace(/#/, '')) {
                        var $targetId = $(this.hash),
                                $targetAnchor = $('[name=' + this.hash.slice(1) + ']');
                        var $target = $targetId.length ? $targetId : $targetAnchor.length ? $targetAnchor : false;
                        if ($target) {
                                var targetOffset = $target.offset().top - headH;
								
                                $(this).click(function () {
                                        $('html, body').animate({
                                                scrollTop: targetOffset
                                        }, 500, 'quart');
                                        return false;
                                });
                        }
                }
        });
                if (location.hash) {
                        var hash = location.hash;
                        window.scroll(0, headH)
                        $('a[href=' + hash + ']').click();
                }
});

$(function() {
    if(navigator.userAgent.indexOf("MSIE") != -1) {
        $('img').each(function() {
            if($(this).attr('src').indexOf('.png') != -1) {
                $(this).css({
                    'filter': 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' +
                    $(this).attr('src') +
                    '", sizingMethod="scale");'
                });
            }
        });
    }
	
	
});
$(document).ready(function(){
		
	function goToByScroll(id){
		  // Remove "link" from the ID
		id = id.replace("link", "");
		var v_top = $("#"+id).offset().top - 19;
		  // Scroll
		$('html,body').animate({
			scrollTop: v_top},
			'slow');
	}
	
	$("#bnrarea li > a").click(function(e) { 
		  // Prevent a page reload when a link is pressed
		e.preventDefault(); 
		  // Call the scroll function
		goToByScroll($(this).attr("data"));           
	});
	
	
	$(".fix_btn a").click(function(e) { 
		  // Prevent a page reload when a link is pressed
		e.preventDefault(); 
		  // Call the scroll function
		goToByScroll($(this).attr("data"));           
	});
});