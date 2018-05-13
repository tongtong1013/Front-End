$(function() {
	var snowElement = document.getElementById("snowflake");
	var canvasContext = snowElement.getContext("2d");
	var config = document.documentElement;
	var width = config.clientWidth;
	var height = config.clientHeight;
	snowElement.width = width;
	snowElement.height = height;
	var snowNumber = 50;
	//雪球类
	function Snow() {
		this.radius = randomInRange(3, 10);
		this.x = (Math.random() * width);
		this.y = (Math.random() * height);
		this.alpha = randomInRange(0.5, 1);
		this.render();
	}
	//绘制雪球
	Snow.prototype.render = function() {
		canvasContext.beginPath();
		canvasContext.fillStyle = "rgba(255,255,0," + this.alpha + ")";
		//一个中心点和半径，为一个画布的当前子路径添加一条弧线
		//坐标，圆，沿着圆指定弧的开始点和结束点的一个角度
		//弧沿着圆周的逆时针方向（TRUE）还是顺时针方向（FALSE）遍历
		canvasContext.arc(this.x, this.y, this.radius, 0, Math.Pi * 2, true);
		canvasContext.closePath();
		canvasContext.fill();
	}
	//随机处理
	function randomInRange(min,max){
		var random = Math.random()*(max-min)+min;
		return random;
	}
	//构建雪球
	for(var i  = 0;i<snowNumber;i++){
		new Snow();
	}
})