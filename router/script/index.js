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
			stopBubble(e);
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
			// console.log('shade_touchend');
			var left = event_bind.get_left('#side_menu');

			if ( left < -100 ) {
				// console.log('-100');
				event_bind.side_change('-3px', '-200px', false);

			} else {

				event_bind.side_change('-9px', '0px', true);

			}
			stopBubble(e);
			
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
			
			// stopBubble(e);

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
			stopBubble(e);
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
			stopBubble(e);
			
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
		var speed = speed?speed:300;
		console.log(speed);

		$("#index-span").find('i').animate({'left': i}, speed, 'ease-inout');
		$("#side_menu").animate({'left': menu}, speed, 'ease-inout');

		if (flag) {

			$("#shade").css({'display': 'block'}).fadeTo(speed, '0.7');

		} else {

			$("#shade").fadeOut(speed);

		}

	}
}
function stopBubble(event) {  
            if (event && event.stopPropagation) {  
                event.stopPropagation();  
            } else {  
                window.event.cancelBubble = true;  
            }  
        }  
event_bind.eve_bind();