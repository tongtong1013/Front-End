function pageB(callback){
//	alert("页面B");
	var $pageB = $(".page-b");
	new pageBStart($pageB);
	setTimeout(function() {

		callback();

	}, 63000);
}

function pageBStart(element, pageComplete) {
	var $boy = element.find(".christmas-boy");
	var $girl = element.find(".girl");
	var $cat = element.find(".cat");
	var $carousel = element.find("#carousel");
	var animationEnd = "animationend webkitAnimationEnd";
	var boyAction = {
		walk: function() {
			var dfd = $.Deferred();
			$boy.addClass("boy-walk");
			$boy.transition({
				"right": "4.5rem"
			}, 4000, 'linear', function() {
				dfd.resolve();
			});
			return dfd;
		},
		stopWalk: function() {
			$boy.removeClass("boy-walk");
			$boy.addClass("boy-stand");
		},
		runWalk: function() {
			$boy.addClass("walk-run");
		},
		unwrapp: function() {
			var dfd = $.Deferred();
			$boy.addClass("boy-unwrapp");
			$boy.removeClass("boy-stand");
			$boy.one(animationEnd, function() {
				dfd.resolve();
			});
			return dfd;
		},
		strip: function(count) {
			$boy.addClass("boy-strip-" + count).removeClass("boy-unwrapp");
		},
		hug: function() {
			$boy.addClass("boy-hug").one(animationEnd, function() {
				$(".christmas-boy-head").show();
			});
		}
	}
	var girlAction = {
		standUp: function() {
			var dfd = $.Deferred();
			setTimeout(function() {
				$girl.addClass("girl-standUp");
			}, 200);
			setTimeout(function() {
				$girl.addClass("girl-throwBook");
			}, 500);
			setTimeout(function() {
				$cat.addClass("catWithBook");
				dfd.resolve();
			}, 650);
			return dfd;
		},
		walk: function() {
			var dfd = $.Deferred();
			$girl.addClass("girl-walk");
			$girl.transition({
				"left": "4.5rem"
			}, 4000, 'linear', function() {
				dfd.resolve();
			});
			return dfd;
		},
		stopWalk: function() {
			$girl.addClass("walk-stop")
				.removeClass("girl-standUp")
				.removeClass("girl-walk")
				.removeClass("girl-throwBook")
				.addClass("girl-stand");
		},
		choose: function() {
			$girl.addClass("girl-choose")
				.removeClass("walk-stop");
			$girl.one(animationEnd, function() {
				setTimeout(function() {
					$girl.removeClass("girl-choose");
				}, 2000);
			});
		},
		weepWalk: function(callback) {
			var dfd = $.Deferred();
			$girl.addClass("girl-weep");
			$girl.transition({
				"left": "7rem"
			}, 1000, 'linear', function() {
				$girl.addClass("walk-stop").removeClass("girl-weep");
				callback();
				dfd.resolve();
			});
			return dfd;
		},
		hug: function() {
			$girl.addClass("girl-hug").addClass("walk-run");
		}
	};
	var carousel = new Carousel($carousel, {
		//相对index.html的路径，而非pageB.js的路径
		imgUrls: [
			"img/carousel/3.png",
			"img/carousel/2.png",
			"img/carousel/1.png"
		],
		videoUrls: [
			"img/carousel/1.mp4",
			"img/carousel/2.mp4",
			"img/carousel/3.mp4"
		]
	});
	
	boyAction.walk().then(function() {
		boyAction.stopWalk();
	}).then(function() {
		return girlAction.standUp();
	}).then(function() {
		return girlAction.walk();
	}).then(function() {
		return girlAction.stopWalk();
	}).then(function() {
		return boyAction.unwrapp();
	}).then(function() {
		carousel.visibleSpinner();
		girlAction.choose();
		return carousel.run(0);
	}).then(function() {
		girlAction.choose();
		return carousel.run(1);
	}).then(function() {
		girlAction.choose();
		return carousel.run(2);
	}).then(function() {
		carousel.unvisibleSpinner();
		return girlAction.weepWalk(function() {
			girlAction.hug();
		});
	}).then(function() {
		var dfd = $.Deferred();
		setTimeout(function() {
			boyAction.strip(1);
		}, 1000);
		setTimeout(function() {
			boyAction.strip(2);
		}, 2000);
		setTimeout(function() {
			boyAction.strip(3);
		}, 3000);
		setTimeout(function() {
			boyAction.strip(4);
		}, 4000);
		setTimeout(function() {
			dfd.resolve();
		}, 4100);
		return dfd;
	}).then(function() {
		boyAction.hug();
	});
	
//	$("button").on("click", function() { //要注意避免多次实例化，因为会对click事件进行多次绑定。
//		carousel.run(0).then(function() {
//			return carousel.run(1);
//		}).then(function() {
//			return carousel.run(2);
//		});
//	});
}