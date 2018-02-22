var instanceX;
var instanceY;

function BoyWalk() {
	var container = $("#content");
	var visualWidth = container.width();
	var visualHeight = container.height();

	var $boy = $('#boy');
	var boyWidth = $boy.width();
	var boyHeight = $boy.height();

	$boy.css({
		top: pathY - boyHeight + 25
	});

	function pauseWalk() {
		$boy.addClass('pauseWalk');
	}

	function restoreWalk() {
		$boy.removeClass('pauseWalk');
	}

	function slowWalk() {
		$boy.addClass('slowWalk');
	}


	function startRun(options, runTime) {
		var dfdPlay = $.Deferred();
		restoreWalk();
		$boy.transition(
			options,
			runTime,
			'linear',
			function() {
				dfdPlay.resolve();
			}
		);
		return dfdPlay;
	}

	function walkRun(time, dist, disY) {
		time = time || 3000;
		slowWalk();
		var d1 = startRun({
			'left': dist + 'px',
			'top': disY ? disY : undefined
		}, time);
		return d1;
	}

	function walkToShop(runTime) {
		var defer = $.Deferred();
		var doorObj = $('.door');
		var offsetDoor = doorObj.offset();
		var doorOffsetLeft = offsetDoor.left;
		var doorOffsetTop = offsetDoor.top;
		var offsetBoy = $boy.offset();
		var boyOffsetLeft = offsetBoy.left;
		var boyOffsetTop = offsetBoy.top;
		var boyMiddle = $boy.width() / 2;
		var doorMiddle = doorObj.width() / 2;
		var doorTopMiddle = doorObj.height() / 2;
		instanceX = (doorOffsetLeft + doorMiddle) - (boyOffsetLeft + boyMiddle);
		instanceY=boyOffsetTop+boyHeight-doorOffsetTop+doorTopMiddle;
		var walkPlay = startRun({
			transform: 'translateX(' + instanceX + 'px),scale(0.5,0.5)',
			opacity: 0.1
		}, runTime);
		walkPlay.done(function() {
			$boy.css({
				opacity: 0
			})
			defer.resolve();
		})
		return defer;
	}

	function walkOutShop(runTime) {
		var defer = $.Deferred();
		restoreWalk();
		var walkPlay = startRun({
			transform: 'translateX(' + instanceX + 'px),scale(1,1)',
			opacity: 1
		}, runTime);
		walkPlay.done(function() {
			defer.resolve();
		});
		return defer;
	}

	function talkFlower() {
		var defer = $.Deferred();
		setTimeout(function() {
			$boy.addClass('slowFlowerWalk');
			defer.resolve();
		}, 1000);
		return defer;
	}

	function calculateDist(direction, proportion) {
		return (direction == "x" ? visualWidth : visualHeight) * proportion;
	}
	
	return {
		walkTo: function(time, proportionX, proportionY) {
			var distX = calculateDist('x', proportionX);
			var distY = calculateDist('y', proportionY);
			return walkRun(time, distX, distY);
		},
		toShop: function() {
			return walkToShop.apply(null, arguments);
		},
		outShop: function() {
			return walkOutShop.apply(null, arguments);
		},
		stopWalk: function() {
			pauseWalk();
		},
		setColoer: function(value) {
			$boy.css('background-color', value);
		},
		getWidth: function() {
			return $boy.width();
		},
		resetOriginal: function() {
			this.stopWalk();
			$boy.removeClass('slowWalk slowFlowerWalk');
			$boy.addClass('boyOriginal');
		},
		rotate: function(callback) {
			restoreWalk();
			$boy.addClass('boy-rotate');
			if(callback) {
				$boy.on(animationEnd, function() {
					callback();
					$(this).off();
				});
			}
		},
		talkFlower: function() {
//		return talkFlower();
		$boy.addClass('slowFlowerWalk');
		}
	}
}