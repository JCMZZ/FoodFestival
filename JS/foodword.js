/*排行榜 背景*/
(()=>{
	var li=$("ul li.ranking-item:gt(2)");
	li.css("background","#f1f1f1");
	var b=$("ul li.ranking-item:gt(2) b");
	b.css("color","#ff8242");
	var fWidth=parseFloat($("ul.ranking-list").width());
	var lis=$("ul li.ranking-item");
	var Length=lis.length;
	for(var i=1;i<Length;i++){
		var bgWidth=fWidth-i*12;
		$(lis[i]).css("width",bgWidth+"px");
	}
})();
/*定点固定定位*/
(()=>{
	var fixed=$("div.cooking-fixed");
	setTimeout(()=>{
		var fh=fixed.height();
		var h=parseFloat($("#header").height());
		var leave=fixed.offset().top+h;
		var f=$("#footer").offset().top+h-fh-20;
		var totalh=$("div.food-news div.row div.col-xs-12:first-child").height()-fh;
		$(window).scroll(function(){
			var wd=$(window).scrollTop()+h;
			if(wd>=leave){
				fixed.addClass("cooking-tool-fixed");
			}else{
				fixed.removeClass("cooking-tool-fixed");
			}
			if(f<wd){
				fixed.addClass("cooking-tool-relative")
				.css("top",totalh);
			}else{
				fixed.removeClass("cooking-tool-relative")
				.css("top","");
			}
		})
	},2000);
})();
/*旅游攻略位移*/
(()=>{
	var imgs=$("div.advertising-imgs");
	imgs.on("mouseover",".col-xs-12",function(){
		$(this).find(".advertising-translate").css("top",0);
	})
	.on("mouseout",".col-xs-12",function(){
		$(this).find(".advertising-translate").css("top",-210);
	})
})();