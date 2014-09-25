;(function($, window, undefined){

	 $.fn.slider = function (options) {

		var settings = {
			viewNum : 4,
			scrollNum: 4,
			content: [

				{
					href: 'http://aresyz.com',
					pic: 'img/group.png',
					title: '标题一'
				}, {
					href: 'http://aresyz.com',
					pic: 'img/group.png',
					title: '标题二'
				}, {
					href: 'http://aresyz.com',
					pic: 'img/group.png',
					title: '标题三'
				}, {
					href: 'http://aresyz.com',
					pic: 'img/group.png',
					title: '标题四'
				}

			]
		};

		var slid = document.getElementById('slider'),              //slider外框
			items = settings.content,							   
			items_length = settings.content.length,	               //item数量
			div_width = (window.outerWidth / settings.viewNum)-10, 
	    	old_left = slid.style.left,
	    	old_left_num = old_left.substr(0, old_left.length-2)*1,
	    	move_steps = (div_width + 10) * settings.scrollNum,
	    	scrollNum = settings.scrollNum,
	    	slider_child = document.getElementById('slider').childNodes,	
	    	slider_ele = [];

		for( var i = 0; i < items_length; i++ ) {

			var slid = document.getElementById('slider'), div, img;
				div = add_Itemstyle();
				img = add_Imgstyle(i);
				slid = add_Sliderstyle();
			    div.appendChild(img);
		    	slid.appendChild(div);

		}
	
		var move = setInterval(move_left,4000);
	    
		get_items();

	    function get_items() {
	    	
	    	for( k in slider_child ) {

	    		if(slider_child[k].nodeType === 1) {
	    			slider_ele.push(slider_child[k]);
	    		}

	    	}

	    	var slider_ele_length = slider_ele.length;

	    	for( var i = 0; i<slider_ele_length; i++ ) {
	    		slider_ele[i].style.left = i * (div_width +10) +'px';
	    		// console.log('one');
	    	}

	    }

	    function clone_Node() {

	    	for (var i = 0; i < scrollNum; i++) {
	    		var div_removed = slider_child[i+1];
			    var clone_div = div_removed.cloneNode(true);
			 	clone_div.style.left = ((items_length++) * (div_width +10)) + 'px';
			    slider.appendChild(clone_div);

			  	// var div_ = slider_child[i+1];
			  	// div_.style.left = ((items_length++) * (div_width + 10)) + 'px';
			  	// console.log(div_.style.left);
			  	// slider.appendChild(div_);
	    	}

	    	// for( var j = 0; j < scrollNum; j++) {
	    	// 	console.log('hello');
	    	// 	delete slider_child[i+1];
	    	// }
	    	
	    }

		function move_left() {	

			old_left_num -= move_steps;
			$('#slider').animate({left: old_left_num + 'px'}, 400);
			clone_Node();
			
		}

		function add_Itemstyle() {
			var div = document.createElement('li');
			div.style.width = div_width + 'px';
			div.style.position = 'absolute';
			div.style.float = 'left';
			div.style.height = '140px';
			div.style.margin = '5px';
			return div;
		}

		function add_Imgstyle(i) {
			var img = document.createElement('img');
			img.style.width = 100 + '%';
			img.style.height = 100 + '%';
			img.src = items[i].pic;
			return img;
		}

		function add_Sliderstyle() {
			slid.style.minWidth = (div_width+20) * items_length + 'px';
			slid.style.width = 'auto';
			slid.style.position = 'relative';
			slid.style.height = '140px';
			slid.style.left = 0;
			return slid;
		}

	}
})(Zepto, window)