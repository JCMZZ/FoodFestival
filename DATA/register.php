<?php
require('init.php');
@$uname=$_REQUEST['uname'];
@$upwd=$_REQUEST['upwd'];
@$phone=$_REQUEST['phone'];
@$email=$_REQUEST['email'];
@$internet=$_REQUEST['internet'];
@$gender=$_REQUEST['gender'];
$isDel=1;
if($uname=='' || $upwd==''|| $phone=='' || $email=='' || $gender=='')
exit;
$sql="INSERT INTO j_user VALUES
(NULL,'$uname','$upwd','$gender','$email','$phone','$internet',$isDel)";
echo registerCheck($sql);
?>