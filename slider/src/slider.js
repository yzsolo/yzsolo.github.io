;(function($, window, undefined){

	 $.fn.slider = function (options) {

		var settings = {
			viewNum : 2,
			scrollNum: 2

		};

		var img_width = (window.outerWidth / settings.viewNum) - 10,
			scrollNum = settings.scrollNum,
			scroll_width = (img_width + 10) * scrollNum,
			scroll_Width = 0;

			console.log(window.outerWidth);
			console.log(img_width);

		$('.img').css({ width: img_width + 'px' });

		function scroll() {
			console.log(scroll_width);

			scroll_Width -= scroll_width;
			$('.img_box').animate({left: scroll_Width + 'px'}, 400, function () {
				for (var i = 0; i < scrollNum; i++) {
					var node = $(this).find('div').eq(i).clone(true);
					$(this).append(node);
				}
			});
			
			// $('.img_box').find('div:lt('+2 + ')').appendTo($('.img_box'));
			// $('.img_box').css('Left','0px');

		}
		var loop = setInterval(scroll, 2000);
	}
})(Zepto, window)