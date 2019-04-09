jQuery(window).load(function () {  });

$(document).ready(function() {
	$('[data-toggle="tooltip"]').tooltip();
	var currentTheme = "incl/css/theme/default.css";

	if ($.cookie("theme") != undefined) {
		$('link[href="'+currentTheme+'"]').attr('href', ''+$.cookie("theme")+'');
		currentTheme = $.cookie("theme");
	}

	$(document).on("click", "#theme", function(e) {
    	e.preventDefault();
		var newTheme = 'incl/css/theme/'+$(this).attr("data-css")+'';
		$('link[href="'+currentTheme+'"]').attr('href', ''+newTheme+'');
		currentTheme = newTheme;
		$.cookie("theme", newTheme, { path: '/', expires: 30 });
    });

});