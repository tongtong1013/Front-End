var animationEnd = (function() {
	var explorer = navigator.userAgent;
	if(~explorer.indexOf('WebKit')) {
		return 'webkitAnimationEnd';
	}
	return 'animationend';
})();

var lamp = {
	elem: $('.b_background'),
	bright: function() {
		this.elem.addClass('lamp-bright');
	},
	dark: function() {
		this.elem.removeClass('lamp-bright')
	}
};
var container = $("#content");
var swipe = Swipe(container);
visualWidth = container.width();
visualHeight = container.height();

function scrollTo(time, proportionX) {
	var distX = container.width() * proportionX;
	swipe.scrollTo(distX, time);
}

var getValue = function(className) {
	var $elem = $('' + className + '');
	return {
		height: $elem.height(),
		top: $elem.position().top
	};
};

var pathY = function() {
	var data = getValue('.a_background_middle');
	return data.top + data.height / 2;
}();

var bridgeY = function() {
	var data = getValue('.c_background_middle');
	return data.top;
}();

swipe.scrollTo(visualWidth * 2, 0);

function doorAction(left, right, time) {
	var $door = $('.door');
	var doorLeft = $('.door-left');
	var doorRight = $('.door-right');
	var defer = $.Deferred();
	var count = 2;
	var complete = function() {
		if(count == 1) {
			defer.resolve();
			return;
		}
		count--;
	};
	doorLeft.transition({
		'left': left
	}, time, complete);
	doorRight.transition({
		'left': right
	}, time, complete);

	return defer;
}

function openDoor() {
	return doorAction('-50%', '100%', 2000);

}

function shutDoor() {
	return doorAction('0%', '50%', 2000);

}