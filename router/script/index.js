$("#index-span").on('click', function() {

	$(this).find('i').css('left') === '-3px'?
	side_change('-8px', '0px'):side_change('-3px', '-200px');
	
})

function side_change (i, menu) {
	$("#index-span").find('i').animate({'left': i}, 300);
	$("#side_menu").animate({'left': menu}, 300, 'ease');
}