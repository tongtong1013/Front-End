//模拟镜头效果
function changePage(element,effect,callback){
	element.addClass(effect).one("animationend webkitAnimationEnd",function(){
		callback && callback();
	});
}

var Christmas = function(){
	var $pageA = $(".page-a");
	var $pageB = $(".page-b");
	var $pageC = $(".page-c");
	
	var observer = new Observer();
	
	new pageA(function(){
		observer.publish("completeA");
	});
	
	observer.subscribe("completeA",function(){
		changePage($pageA,"effect-out",function(){
			observer.publish("pageB");
		});
	});
	
	observer.subscribe("pageB",function(){
		new pageB(function(){
			observer.publish("completeB");
		});
	});
	
	observer.subscribe("completeB",function(){
		changePage($pageC,"effect-in",function(){
			observer.publish("pageC");
		});
	});
	
	observer.subscribe("pageC",function(){
		new pageC();
	});	
	
	var audio1 = HTML5Audio('./music/scene.mp3');
	audio1.end(function(){
		//alert("音乐结束");
		HTML5Audio('./music/circulation.mp3', true);
	});
}

function HTML5Audio(url,loop){
	var audio = new Audio(url);
	audio.autoplay = true;
	audio.loop=loop||false;
	audio.play();
	return{
		end:function(callback){
			audio.addEventListener('ended',function(){
				callback();
			},false);
		}
	}
}

$(function(){
        Christmas();
	
//	$("button").click(function(){
//      //圣诞主题效果，开始
//
//  })
//	$("button").on("click",function(){Christmas();})
//	$("button:first").click(function(){
//		var audio1 = HTML5Audio('./music/scene.mp3');
//		audio1.end(function(){
//			//alert("音乐结束");
//			HTML5Audio('./music/circulation.mp3', true);
//		})
//	})
})

