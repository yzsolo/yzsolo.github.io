var event_bind = {

	touch_flag : 0,

	start_X : 0,

	eve_describe : {
		'#index-span click': 'menu_change',
		'#shade click': 'menu_change',
		'html touchstart': 'touchstart',
		'html touchmove': 'touchmove'
	},

	eve_bind : function() {

		for ( key in this.eve_describe ) {

			if ( this.eve_describe.hasOwnProperty(key) ) {
				var callback = this.eve_describe[key],
			    ele_eve = key.split(' '),
			    ele = ele_eve[0],
			    eve = ele_eve[1];
				$(ele).on(eve, this.eve_detail[callback]);
			}
		}
	},

	eve_detail : {

		menu_change : function() {

			$("#index-span").find('i').css('left') === '-3px'?
			event_bind.side_change('-9px', '0px', true):event_bind.side_change('-3px', '-200px', false);

		},

		touchstart : function(e) {

			var point = e.touches[0];

			if(point.pageX < 10 ) {
				event_bind.touch_flag = 1;
				event_bind.start_X = point.pageX;
			} else {
				event_bind.touch_flag = 0;
			}

		},

		touchmove : function(e) {

			if ( event_bind.touch_flag == 1 ) {
				var point = e.touches[0];
				var dis = point.pageX - event_bind.start_X;

				var left = $('#side_menu').css('left').slice(0, -2) - 0 + dis;
				left>0?left=0:left=left;
				$('#side_menu').css('left',left);

			}
			
			console.log(point.pageX + ' + ' + point.pageY);
		}
	},

	side_change : function(i, menu, flag) {

		$("#index-span").find('i').animate({'left': i}, 250, 'ease-inout');
		$("#side_menu").animate({'left': menu}, 250, 'ease-inout');

		if (flag) {

			$("#shade").css({'display': 'block'}).animate({'opacity': '0.7'}, 250);
			// var json = {time: new Date().getTime()};
			// window.history.pushState(json, '', "http://aresyz.com/router#menu");

		} else {

			//方式1:
			// $("#shade").animate({'opacity': '0'}, 250).css('display', 'none');

			//方式2:
			$("#shade").animate({'opacity': '0'}, 250);

			setTimeout(function(){
				$("#shade").css('display', 'none');
			},200);

			// var json = {time: new Date().getTime()};
			// window.history.pushState(json, '', "http://aresyz.com/router#index");

		}
	}
}

event_bind.eve_bind();