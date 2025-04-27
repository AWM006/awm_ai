<?php
include("./files/php/connection.php");
session_start();
error_reporting(0);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style/style.css">
</head>
<body>
   <header>
        <div>
            <img src="image/denji.jpeg">
            <a style="color: white;align-self: center;">AWM AI</a>
        </div>
        <a class="time" style="color='white';">10 10 10</a>
        <div class="logsys">
            <?php
                if($_SESSION['session_id']){
                    $location = "files/update_data/update.php?id=".$_SESSION['session_id'];
                
            ?>
                    <img src="./image/database_img/<?php echo $_SESSION['session_img'];?>" class="profile-img" alt="CLICK TO CHANGE DATA" onclick="window.location.href='<?php echo $location?>'">
                    <a><?php echo $_SESSION['session_name'];?></a>
                    <a href="files/php/logout.php">Log OUT</a>
            <?php
                }
                else{
            ?>
                    <a href="files/login/">login</a>
                    <a href="files/signup/">sign in</a>
            <?php } ?>
        </div>
    </header>
    <div class="qa">
        <div class="queans">

            <div style="width: 95%;background-color: antiquewhite;border-radius: 7px;position: sticky;right: 50%;display: flex;justify-content: center;align-items: center;margin-top: 5px;">
                <div style="width: 95%;">
                    <p>Hello <b><?php echo $_SESSION['session_name'];?></b> How Can I help you</p>
                </div>
            </div>
            
            <center><div class="inputField">
                <div class="askField">
                    <input type="text" class="ask" placeholder="ASK YOUR QUESTION">
                    <div class="mic"></div>
                </div>
                <div class="send"></div>
            </div></center>

        </div>
    </div>
    <script src="js/script.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
</body>
</html>