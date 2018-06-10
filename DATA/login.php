<?php
require("init.php");
@$uname=$_REQUEST['uname'];
@$upwd=$_REQUEST['upwd'];
$sql="SELECT * FROM j_user WHERE uname='$uname' AND upwd='$upwd'";
echo loginCheck($sql);
?>