(function($){
	function loadScript(URL){
		$("head").append('<script id="hitokoto_loader" src="' + URL + '" />');
	}
	function setIntervalEvent(Event,Interval){
		setInterval(Event,Interval);
	}
$.hitokoto = function(selector,options){
	var self = this;
	var API = 'http://api.hitokoto.us/rand?encode=jsc&charset=utf-8';
	var interval = options && options.interval || 5000;
	this.displayHitokoto = function(Hitokoto){
		console.log("You get a new Hitokoto:" + Hitokoto.hitokoto);
		console.log($(selector),options);
		var author  = Hitokoto.author;
		var cat     = Hitokoto.cat;
		var catname = Hitokoto.catname;
		var date    = Hitokoto.date;
		var id      = Hitokoto.id;
		var source  = Hitokoto.source;
		var content = Hitokoto.hitokoto;
		var like    = Hitokoto.like;
		var desc = "「" + content + "」;Author : " + author + " @ " + date + ";Category : " + catname;
		$(selector).children().fadeOut(options.speed || 'slow',function(){
			$(selector).html($("<span></span>").attr("title",desc));
			$(selector).children('span').append($("<a>" + content + "</a>")
				               .attr({"href":"http://hitokoto.us/view/" + id,"target":"_blank"})
				               .css("display","none")
				               .animate({
				                   opacity: 1},
				                   0, function() {
				                       $(this).fadeIn(options.speed || 'slow');
			                       })
				               );
			$("head").find('#hitokoto_loader').remove();
		});
	}
	this.init = function(){
		window.hitokoto = this.displayHitokoto;
		$(selector).html('<span></span>');
		console.log(API,interval);
		setInterval(function(){
			loadScript(API);
		},interval);
		loadScript(API);//由于setInterval不是立即执行 所以第一次手动执行
	}
	if (!window.hitokoto){
		this.init();
	}
}
}(jQuery));