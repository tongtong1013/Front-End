$(document).ready(function() {
	var sub = $('#sub');
	var activeRow = null;
	var activeMenu = null;
	var mouseTrack = [];
	var timer = null;
	var msec = 300;
	$('#test')
		.on('mouseenter',function(e){
			sub.removeClass('none');
		})
		.on('mouseleave',function(e){
			sub.addClass('none');
		})
		.on('mouseenter','li',function(e){
			if(!timer)
			{
				clearTimeout(timer);
				timer = null;
			}
			var o = this;//this在这里赋值一下，不然的话作用域会不指向绑定的节点
			timer = setTimeout(function(){setActive('enter',o)},msec);
		})
		.on('mouseleave','li',function(e){
			if(!timer)
			{
				clearTimeout(timer);
			}
			var o = this;
			timer = setTimeout(function(){setActive('out',o)},msec);
		})
		.on('mousemove','li',function(e){
			mouseTrack.push({
				x:e.pageX,
				y:e.pageY
			})

			if(mouseTrack.length>2){
				mouseTrack.shift();
			}
		})
		//定时器，进li和出li都要清空原来的定时器并开启一个新定时
		//当定时器超过300ms时，会触发一个function，将activeRow和activeMenu进行判断
		
		/*
		今天碰到一个烦心事，使用setTimeout的时候，方法总是立即执行，根本没有延迟效果。 
		这是我原来的代码
		//setTimeout(setTab('one',2,5),500);//setTab是要执行的方法
		
		后来发现setTimeout的第一个参数必须是需要编译的代码或者是一个函数方法，而如果直接传入一行可执行代码，那么抱歉，这里会立即执行，没有延迟效果。 
		
		修改后的代码
		//setTimeout(function(){setTab('one',2,5);},500);
		*/
		function setActive(cmd,o){
			if(cmd == 'enter')
			{
				console.log('enter');
				if(activeRow)
				{
					activeRow.removeClass('active');
					//activeRow = null;
				}
				if(activeMenu)
				{
					activeMenu.addClass('none');
					//activeMenu = null;
				}
				console.log(o);
				activeRow = $(o).addClass('active');
				activeMenu = $('#' + activeRow.data('id'));
				activeMenu.removeClass('none');				
			}
			else if(cmd == 'out')
			{
				console.log('out');
				if(needKeep(sub,mouseTrack))//如果鼠标移动在三角形范围内,则不触发
				{
					return;
				}
				if(activeRow)
				{
					activeRow.removeClass('active');
					activeRow = null;
				}
				if(activeMenu)
				{
					activeMenu.addClass('none');
					activeMenu = null;
				}
			}
		}
})

function needKeep(elem,mouseTrack){
	var len = mouseTrack.length;
	if(len<2)
	{
		return false;
	}
	else if(mouseTrack[len-1].x == mouseTrack[len-2].x && mouseTrack[len-1].y == mouseTrack[len-2].y)//垂直移动，不保持
	{
		return false;
	}
	else if(isInTrangle(elem,mouseTrack))//在三角形范围内，则保存
	{
		return true;
	}
	else
	{
		return false;
	}
	
}

function isInTrangle(elem,mouseTrack){
	var offset = elem.offset();
	
	//elemTopLeft
	var a = {
		x:offset.left,
		y:offset.top
	}
	
	//elemBottomLeft
	var b = {
		x:offset.left,
		y:offset.top+elem.height()
	}
	
	var len = mouseTrack.length;
	
	//lastPos
	var c = {
		x:mouseTrack[len-2].x,
		y:mouseTrack[len-2].y
	}
	
	//currenPos
	var p = {
		x:mouseTrack[len-1].x,
		y:mouseTrack[len-1].y
	}
	
	var pa = vector(p,a);
	var pb = vector(p,b);
	var pc = vector(p,c);
	
	var pa_pb = vectorProduct(pa,pb);
	var pb_pc = vectorProduct(pb,pc);
	var pc_pa = vectorProduct(pc,pa);
	
	return sameSign(pa_pb,pb_pc)&&sameSign(pb_pc,pc_pa);
}

function vector(p,t){
	return {
		x:p.x-t.x,
		y:p.y-t.y
	}
}

function vectorProduct(v1,v2){
	return v1.x *v2.y-v2.x*v1.y
}

function sameSign(a,b){
	return (a^b)>=0
}
