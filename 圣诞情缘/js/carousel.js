var slice = Array.prototype.slice;

function toArray(a, i, j) {
	return slice.call(a, i || 0, j || a.length);
}

function isDefined(v) {
	return typeof v !== 'undefined';
}

function applyIf(o, c) {
	if(o) {
		for(var p in c) {
			if(!isDefined(o[p])) {
				o[p] = c[p];
			}
		}
	}
	return o;
}

applyIf(String, {
	format: function(format) {
		var args = toArray(arguments, 1);
		return format.replace(/\{(\d+)\}/g, function(m, i) {
			return args[i];
		})
	}
})

function Carousel(carousel, options) {
	var imgUrls = options.imgUrls;
	var $carousel = carousel;
	var $spinner = carousel.find("#spinner");
	var angle = 0;
	var numpics = imgUrls.length;
	var rotate = 360 / numpics;
	var start = 0;
	var current = 1;
	var $contentElements;
	this.numpics = numpics;

	function createStr(imgUrl) {
		var str = '<figure style="transform:rotateY({0}deg) translateZ({1}) scaleY(.9);position:absolute;">' +
			'<img src="{2}" style="width:100%;height:100%;">' +
			'</figure>';

		return String.format(str,
			start,
			"0.4rem",
			imgUrl
		)
	}

	function initStyle() {
		$carousel.css({
			"-webkit-perspective": "500px",
			"-moz-perspective": "500px",
			"position": "absolute",
			"left": "7.4rem",
			"top": "4.2rem"
		});
		$spinner.css({
			"width": "0.8rem",
			"transform-style": "preserve-3d"
		});
	}

	function render() {
		var contentStr = '';
		$.each(imgUrls, function(index, url) {
			contentStr += createStr(url);
			start = start + rotate;
		});
		$contentElements = $(contentStr);
		$spinner.append($contentElements);
	}

	this.visibleSpinner = function() {
		$spinner.removeClass("hiddenSpinner");
	}
	
	this.unvisibleSpinner = function() {
		$spinner.addClass("hiddenSpinner");
	}

	initStyle();
	render();

	function delay(time) {
		var dfd = $.Deferred();
		setTimeout(function() {
			dfd.resolve();
		}, time);
		return dfd;
	}

	var currIndex;

	//this.run = function(count){...}这种写法可以被外部调用
	//如果写成function run (count){...}就只能在类内部被调用

	this.run = function(count) {
		var dfd = $.Deferred();
		currIndex = count;
		angle = (count + 1) * rotate * 2; //第一次240度，第二次480度，第三次720度
		$spinner.css({
			"transform": "rotateY(-" + angle + "deg)",
			"transition": "1s"
		}).css({
			"-moz-transform": "rotateY(-" + angle + "deg)",
			"-moz-transition": "1s"
		}).one("transitionend webkitTransitionend", function() {
			//			$spinner.css("transition","");
			//			$spinner.css("-moz-transition","");
			//			alert("旋转完成");

			playVideo().then(function(){
				setTimeout(function(){
					dfd.resolve();
				},1000);
			});
		});
		return dfd;
	}

	function playVideo() {
		var dfd = $.Deferred();
		var index = currIndex;
		var element = element || $contentElements.eq(index);
		var $video = $('<video preload="auto" class="bounceIn" style="width:50%;height:50%;position:absolute;left:30%;top:35%;"></video>');
		$video.css({
			"position": "absolute",
			"z-index": 999
		});
		$video.attr('src', options.videoUrls[index]);
		$video.on("loadeddata", function() {
			$video[0].play();
		});
		$video.on("ended", function() {
			$video[0].pause();
			$video.addClass("bounceOut").one("animationend webkitAnimationEnd", function() {
				$video.remove();
			});
			dfd.resolve();
		});
		
		delay(2000).then(function(){
			$carousel.after($video);	
		});

		
		return dfd;
	}
}