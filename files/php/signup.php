<?php
error_reporting(0);
include("connection.php");
//generate random string
function generateRandomString($length = 30) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[random_int(0, $charactersLength - 1)];
    }
    return $randomString;
}
//ends


//database working started
$name =$_POST['name'];
$phone=$_POST['phone'];
$pass =$_POST['pass'];
$img  =$_FILES["image"];
// print_r($img);  <-prints array
$filename = $img["name"];
$tempname = $img["tmp_name"];
$img_name = generateRandomString(16).".jpg";

move_uploaded_file($tempname,"../../image/database_img/".$img_name); //the file upload to tempname location which this move to our desktop location


$sql = "INSERT INTO `logindata`(`img`,`name`, `phone`, `password`) VALUES ('$img_name','$name','$phone','$pass')";

$result = mysqli_query($con , $sql);
if($result){
    header('location:login.php');
}
else{
    echo "<br>call pritam to turn on server";
}



?>