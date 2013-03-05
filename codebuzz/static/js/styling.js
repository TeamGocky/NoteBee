var $, window, document, visible;

window.onresize = function () {
    'use strict';
    var windowWidth, articleWidth = $("article").width();
    if (window.innerWidth) {
        windowWidth = window.innerWidth;
    } else if (document.compatMode === 'CSS1Compat' && document.documentElement && document.documentElement.offsetWidth) {
        windowWidth = document.documentElement.offsetWidth;
    } else if (document.body && document.body.offsetWidth) {
        windowWidth = document.body.offsetWidth;
    } else {
        windowWidth = 800;
    }
    if (windowWidth <= 800) {
        $(".nav").css("display", "none");
		$("#editor").css("width", "90%");
		$(".container").css("width", "99%");
    } else {
        $(".nav").css("display", "block");
		$("#editor").css("width", "100%");
		$(".container").css("width", "95%");
    }
};

window.onload = function () {
    'use strict';
    window.onresize();
};