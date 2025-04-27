<?php
//make connection to server
$server    = "localhost";
$username  = "root";
$password  = "";
$dbname    = "data";

$con = mysqli_connect($server , $username , $password , $dbname);

if(!$con){
    echo "not connected";
}
//connction setup done
?>