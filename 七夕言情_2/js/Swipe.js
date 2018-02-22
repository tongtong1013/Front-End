function Swipe(container){
	var element = container.find(":first");
	var swipe = {};
	var slides = element.find(">");
//	事件查询机制, 前者">",代表当前节点的子元素,后者"li",代表当前节点所有li节点
	var width = container.width();
	var height = container.height();
	
	element.css({
		width:(slides.length*width)+'px',/*这种的末尾一定要是逗号*/
		height:height+'px'
	});
	
	$.each(slides, function(index) {
		var slide = slides.eq(index);
		slide.css({
			width:width+'px',
			height:height+'px'
		});
	});
	swipe.scrollTo=function(x,speed){
		element.css({
			'transition-timing-function':'linear',
			'transition-duration':speed+'ms',
			'transform':'translate3d(-'+x+'px,0px,0px)'/*不写百分比就是100%*/
		});

		return this;
		//animation-name
		//animation-duration
		//animation-delay
		//animation-iteration-count
		//animation-direction
		//animation-play-state
		//animation-fill-mode
		//animation-timing-function
	};

	return swipe;
}
