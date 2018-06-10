(()=>{
	function modal(txt,isFade){
		if(isbutton)
		return;
		if($("#uname").val() !='' && $("#upwd").val()=='')
		txt='请确保密码不能为空！';
		$(".from>[type]").attr("disabled","disabled");
		var textP=$("[data-text=warning]");
		var modal=$(".modal-diractive");
		if(!isFade){
			textP.html(txt);
			modal.fadeIn(500);
		}else{
			modal.fadeOut(500);
		}
		$("div.warning button").click(()=>{
			modal.fadeOut(500);
			$(".from>[type]").attr("disabled",false);
			if($("#uname").val()==''){
				$("#uname").focus();
				return;
			}
			if($("#upwd").val()=='')
			$("#upwd").focus();
		})
	}
	var isbutton=false;
	$(".from button:last").hover(()=>{
		isbutton=true;
	},()=>{
		isbutton=false;
	})
	$(".from button:last").click(()=>{
		location.href='index.html';
	})
	function checkLogin(){
		var uname=$("#uname").val(),
			upwd=$("#upwd").val();
		$.ajax({
			type:'POST',
			url:'../DATA/login.php',
			data:{uname,upwd},
			success(data){
				if(data.code){
					sessionStorage.clear();
					sessionStorage.setItem("user",uname);
					location.href='index.html';
				}else{
					modal('登录失败！请重新验证用户名或密码...',false);
					$("#uname").focus();
				}
			},
			error(){
				modal('网络错误！请重试...',false);
			}
		})
	}
	$(".from button:first").click(checkLogin);
	var uname=$("#uname"),
		upwd=$("#upwd");
	uname.blur(()=>{
		if($("#uname").val()=='')
		modal('请确保用户名不能为空！',false);
	})
	upwd.blur(()=>{
		if($("#uname").val() !='' && $("#upwd").val()=='')
			modal('请确保密码不能为空！',false)
	});
})();