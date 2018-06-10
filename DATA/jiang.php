<?php
$conn=mysqli_connect('127.0.0.1','root','','',3306);
$sql="DROP DATABASE IF EXISTS jiang";
mysqli_query($conn,$sql);
$sql="CREATE DATABASE jiang CHARSET=UTF8";
mysqli_query($conn,$sql);
$conn=mysqli_connect('127.0.0.1','root','','jiang',3306);
mysqli_query($conn,"SET NAMES UTF8");
$sql="CREATE TABLE j_user(
	uid INT PRIMARY KEY AUTO_INCREMENT,
	uname VARCHAR(12) NOT NULL DEFAULT '',
	upwd VARCHAR(9) NOT NULL DEFAULT '',
	gender VARCHAR(2) NOT NULL DEFAULT '',
	email VARCHAR(24) NOT NULL DEFAULT '',
	phone CHAR(11)  NOT NULL DEFAULT '',
	internet  VARCHAR(32) NOT NULL DEFAULT '',
	isDel INT 	NOT NULL DEFAULT 1 
)";
mysqli_query($conn,$sql);
$sql="INSERT INTO j_user VALUES
(NULL,'jiang','123456','男','jiang@qq.com','15131910711','http://www.jiang.com',1)";
$result=mysqli_query($conn,$sql);
?>