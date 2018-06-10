//更改用户名
(()=>{
	var user=sessionStorage.getItem("user");
	if(user===null){
		$(".logon li:last-child a").text("登录");
	}else{
		$(".logon li:last-child a").text(user);
	}
})();
// 下拉菜单
(()=>{
	var menu1=$("[data-list=menu]");
	menu1.mousemove(()=>{
		$("[data-menu=menu]").addClass("blk");
	})
	.siblings().mousemove(()=>{
		$("[data-menu=menu]").removeClass("blk");
	})
	var menus=$("[data-menu=menu]");
	menus.mouseleave(()=>{
		$("[data-menu=menu]").removeClass("blk");
	})
})();
(()=>{
	var menu=$("[data-list=eat]");
	menu.mousemove(()=>{
		$("[data-menu=menu1]").addClass("blk");
	})
	.siblings().mousemove(()=>{
		$("[data-menu=menu1]").removeClass("blk");
	})
	var menus=$("[data-menu=menu1]");
	menus.mouseleave(()=>{
		$("[data-menu=menu1]").removeClass("blk");
	}) 
})();
//食达人变色
(()=>{
	$("[data-crown=crown]").mouseover(function(){
		$(this).addClass("crown");
	})
	.mouseout(function(){
		$(this).removeClass("crown");
	})
})();
// 轮播驱动
(()=>{
	var arr=["今日早餐推荐：香喷喷的早餐，是起床最大的动力",
	"今日午餐推荐：下饭好菜，上桌就后悔米饭做少了",
	"今日下午茶推荐：果蔬下午茶，吃着就是有营养",
	"今日晚餐推荐：晚饭这样做，省时又美味",
	"今日夜宵推荐：“烤”出来的好味道，享受夜宵食光"];
	var items=$("[data-items=move]");//获取移动项目
	var recommend=$("[data-recommend=recommend]");//获取推荐条目
	recommend.text(arr[0]);
	var itemsWidth=parseFloat(items.css("width"));//获取项目宽度
	//获取移动起点start
	var wiw=parseFloat($(".main").css("width"));//获取视口宽度
	var start=parseFloat(itemsWidth-(wiw-itemsWidth)/2);//动画起始点
	items.css("right",start);
	//触发事件元素
	var meters=$("[data-meters=meter]");
	//文字淡入淡出
	function rec(){
		var rec=$(".no-no").index(".timer-items")-1;
		recommend.fadeOut(function() {
		  recommend.text(arr[rec]).fadeIn();
		});
	}
	//绑定事件显示文字
	meters.hover(function(){
		$(this).find(".no").css("opacity",1);
		// $("div.no-no div.pointer").css("opacity",1);
		$("div.no-no div.pointer").css("opacity",1);
	},function(){
		$(this).find(".no").css("opacity",0);
		$("div.no-no div.pointer").css("opacity",0);
	})//绑定事件移动图片
	.on("mouseover",".this",function(e){
		$("div.no-no div.pointer").removeClass("z-z-index");
		var this1=$(e.target);
		var prev=$(".no").prev().prev();
		var next=$(".no").next().next();
		if(this1[0]===prev[0]||this1[0]===next[0]){
			$(e.target).css("opacity",1)
				.addClass("no").siblings(".this")
				.removeClass("no");
			$(e.target).siblings(".this").css("opacity",0);
				var index=parseInt($(this).index(".this"));
				var nu=index+2;
				var bitems=$(".timer-items:nth-child("+nu+")");
		   bitems.addClass("no-no").siblings().removeClass("no-no");
		   items.css("right",start+index*itemsWidth);
		  $("div.no-no div.pointer")
				.parent().siblings().find("div.pointer")
				.css("opacity",0);
		}
		rec();
	})
	$(".window").on("click",".no-no>.b-l",function(e){
		var nthis=$(e.target).parent();
		var add=parseInt(nthis.index(".timer-items"));
		var length=$(".timer-items").length;
		if(add==length-2){return;}
		$(".this:eq("+add+")").css("opacity",1)
			.addClass("no").siblings(".this")
			.removeClass("no");
		$(".this:eq("+add+")").siblings(".this").css("opacity",0);
		items.css("right",start+add*itemsWidth);
		 nthis.next().addClass("no-no").siblings().removeClass("no-no");
	    $("div.no-no div.pointer")
			.parent().siblings().find("div.pointer")
			.css("opacity",0);
		rec();
	})
	.mouseout(()=>{
		$("ul.meters .no").css("opacity",0);
		$("div.no-no div.pointer").css("opacity",0);
	})
	$(".window").on("click",".no-no>.b-r",function(e){
		var nthis=$(e.target).parent();
		var add=parseInt(nthis.index(".timer-items"))-1;
		var length=$(".timer-items").length;
		console.log(add);
		if(add==0){return;}
		$(".this:eq("+add+")").css("opacity",1)
			.addClass("no").siblings(".this")
			.removeClass("no");
		$(".this:eq("+add+")").siblings(".this").css("opacity",0);
		items.css("right",start+add*itemsWidth-itemsWidth);
		nthis.prev().addClass("no-no").siblings().removeClass("no-no");
	    $("div.no-no div.pointer")
			.parent().siblings().find("div.pointer")
			.css("opacity",0);
		rec();
	})
		var fwiw=(parseFloat($(".main").css("width"))-itemsWidth)/2;
		var itemsHeight=parseFloat(items.css("height"));
		var hrecommend=parseFloat(recommend.css("height"));
 		$(".float-float")
 		.css({"width":fwiw,"height":itemsHeight,"top":hrecommend});
})();
//轮播一
(()=>{
	var b1=$("[data-b1=move]");//移动对象
	//获取移动距离
	var width=parseFloat($("li.b1-items").css("width"))+0.25;
	var move=0;var n=0;var timer=null;
	function Css(n){
		$("li.b1-items:eq("+n+")").addClass("b1-bg-active")
		.siblings().removeClass("b1-bg-active");
		$(".b1-list-item:eq("+n+")").addClass("b1-active")
		.siblings().removeClass("b1-active");
	}
		function Move(n,move){
			var timer=setInterval(
				function(){
					 move+=width;
					 b1.addClass("transition");
					if(move>width*3){
						setTimeout(()=>{
							b1.removeClass("transition");
							b1.css("left",0);
							// console.log(2);
						},0);
						setTimeout(()=>{
							// console.log(1);
						    b1.addClass("transition");
							b1.css("left",width*-1);
							move=width; 
						},50);
					}else{
					b1.css("left",move*-1);
					}
					n++;
					var lengths=$(".b1-items").length-1;
					if(n>=lengths){
						n=0;
					}
					Css(n);
			},5000);
			return timer;
		}
		var timer=Move(n,move);
		$(".b1-list-bottom").on("mouseover",".b1-list-item",function(){
			clearInterval(timer);
			timer=null;
			b1.removeClass("transition");
			var thi=$(this).index();
			Css(thi);
			var move=thi*width*-1;
		    b1.css("left",move);
		}).on("mouseout",".b1-list-item",function(){
			b1.addClass("transition");
			var thi=$(this).index();
			var move=thi*width;
			timer=Move(thi,move);
		})
		$("[data-b1=group]").hover(function(){
			clearInterval(timer);
			timer=null;
		},function(){
			var start=parseFloat(b1.css("left"))*-1;
			var active=$(".b1-active").index();
			timer=Move(active,start);
		})
		$("[data-bl=left]").click(function(){
		    var left=parseFloat(b1.css("left"))-width;
		    if(left<=width*-3){
		    	return;
		    	left=0;
		    }
			b1.css("left",left)
			var active=$(".b1-active").index();
			active++;
			var lengths=$(".b1-items").length-1;
			if(active==lengths){active=0;}
			Css(active);
		})
		$("[data-br=right]").click(function(){
		    var right=parseFloat(b1.css("left"))+width;
		    // console.log(right);
		 	if(right>0){
		 		return;
			right=width*-2;	
			}
			b1.css("left",right);
		    var active=$(".b1-active").index();
		    active--;
		    var lengths=$(".b1-items").length-1;
		    // console.log(n)
		    if(active==lengths){active=0;}
		    Css(active);
		})
})();
// 食材列表
(()=>{
	var food=$("[data-food=food]");
	food.on("mouseenter","li",function(){
		var index=$(this).index();
		$(".food-list:eq("+index+")").addClass("food-list-block")
		.siblings().removeClass("food-list-block");
		$(this).children().addClass("material")
		.parent().siblings().children().removeClass("material");
	})
})();
/*轮播二*/
/*位移*/
(()=>{
	var height=parseFloat($(".cli-b").css("height"));
	$(".cli-window").css("height",height);
	$(".cli-wi").hover(function(){
		$(this).css("transform","translateY("+(height*-1)+"px)");
	},function(){
		$(this).css("transform","translateY(0)");
	})
})();
(()=>{
	/*title 数组*/
	var arr=[
			"一周最热门菜谱",
			"今日最热门菜谱",
			"每小时最热门菜谱",
			"最新热门菜谱"
			];
			// console.log(arr[3]);
		//移动对象
	var ul=$("[data-cook=list]");
		//项目个数
	var ulength=$(".cook-items").length-1;
	// console.log(length);
		//移动距离
	var width=parseFloat($(".cook-items").css("width"))+0.25;
		//标题元素
	var title=$("[data-cook=title]");
	    title.text(arr[3]);
		//选择元素
	var recommend=$("[data-cook=recommend] a:not(:first)");
	// console.log(recommend);
	var n=recommend.length-1,move=0,timer=null;
	//面包屑导航
	function bgcl(n){
		var thi=$("[data-cook=recommend] a:not(:first):eq("+n+")");
		thi.addClass("recommend").siblings()
		.removeClass("recommend");
		//title标题
		title.fadeOut(1000,function() {
		  title.text(arr[n]).fadeIn(1000);
		});
	}
	function b2Move(n,move){
		var timer=setInterval(function(){
			move+=width;
			ul.addClass("transition2");
			if(move>ulength*width){
				setTimeout(()=>{
					ul.removeClass("transition2");
					ul.css("left",0);
				},0)
				setTimeout(()=>{
					ul.addClass("transition2");
					move=width;
					ul.css("left",(width*-1));
				},50);
			}else{
				ul.css("left",move*-1);
			}
			n--;
			if(n<0){
				n=recommend.length-1;
			}
			bgcl(n);
		},80000);
		return timer;
	}
	var timer=b2Move(n,move);
	$("[data-cook=recommend]").on("mouseover","a.b1",function(){
		clearInterval(timer);
		var thindex=$("span.b1-link a.b1").index($(this));
		/*当前所到位置*/
		var index=Math.abs(thindex-ulength)-1;
		/*当前位置*/
		var lef=Math.ceil(Math.abs(parseInt(ul.css("left")))/width);
		if(thindex==2&&lef==ulength)
			lef+=1;
		if(lef==ulength){
			return;
		}else{
		ul.addClass("transition2");
		var m=index*-width;
		ul.css("left",m);
		bgcl(thindex);
		}
	}).on("mouseout","a.b1",function(){
		clearInterval(timer);
		var thindex=$("span.b1-link a.b1").index($(this));
		var index=Math.abs(thindex-ulength)-1;//2
		var m=index*width;
		timer=b2Move(thindex,m);
	})
	$("[data-cook=left]").click(function(){
		clearInterval(timer);
		ul.addClass("transition2");
		var thindex=$("span.b1-link a.b1").index($("a.recommend"))-1;
		var index=Math.abs(thindex-ulength)-1;
		var m=index*-width;
		if(thindex<0){
			thindex=ulength;
			m+=width;
		}
		ul.css("left",m);
		bgcl(thindex);
	})
	$("[data-cook=right]").click(function(){
		clearInterval(timer);
		ul.addClass("transition2");
		var thindex=$("span.b1-link a.b1").index($("a.recommend"))+1;
		var index=Math.abs(thindex-ulength)-1;
		var m=index*-width;
		if(thindex==ulength){
			thindex=ulength;
			m=0;
		}
		ul.css("left",m);
		bgcl(thindex);
	})
	$("div.cook-food div.b1-group").mouseout(function(){
		clearInterval(timer);
		var thindex=$("span.b1-link a.b1").index($("a.recommend"));
		var index=Math.abs(thindex-ulength)-1;
		var m=index*width;
		timer=b2Move(thindex,m);
	})
})();
/*健康新闻*/
(()=>{
	var parent=$(".health-news");
	var imgW=parseFloat($("ul.health-img-list li").css("width"));
	parent.on("mouseenter",".health-text li",function(){
		$(this).addClass("hhover").siblings().removeClass("hhover");		
		var index=$(this).index();
		var left=index*-imgW;
		$(this).parent().prev().children().css("left",left);
	});
	setTimeout(()=>{
	var height=parseFloat($("div.health-imgs").css("height"))/3+"px";
	$("ul.health-text li").css("lineHeight",height);
	},1500);
})();
/*footer-fiexd*/
(()=>{
	$("[data-fixed=footer]").hover(function(){
		$(this).css("bottom",0);
	},function(){
		$(this).css("bottom",-55);
	})
	.on("click","button",function(){
		var text=$(this).html();
		if(text=="点击显示"){
			$(this).text("点击隐藏");
		}else{
			$(this).text("点击显示");
		}
		$(this).parent().toggleClass("toggleb");
	})
	$(window).scroll(function(){
	var leave=$(window).scrollTop();
		if(leave>700){
			$("[data-fixed=footer]").css("bottom",-55);
			$("a.fixed-top-img").css("bottom",14);
		}else{
			$("a.fixed-top-img").css("bottom",-45);
			$("[data-fixed=footer]").css("bottom",-70);
		}
	})
})();
