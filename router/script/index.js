var event_bind = {

	touch_flag : 0,

	start_X : 0,

	eve_describe : {
		//顶部按钮操作
		'#index-span click': 'menu_change',

		//阴影遮罩点击操作
		'#shade click': 'menu_change',

		//针对menu的手势滑动操作
		'#box touchstart': 'index_touchstart',
		'#box touchmove': 'index_touchmove',
		'#box touchend': 'index_touchend',

		//shade出现后，针对menu的手势滑动操作
		'#shade touchstart': 'shade_touchstart',
		'#shade touchmove': 'shade_touchmove',
		'#shade touchend': 'shade_touchend'
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
		shade_touchstart : function(e) {
			var left = event_bind.get_left('#side_menu');

			if ( left == 0 ) {
				side_flag = 1;
			} else {
				side_flag = 0;
			}
			console.log('shade_touchstart');
		},

		shade_touchmove : function(e) {
			console.log('shade_touchmove');

			if ( side_flag == 1 ) {
				var point = e.touches[0];

				if(point.pageX < 200) {

					var left = point.pageX - 200;
					event_bind.side_change_process(left);

				}

			}

		},

		shade_touchend : function(e) {
			console.log('shade_touchend');
			var left = event_bind.get_left('#side_menu');

			if ( left < -100 ) {
				// console.log('-100');
				event_bind.side_change('-3px', '-200px', false);

			} else {

				event_bind.side_change('-9px', '0px', true);

			}
			
		},

		menu_change : function(e) {
			var left = event_bind.get_left("#side_menu");
			console.log('click');

			if( left === -200 || left === 0) {
				left === -200?
				event_bind.side_change('-9px', '0px', true):event_bind.side_change('-3px', '-200px', false);
			} else {
				return null;
			}
			

		},

		index_touchstart : function(e) {
			console.log('index_touchstart');
			var point = e.touches[0];

			if(point.pageX < 20 ) {

				event_bind.touch_flag = 1;
				event_bind.start_X = point.pageX;

			} else {

				event_bind.touch_flag = 0;

			}
		},

		index_touchmove : function(e) {
			console.log('index_touchmove');
			if ( event_bind.touch_flag == 1 ) {
				var point = e.touches[0];


				var dis = point.pageX - event_bind.start_X;
				var left = -200;
				left = left + dis;

				left>0?left=0:left=left;

				event_bind.side_change_process(left);

			}

		},

		index_touchend : function(e) {
			// console.log('index_touchend');
			var left = event_bind.get_left('#side_menu');

			if ( left < -100 ) {
				
				event_bind.side_change('-3px', '-200px', false);

			} else {

				event_bind.side_change('-9px', '0px', true);

			}
			
		}
	},

	get_left : function(el) {
		return $(el).css('left').slice(0, -2) - 0;
	},

	side_change_process : function(left) {

		$('#side_menu').css('left',left);
		$("#shade").css({'display': 'block', 'opacity': (200-left*(-1))/200*0.7});
		$("#index-span").find('i').css({'left': -(200-left*(-1))/200*6-3 + "px"})

	},

	side_change : function(i, menu, flag, speed) {
		var speed = 500;
		console.log(speed);

		$("#index-span").find('i').animate({'left': i}, speed, 'ease-inout');
		$("#side_menu").animate({'left': menu}, speed, 'ease-inout');

		if (flag) {

			$("#shade").css({'display': 'block'}).animate({'opacity': '0.7'}, speed, 'ease-inout');

			// var json={time:new Date().getTime()};
			// window.history.pushState(json, '', 'http://aresyz.com/router/#menu');

		} else {

			$("#shade").animate({'opacity': '0'}, speed, 'ease-inout');

			setTimeout(function() {
				$("#shade").css({'display': 'none'});
			}, speed);

			// var json={time:new Date().getTime()};
			// window.history.pushState(json, '', 'http://aresyz.com/router/#index');


		}

	}

}

event_bind.eve_bind();

window.onhashChange = function() {

 	if( window.location.hash == '#menu' ) {
 		console.log('#menu');

 		if(event_bind.get_left('#index-span') != -9) {
 			$("#index-span").trigger('click');
 			$("#index-span").attr('href', '#index');
 		}

 	} else if ( window.location.hash == '#index' ) {
 		console.log('#index');

 		if(event_bind.get_left('#index-span') != -3) {
 			$("#index-span").trigger('click');
 			$("#index-span").attr('href', '#menu');
 		}
 		
 	}
}
















