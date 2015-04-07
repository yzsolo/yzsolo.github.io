$("#index-span").on('click', function() {

	$(this).find('i').css('left') === '-2px'?
	side_change('-7px', '0px'):side_change('-2px', '-250px');
	
})

function side_change (i, menu) {
	$("#index-span").find('i').animate({'left': i}, 300);
	$("#side_menu").animate({'left': menu}, 300, 'ease');
}