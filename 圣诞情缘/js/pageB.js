//function pageB(callback){
//	//alert("页面B");
//	setTimeout(function() {
//
//		callback()
//
//	}, 1000)
//}

function pageB(element,pageComplete){
	var $boy = element.find(".christmas-boy");
	var $girl = element.find(".girl");
	var $carousel = element.find("#carousel");
	var animationEnd="animationend webkitAnimationEnd";
	var boyAction={
		walk:function(){
			var dfd = $.Deferred();
			$boy.addClass("boy-walk");
			$boy.transition({"right":"4.5rem"},4000,'linear',function(){
				dfd.resolve();
			});
			return dfd;
		},
		stopWalk:function(){
			$boy.removeClass("boy-walk");
			$boy.addClass("boy-stand");
		},
		runWalk:function(){
			$boy.addClass("walk-run");
		},
		unwrapp:function(){
			var dfd = $.Deferred();
			$boy.addClass("boy-unwrapp");
			$boy.removeClass("boy-stand");
			$boy.one(animationEnd,function(){
				dfd.resolve();
			});
			return dfd;
		},
		strip:function(count){
			$boy.addClass("boy-strip-"+count).removeClass("boy-unwrapp");
		},
		hug:function(){
			$boy.addClass("boy-hug").one(animationEnd,function(){
				$(".christmas-boy-head").show();
			});
		}		
	}
	var girlAction = {
		standUp:function(){
			var dfd = $.Deferred();
			setTimeout(function(){
				$girl.addClass("girl-standUp");
			},200);
			setTimeout(function(){
				$girl.addClass("girl-throwBook");
				dfd.resolve();
			},500);
			return dfd;
		},
		walk:function(callback){
			var dfd = $.Deferred();
			$girl.addClass("girl-walk");
			$girl.transition({"left":"4.5rem"},4000,'linear',function(){
				dfd.resolve();
			});
			return dfd;
		},
		stopWalk:function(){
			$girl.addClass("walk-stop")
			.removeClass("girl-standUp")
			.removeClass("girl-walk")
			.removeClass("girl-throwBook")
			.addClass("girl-stand");
		},
		choose:function(callback){
			$girl.addClass("girl-choose")
			.removeClass("walk-stop");
			$girl.one(animationEnd,function(){
				callback();
			});
		},
		weepWalk:function(callback){
			$girl.addClass("girl-weep");
			$girl.transition({"left":"7rem"},1000,'linear',function(){
				$girl.addClass("walk-stop").removeClass("girl-weep");
				callback();
			});
		},
		hug:function(){
			$girl.addClass("girl-hug").addClass("walk-run");
		}
	};
	var carousel = new Carousel($carousel,{
		//相对index.html的路径，而非pageB.js的路径
		imgUrls:[
			"img/carousel/3.png",
			"img/carousel/2.png",
			"img/carousel/1.png"
		],
		videoUrls:[
			"img/carousel/3.mp4",
			"img/carousel/2.mp4",
			"img/carousel/1.mp4"
		]
	});
	boyAction.walk().then(function(){
		boyAction.stopWalk();
	}).then(function(){
		return boyAction.unwrapp();
	}).then(function(){
		setTimeout(function(){
			boyAction.strip(1);
		},1000);
		setTimeout(function(){
			boyAction.strip(2);
		},2000);
		setTimeout(function(){
			boyAction.strip(3);
		},3000);
		setTimeout(function(){
			boyAction.strip(4);
		},4000);
	});
	girlAction.standUp().then(function(){
		return girlAction.stopWalk();
	}).then(function(){
		return girlAction.walk();
	}).then(function(){
		girlAction.choose(function(){
			girlAction.weepWalk(function(){
				girlAction.hug();
			});
		});
	})
	var i = 0;
	$("button").on("click",function(){
		carousel.run(i++,function(){
			carousel.playVideo();
		});
	})
}


