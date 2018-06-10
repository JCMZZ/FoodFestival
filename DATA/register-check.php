<?php
require("init.php");
function fetchRow($a){
	global $conn;
	return	mysqli_fetch_row(mysqli_query($conn,$a));
}
@$uname=$_REQUEST['uname'];
@$phone=$_REQUEST['phone'];
@$email=$_REQUEST['email'];
$unameSql="SELECT uname FROM j_user WHERE uname='$uname'";
$phoneSql="SELECT phone FROM j_user WHERE phone='$phone'";
$emailSql="SELECT email FROM j_user WHERE email='$email'";
$checkArr=[
	"uname"=>null,
	"phone"=>null,
	"email"=>null
];
if($uname!=null)
$checkArr["uname"]=fetchRow($unameSql);
if($phone!=null)
$checkArr["phone"]=fetchRow($phoneSql);
if($email!=null)
$checkArr["email"]=fetchRow($emailSql);
echo json_encode($checkArr);
?>