//表单
(()=>{
//加载后为获取焦点的输入框添加样式
	$(window).ready(()=>{
		setTimeout(()=>{
			$(".group input:focus").addClass("group-hover");
		},200);
	})
//自定义函数切换输入框更换样式styleClass
	function styleClass(e){
		//9为tab健编码   e.type获取事件源类型
		if(e.which!=9 && e.type!="click")
			return;
		$(this).addClass("group-hover");
		$(this).parent().siblings().children('input')
		.removeClass("group-hover");
	}
	$(".body").on("click","input",styleClass)
	$(".body").on("keyup","input",styleClass);
//Label标签文字动态切换函数textMove
	function textMove(){
		var reg=/请输入/;
		var label=$(this).prev();
		if(reg.test($(this).prev().text())){
			lval=label.text();
			var Lval=label.text().slice(3);
		}else{
			Lval=label.text();
			lval="请输入"+Lval;
		}
		if($(this).val()!=''){
			label.addClass("text-move");
			label.text(Lval);
		}else{
			label.removeClass("text-move");
			label.text(lval);
			Lval='';
		}
	}
	$(".group :input").on("input propertychange",textMove)
//模态框提示->组件值格式验证->表单验证->发送异步请求->注册成功
//模态警告框函数model
	var isbutton=false;//阻止触发表单的blur验证事件
	var isPass=false;//阻止重复触发模态框
	//自定义模态框 参数 text:提示文本 tName:模态框触发时当前元素id值
	function model(text,tName){
		isPass=true;
		var warning=$("[data-warning=warning]");
			$("[data-text=warning]").text(text);
			$(".body .group>input,.body button").attr("disabled",true);
			warning.fadeIn(500);
			$(".warning-model .warning>button").focus();
			console.log(isbutton);
			$(".warning-model .warning>button").focus(()=>{
				isbutton=true;
			});
		$(".warning-model button").click(()=>{
			console.log(isbutton);
			warning.fadeOut(500,()=>{
				$("div.warning p").prev().text("提　　示");
				isbutton=false;
			});
			isPass=false;
			$(".body .group>input,.body button").attr("disabled",false);
			$("#"+tName).focus().addClass("group-hover")
			.parent().siblings().children('input').removeClass("group-hover");
		})
	}
//点击button按钮和协议时，阻止表单验证的blur事件
	$(".body button:last,.warning-model button,.checkbox strong,#agreement").hover(()=>{
		isbutton=true;
	 },()=>{
		isbutton=false;
	})
//跳转首页
	$(".body button:last").click(()=>{
		location.href='index.html';
	})
//自定义函数发送异步请求验证数据库是否重复checkData 调用 model
	//参数 object:php请求参数对象 
	//tName:被验证的元素id值->数据库字段值
	//error:发生错误时提示文本
	function checkData(object,tName,error){
		$.ajax({
			type:"POST",
			url:"../DATA/register-check.php",
			data:object,
			success:(data)=>{
				if(!(eval('data.'+tName)==null)){
					model(error,tName);
				}
			},
			error:()=>{}
		})
	}
//自定义函数实现表单验证checkInput 调用 model checkData 函数
	//参数 elt:被验证的当前元素id值->数据库字段值
	//isWarning:布尔值，验证是否为空/true触发，false不触发
	//spaceE:当数据为空时提示信息文本
	//reg:正则表达式/验证格式
	//formatE:格式不正确时提示信息文本
	//isGet:布尔值，是否发送请求/true触发，false不触发
	//repeatE:数据重复时提示信息文本
	function checkInput(elT,isWarning,spaceE,reg,formatE,isGet,repeatE,){
		console.log(isbutton);
		//阻止重复触发事件
		if(isbutton||isPass)return;
		var val=$("#"+elT).val();
		//验证是否为空
		if(val=='' && isWarning){
			 model(spaceE,elT);
			 return;
		}
		//验证输入数据是否符合格式
		if(val.search(reg)==-1 && val!=''){
			model(formatE,elT);
			return;
		}
		//输入数据是否与数据库数据重复
		if(isGet){
			obj={};
			obj[elT]=val;
			checkData(obj,elT,repeatE);
		}
	}
//用户名uname
	function checkUname(){
		var elT='uname';
		var spaceE='请确保用户名不得为空！！！';
		var reg=/^[A-Za-z][\w\u4e00-\u9fa5]{2,5}$/;
		var formatE="注意 :用户名必须是以大写或小写字母开头，并且长度最少三个字符至多六个字符的格式";
		var repeatE="ERROR :用户名已注册请重新编写用户名！！！";
		checkInput(elT,true,spaceE,reg,formatE,true,repeatE)
	}
	$("#uname").blur(checkUname);
//密码upwd
	function checkUpwd(){
		var elT='upwd';
		var spaceE='请确保密码不得为空！！！';
		var reg=/^\d{6}$/;
		var formatE="注意 :密码必须是纯数字并且长度为六的格式";
		checkInput(elT,true,spaceE,reg,formatE,false,'')
	}
	$("#upwd").blur(checkUpwd);
//确认密码checkUpwd
	function ckCheckUpwd(){
		//阻止重复触发事件
		if(isbutton||isPass)return;
		if($("#check-upwd").val()!=$("#upwd").val()){
			var text="请确保密码与确认密码一致";
			model(text,'check-upwd');
		}
	}
	$("#check-upwd").blur(ckCheckUpwd);
//指定密码和确认密码输入顺序
	$("#check-upwd").one("keydown",function(){
		var upwd=$("#upwd").val();
		if(upwd==''){
			model('请先填写密码后再填写确认密码！！！','upwd');
			return;
		}
	})
//电话phone
	function checkPhone(){
		var elT='phone';
		var spaceE='请确保不得为空！！！';
		var reg=/^(\+86)?(13|15|17|18)\d{9}$/;
		var formatE="注意 :电话为前缀(+86)或不加前缀(+86)的十一位整数数值，例如:+8613*********或13*********，请确保符合格式";
		var repeatE="ERROR :已注册过的电话！请确保电话未被注册！！！";
		checkInput(elT,true,spaceE,reg,formatE,true,repeatE)
	}
	$("#phone").blur(checkPhone);
//邮箱email
	function checkEmail(){
		var elT='email';
		var spaceE='请确保不得为空！！！';
		var reg=/^\w+@\w+(\.\w+){1,2}$/;
		var formatE="注意 :请确保符合Email格式！！！例如:***@Gmail.com";
		var repeatE="ERROR :已注册过的Email！请确保Email未被注册！！！";
		checkInput(elT,true,spaceE,reg,formatE,true,repeatE);
	}
	$("#email").blur(checkEmail);
//网址internet
	function checkInternet(){
		var elT='internet';
		var reg=/^https?:\/\/www\..+?(\.\w+){1,2}$/ig;
		var formatE="注意 :请确保符合Internet格式！！！例如:http://www.baidu.com";
		checkInput(elT,false,'',reg,formatE,false,'');
	}
	$("#internet").blur(checkInternet);
//性别gender
	$("#checkGender").on("change","input",function(){
		if($(this).is(":checked")){
			$(this).siblings().prop("checked",false);
		}
	})
//协议
	$(".checkbox strong").click(function(){
		var elT=$("input.group-hover").attr("id")
		var text=`Lorem ipsum dolor sit amet, consectetur 
			adipisicing elit. Deserunt cupiditate fugiat ducimus 
			saepe! Architecto nam dolore vel, tempore voluptate 
			officiis aperiam repudiandae laudantium blanditiis 
			error quia, reiciendis, soluta obcaecati eos.
			Lorem ipsum dolor sit amet, consectetur adipisicing
			 elit. Autem sint doloremque voluptatem in molestias 
			 voluptatum, enim quasi a cum harum dicta et perspiciatis
		  dolorem, culpa asperiores. Eaque harum quaerat eos. `;
		$("div.warning p").prev().text("协　　议");
		model(text,elT);
	})
   //获取数据向服务器发送请求
//验证表单输入框函数ckInput 调用 model 函数
	function ckInput(){
		var obj={check:true};
		$(".group input").each(function(){
			var th=$(this);
			var id=th.attr("id");
			var val=th.val();
			if( val=='' && id!="internet" ){
			  obj.check=false;
			  var elT= th.prev().text().slice(3);
			  var text="请确保"+elT+"不能为空且格式正确";
			  model(text,id);
			  return false;
			}else{
			  if(id!="check-upwd")
			    obj[id]=val;
			}
		})
		return obj;
	}
//验证表单复选框函数ckCheckBox 调用 model 函数
	function ckCheckBox(){
		var obj={check:false,gender:"*"};
		$("#checkGender input").each(function(){
			if($(this).prop("checked")){
				obj.gender=$(this).val();
			}
		})
		obj.check=$("#agreement").prop("checked");
		if(obj.check==false)
		model("请勾选协议,通过信息验证后！点击注册按钮！","agreement")
		return obj;
	}
//注册发送异步请求函数submitFrom 调用 ckInput ckCheckBox textMove model 函数
	function submitFrom(){
		checkInternet();
		if(isPass) return;
		var postData='';
		var objInput=ckInput();
		var objCheckBox=ckCheckBox();
		if(objInput.check && objCheckBox.check){
			 delete objInput.check;
			 delete objCheckBox.check;
			 postData=$.extend(objInput,objCheckBox);
			 $.ajax({
				type:"POST",
				url:"../DATA/register.php",
				data:postData,
				success(data){
					if(data.code){
		                //如果注册成功清空表单防止注册数据重复
						$(".body .group input").val('');
						$(".checkbox input").prop("checked",false);
						$(".group :input").each(textMove);
						var hintText=`用户名为:　${objInput.uname}`;
						$("div.warning p").prev().text("注册　成功");
						model(hintText,"uname");
					}
				},
				error(){confirm("网络错误请重试！！！")}
			 })
		}
	}
	$(".body button:first").click(submitFrom);
})();

