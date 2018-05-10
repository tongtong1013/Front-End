var slice = Array.prototype.slice;

function toArray(a,i,j){
	return slice.call(a,i||0,j||a.length);
}

function isDefined(v){
	return typeof v !== 'undefined';
}

function applyIf(o,c){
	if(o){
		for(var p in c){
			if(!isDefined(o[p])){
				o[p]=c[p];
			}
		}
	}
	return o;
}

applyIf(String,{
	format:function(format){
		var args = toArray(arguments,1);
		return format.replace(/\{(\d+)\}/g,function(m,i){
			return args[i];
		})
	}
})

function Carousel(carousel,options){
	var imgUrls = options.imgUrls;
	var $carousel = carousel;
	var $spinner = carousel.find("#spinner");
	var angle = 0;
	var numpics = imgUrls.length;
	var rotate = 360/numpics;
	var start = 0;
	var current = 1;
	var $contentElements;
	this.numpics = numpics;
	function createStr(imgUrl) {
        var str = '<figure style="transform:rotateY({0}deg) translateZ({1}) scaleY(.9);position:absolute;">'
                     + '<img src="{2}" style="width:100%;height:100%;">'
                 + '</figure>';

        return String.format(str,
            start,
            "2.5rem",
            imgUrl
        )
    }
	function initStyle(){
		$carousel.css({
			"-webkit-perspective":"500",
			"-moz-perspective":"500px",
			"position":"absolute",
			"left":"6.8rem",
			"top":"4.5re,"
		});
		$spinner.css({
			"width":"4rem",
			"transform-style":"preserve-3d"
		});
	}
	function render(){
		var contentStr='';
		$.each(imgUrls, function(index,url) {
			contentStr += createStr(url);
			start = start + rotate;
		});
		$contentElements=$(contentStr);
		$spinner.append($contentElements);
	}
	initStyle();
	render();
	var currIndex;
	this.run=function(count,callback){
		currIndex = count;
		angle = (count-1)*rotate+360;
		$spinner.css({
			"transform":"rotateY(-"+angle+"deg)",
			"transition":"1s"
		}).css({
			"-moz-transform":"rotateY(-"+angle+"deg)",
			"-moz-transition":"1s"
		}).one("transitionend webkitTransitionend",function(){
//			$spinner.css("transition","");
//			$spinner.css("-moz-transition","");
//			alert("旋转完成");
			callback();
		});
	}
	this.playVideo = function(){
		var index = currIndex;
		var element = element || $contentElements.eq(index);
		var $video = $('<video preload="auto"  class="bounceIn" style="width:50%;height:50%;position:absolute;left:30%;top:35%;"></video>');
		$video.css({
			"position":"absolute",
			"z-index":999
		});
		$video.attr('src',options.videoUrls[index]);
		$video.on("loadeddata",function(){
            $video[0].play()
       });
		$video.on("ended",function(){
			$video[0].pause();
			$video.addClass("bounceOut").one("animationend webkitAnimationEnd",function(){
				$video.remove();
			});
		});
		$carousel.after($video);
	}
}

