var Observer = (function(slice){

	function bind(event, fn){
		var events = this.events = this.events || {};
		var parts = event.split(/\s+/);
		var i=0;
		var num = parts.length;
		var part;
		
		if(events[event] && events[event].length){
			return this;
		}
		for(;i<num;i++){
			events[(part=parts[i])]=events[part]||[];
			events[part].push(fn);
		}
		return this;
	}
	function one(event, fn){
		this.bind(event,function fnc(){
			fn.apply(this, slice.call(arguments));
			this.unbind(event,fnc);
		});
	}
	function unbind(event, fn){
		var events = this.events;
		var eventName;
		var i;
		var parts;
		var num;
		
		if(!events){
			return;
		}
		parts = event.split(/\s+/);
		for(i=0,num=parts.length;i<num;i++){
			if((eventName=parts[i]) in events !== false){
				events[eventName].splice(event[eventName].indexOf(fn),1);
				if(!event[eventName].length){
					delete events[eventName];
				}
			}
		}
		return this;
	}
	
	function trigger(event){
		var events = this.events;
		var i;
		var args;
		var flag;
		
		if(!events || event in events === false){
			return;
		}
		
		args = slice.call(arguments,1);
		for(i=events[event].length-1;i>=0;i--){
			flag=events[event][i].apply(this,args);
		}
		return flag;
	}
	
	return function(){
		this.on = this.subscribe = bind;
		this.off = this.unsubscribe = unbind;
		this.trigger = this.publish = trigger;
		this.one = one;
		return this;
	}
})([].slice);

