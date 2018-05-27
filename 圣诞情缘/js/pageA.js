function pageA(callback){
//	alert("页面A");
	var $pageA = $(".page-a");
	new pageAStart($pageA);
	setTimeout(function() {

		callback();

	}, 22000);
}

function pageAStart(element) {
	this.$root = element;
	this.$boy = element.find(".chs-boy");
	this.$window = element.find(".window");
	this.$leftWin = this.$window.find(".window-left");
	this.$rightWin = this.$window.find(".window-right");
	this.run();
}

pageAStart.prototype.openWindow = function(callback) {
	var count = 1;
	var complete = function() {
		++count;
		if(count === 2) {
			callback && callback();
		}
	}
	var bind = function(data) {
		data.one("transitionend wibkitTransitionEnd", function(event) {
			data.removeClass("window-transition");
			complete();
		})
	}
	bind(this.$leftWin.addClass("window-transition").addClass("hover"));
	bind(this.$rightWin.addClass("window-transition").addClass("hover"));
}
pageAStart.prototype.next = function(options) {
	var dfd = $.Deferred();
	//jquery.transit.js未引用会导致transition无法使用
	this.$boy.transition(
		options.style,
		options.time,
		"linear",
		function() {
			dfd.resolve();
		}
	);
	return dfd;
}

pageAStart.prototype.stopWalk = function() {
	this.$boy.removeClass("chs-boy-deer");
}

pageAStart.prototype.run = function(callback) {
	var that = this;
	var next = function() {
		//pageA方法劫持了pageA.next方法，并立即执行劫持的方法
		//arguments为pageA方法的参数，这里应该是".page-a"
		return this.next.apply(this, arguments);
	}.bind(this); //绑定后不会立刻执行

	next({
			"time": 10000,
			"style": {
				"top": "4rem",
				"right": "16rem",
				"scale": "1.2"
			}
		})
		.then(function() {
			return next({
				"time": 500,
				"style": {
					"rotateY": "-180",
					"scale": "1.5"
				}
			})
		})
		.then(function() {
			return next({
				"time": 7000,
				"style": {
					"top": "7.8rem",
					"right": "1.2rem"
				}
			})
		})
		.then(function() {
			that.stopWalk();
		})
		.then(function() {
			that.openWindow(function() {
//				alert("窗户已打开");
			});
		})
}
