function pageC(callback){
	//alert("页面C");
	this.$window = $(".page-c .window");
	this.$leftWin = this.$window.find(".window-left");
	this.$rightWin = this.$window.find(".window-right");
	this.$sceneBg = this.$window.find(".window-scene-bg");
	this.$closeBg = this.$window.find(".window-close-bg");
	this.$sceneBg.transition({
		opacity:0
	},3000);
	this.$closeBg.css("transform","translateZ(0)");
	this.$closeBg.transition({
		opacity:1
	},5000);
	this.closeWindow();
}

pageC.prototype.closeWindow = function(){
	var count = 0;
	var bind = function(element){
		element.addClass("close").one("animationend webkitAnimationEnd",function(event){
			count ++;
			complete();
		});
	}
	var complete = function(){
		if(count == 2){
			alert("关窗成功！");
		}
	}
	bind(this.$leftWin);
	bind(this.$rightWin);
}


