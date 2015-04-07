$("#index-span").on('click', function() {

	$("#index-span").find('i').css('left') === '-3px'?
	side_change('-9px', '0px', true):side_change('-3px', '-200px', false);
	
})

$("#shade").on('click', function() {
	$("#index-span").find('i').css('left') === '-3px'?
	side_change('-9px', '0px'):side_change('-3px', '-200px');
})

function side_change (i, menu, flag) {
	$("#index-span").find('i').animate({'left': i}, 250, 'ease-inout');
	$("#side_menu").animate({'left': menu}, 250, 'ease-inout');

	if (flag) {

		$("#shade").css({'display': 'block'}).animate({'opacity': '0.7'}, 250);

	} else {

		/*关于链式操作的思考*/
		//方式1:
		// $("#shade").animate({'opacity': '0'}, 250).css('display', 'none');

		//方式2:
		$("#shade").animate({'opacity': '0'}, 250);

		setTimeout(function(){
			$("#shade").css('display', 'none');
		},200);
		
		
	}
}

