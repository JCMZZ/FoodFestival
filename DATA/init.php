<?php
header("Content-type:application/json;charset=utf-8");
$conn=mysqli_connect('127.0.0.1','root','','jiang',3306);
mysqli_query($conn,"SET NAMES UTF8");
function row($a){
	global $conn;
	return	json_encode(mysqli_fetch_row(mysqli_query($conn,$a)));
}
function rows($a){
	global $conn;
	return	json_encode(mysqli_fetch_rows(mysqli_query($conn,$a)));
}
function assoc($a){
	global $conn;
	return	json_encode(mysqli_fetch_all(mysqli_query($conn,$a),MYSQLI_ASSOC));
}
function loginCheck($a){
	global $conn;
	if(mysqli_fetch_row(mysqli_query($conn,$a))==null){
		echo '{"code":0,"msg":"失败"}';
	}else{
		echo '{"code":1,"msg":"成功"}';
	}
}
function registerCheck($a){
	global $conn;
	if(mysqli_query($conn,$a)){
		echo '{"code":1,"msg":"成功"}';
	}else{
		echo '{"code":0,"msg":"失败"}';
	}
}
?>