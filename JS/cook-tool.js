// 滑动列表
(()=>{
	var cookul=$(".cook-list");
	cookul.on("mouseover","li.cook-item",function(){
		var hiddencook=$(this).prev();
		hiddencook.children().addClass("heigthAuto");
		hiddencook.siblings().children('ul.cook-hidden').removeClass("heigthAuto");
	})
	.mouseleave(function(){
		$("ul.cook-hidden").removeClass('heigthAuto');
	})
})();
// detail 放大镜
(()=>{
	var small=$("div.privilege div.cook-small");
	small.mousemove(function(){
		var el=event.pageX;
		var et=event.pageY;
		var sl=$(this).offset().left;
		var st=$(this).offset().top;
		var move=$(this).children('.move');
		var mW=move.width();
		var mH=move.height();
		var newl=el-sl-mW/2;
		var newt=et-st-mH/2;
		var minl=0;
		var maxl=$(this).width()-mW;
		var mint=0;
		var maxt=$(this).height()-mH;
		if(newl<minl) newl=minl;
		if(newl>maxl) newl=maxl;
		if(newt<mint) newt=mint;
		if(newt>maxt) newt=maxt;
		move.css({"top":newt,"left":newl,"display":"block"});
		$(this).next().css("display","block");
		var big=$(this).next().children("img");
		var sW=$(this).width();
		var sH=$(this).height();
		var bl=big.width()*newl/sW;
		var bt=big.height()*newt/sH;
		big.css({"top":-bt,"left":-bl});
	})
	.mouseout(function(){
		var move=$(this).children('.move');
		move.css("display","none");
		$(this).next().css("display","none");
	});
})();
// recommend 更换图片
(()=>{
	function lSum(n,index,i){
		var v=eval('view'+n+'.v'+index)[i].length;
		return v;
	}
	function imgData(n,index){
		var v=eval('obj'+n+'.img'+index);
		return v;
	}
	function hData(vL,vIndex,img,iD){
		var	html="<div class='row'>";
		for(var i=0;i<vL;i++){
			html+=`<div class="col-xs-${vIndex[i]}">
			<img src="../IMG/cook-recommend${img[i+iD]}.jpg" alt=""
			class="img-responsive">
			</div>`;
		}
		html+="</div>";
		return html;
	}
	// 图片数组
	var obj0={
		img1:[11,12,13,14,15,16,17],
		img2:[21,22,23,24,25,26,27],
		img3:[31,32,33,34,35,36,37],
		img4:[41,42,43,44,45,46,47],
		img5:[51,52,53,54,55,56],
		img6:[61,62,63,64,65],
		img7:[71,72,73,74,75,76]
	}
	var view0={
		v1:[[6,3,3],[3,3,3,3]],
		v2:[[6,3,3],[3,3,3,3]],
		v3:[[6,3,3],[3,3,3,3]],
		v4:[[3,3,3,3],[3,3,6]],
		v5:[[6,3,3],[6,3,3]],
		v6:[[6,6],[6,3,3]],
		v7:[[3,3,6],[3,3,6]]
	}
	var obj1={
		img1:[81,82,83,84,85,86],
		img2:[91,92,93,94,95,96],
		img3:[101,102,103,104,105,106],
		img4:[111,112,113,114,115,116],
		img5:[121,122,123,124,125,126,127],
	}
	var view1={
		v1:[[6,3,3],[3,6,3]],
		v2:[[6,3,3],[3,3,6]],
		v3:[[3,3,3,3],[6,6]],
		v4:[[6,6],[3,3,3,3]],
		v5:[[3,3,3,3],[3,3,6]],
	}
	var obj2={
		img1:[131,132,133,134,135,136,137],
		img2:[141,142,143,144,145,146,147,148],
		img3:[151,152,153,154,155,156,157],
	}
	var view2={
		v1:[[6,3,3],[3,3,3,3]],
		v2:[[3,3,3,3],[3,3,3,3]],
		v3:[[3,3,3,3],[3,6,3]],
	}
	var trigger=$("[data-trigger=trigger]");
	trigger.on("mouseenter","li",function(){
			var replace=$(this).parent().parent()
				.siblings("[data-load=load]");
			var recommends=$(this).parent().parent()
				.parent().parent();
			var recIndex=$(".recommends").index(recommends);
			var index=$(this).index()+1;
			var iD=imgData(recIndex,index);
			var vL1=lSum(recIndex,index,0);
			var vL2=lSum(recIndex,index,1);
			var vIndex0=eval('view'+recIndex+'.v'+index)[0];
			var vIndex1=eval('view'+recIndex+'.v'+index)[1];
			var html="";
			html+=hData(vL1,vIndex0,iD,0);
			html+=hData(vL2,vIndex1,iD,vL1);
		    replace.html(html);
		    if(recIndex<2){
			    $(this).addClass('redHover')
			    .siblings().removeClass('redHover');
			}else{
				$(this).addClass('redHover0')
				.siblings().removeClass('redHover0');
			}
	})
})();
// 楼层滚动
(()=>{
	var indexRecommends=$("div.recommends:eq(0)");
	var footer=$("#footer");
	var li=$("div.anchor ul li");
	var mark=1;
	$("div.anchor ul").children().hover(function(){
		$(this).children().fadeIn();
	},function(){
	   $(this).parent()
	   	.children().find(":not('.foucs')").fadeOut();
	})
	li.click(function() {
	    mark = 2;
	    var index = $(this).index();
	    var h = $("div.recommends").eq(index).offset().top; 
	    $('body').animate({
	        scrollTop: h
	    }, 500, function() { 
	        mark = 1
	    })
	    $(this).children().fadeIn().addClass("foucs");
	    $(this).siblings().children().fadeOut().removeClass("foucs");
	});
	$(window).scroll(function(){
		var h=$("div.recommends:eq(2)").height();
		var top=indexRecommends.offset().top;
		var ftop=footer.offset().top-h;
		var wtop=$(window).scrollTop();
		if((wtop+5)>=top&&wtop<=ftop){
			$(".anchor").fadeIn();
		}else{
			$(".anchor").fadeOut();
		}
		var H=$(this).scrollTop()+5;
		var nuL=$("div.recommends").length;
		var index=0;
		for(var i=0;i<nuL;i++){
			if(H/$("div.recommends").eq(i).offset().top >= 1){
				index=i;
				continue;
			}
		}
		if(mark==1){
			li.eq(index).children()
			.fadeIn().addClass("foucs");
			li.eq(index).siblings()
			.children().fadeOut().removeClass("foucs");
		}
	})
})();