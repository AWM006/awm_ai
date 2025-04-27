<?php
session_start();
include("../php/connection.php");
error_reporting(0);

    $_SESSION['session_id']=$_GET['id'];
    $_SESSION['session_img']=$_GET['img'];
    header('location:../../index.php');
?>