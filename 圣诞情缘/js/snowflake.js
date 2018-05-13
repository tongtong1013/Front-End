$(function() {
	function Snowflake(elementName) {
		var snowElement = document.getElementById("snowflake");
		var canvasContext = snowElement.getContext("2d");
		var config = document.documentElement;
		var width = config.clientWidth;
		var height = config.clientHeight;
		snowElement.width = width;
		snowElement.height = height;
		var snowNumber = 50;
		var snowArrObjs = initSnow(snowNumber, width, height);
		var snowArrNum = snowArrObjs.length;

		//绘制页面
		var render = function() {
			canvasContext.clearRect(0, 0, width, height);
			for(var i = 0; i < snowArrNum; ++i) {
				snowArrObjs[i].render(canvasContext);
			}
		}
		//更新雪花
		var update = function() {
			for(var i = 0; i < snowArrNum; ++i) {
				snowArrObjs[i].update();
			}
		}
		
		var renderAndUpdate = function(){
			render();
			update();
			requestAnimationFrame(renderAndUpdate);
		}
		
		renderAndUpdate();
	}
	
	function initSnow(snowNumber,width,height){
		var options = {
			minRadius:3,
			maxRadius:10,
			maxX:width,
			maxY:height,
			minSpeedY:0.05,
			maxSpeedY:2,
			speedX:0.05,
			minAlpha:0.5,
			maxAlpha:1.0,
			minMoveX:4,
			maxMoveX:18
		}
		var snowArr = [];
		for(var i = 0;i<snowNumber;++i){
			snowArr[i] = new Snow(options);
		}
		return snowArr;
	}
	//雪球类
	function Snow(snowSettings) {
//		this.radius = randomInRange(3, 10);
//		this.x = (Math.random() * width);
//		this.y = (Math.random() * height);
//		this.alpha = randomInRange(0.5, 1);
//		this.render();
		this.snowSettings = snowSettings;
		this.radius = randomInRange(snowSettings.minRadius,snowSettings.maxRadius);
		this.initialX=Math.random()*snowSettings.maxX;
		this.y = -(Math.random()*500);
		this.speedY=randomInRange(snowSettings.minSpeedY,snowSettings.maxSpeedY);
		this.speedX = snowSettings.speedX;
		this.alpha = randomInRange(snowSettings.minAlpha,snowSettings.maxAlpha);
		this.angle = Math.random(Math.PI*2);
		this.x = this.initialX+Math.sin(this.angle);
		this.moveX=randomInRange(snowSettings.minMoveX,snowSettings.maxMoveX);
	}
	//绘制雪球
	Snow.prototype.render = function(canvasContext) {
		canvasContext.beginPath();
		canvasContext.fillStyle = "rgba(255,255,255," + this.alpha + ")";
		//一个中心点和半径，为一个画布的当前子路径添加一条弧线
		//坐标，圆，沿着圆指定弧的开始点和结束点的一个角度
		//弧沿着圆周的逆时针方向（TRUE）还是顺时针方向（FALSE）遍历
		canvasContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true); //Math.PI大小写要注意，I是大写！
		canvasContext.closePath();
		canvasContext.fill();
	}
	Snow.prototype.update = function(){
		this.y +=this.speedY;
		if(this.y>this.snowSettings.maxY){
			this.y-=this.snowSettings.maxY;
		}
		this.angle+=this.speedX;
		if(this.angle>Math.PI*2){
			this.angle-=Math.PI*2;
		}
		this.x+=this.speedX;
		if(this.x>this.snowSettings.maxX){
			this.x-=this.snowSettings.maxX;
		}
	}
	//随机处理
	function randomInRange(min, max) {
		var random = Math.random() * (max - min) + min;
		return random;
	}
	//构建雪球
//	for(var i = 0; i < snowNumber; i++) {
//		new Snow();
//	}
	Snowflake("snowflake");
})