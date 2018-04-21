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
	})
}
