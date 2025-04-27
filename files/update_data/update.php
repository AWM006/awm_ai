<?php
error_reporting(0);
$server    = "localhost";
$username  = "root";
$password  = "";
$dbname    = "data";
$con = mysqli_connect($server , $username , $password , $dbname);
if(!$con){
    echo "not connected";
}

$id=$_GET['id'];
$sql_code = "SELECT * FROM logindata WHERE id= '$id'";
$data = mysqli_query($con , $sql_code);
$total = mysqli_num_rows($data);
$result =mysqli_fetch_assoc($data);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>LOGIN</title>
    <link rel="stylesheet" href="files/style.css">
</head>
<body>
  <div class="main">
        <div class="mainform">
        <h1 style="color: white;">CORRECTION YOUR DATA</h1>
            <center>
            <div class="avatar">
                    <div class="eyes">
                        <div class="eye">
                        <div class="pupil"></div>
                        </div>
                        <div class="eye">
                        <div class="pupil"></div>
                        </div>
                    </div>
            </div>
            </center>
            <form action="#" method="post" enctype="multipart/form-data">
    
            <br>
            <label class="nametext">Enter new your Full Name</label><br>
            <input type="text" placeholder="NAME" class="name" name="name" value="<?php echo $result['name']; ?>" required>
            <br><br>
            <label class="nametext">Enter new PH no</label><br>
            <input type="tel" placeholder="PH NO" class="phone" name="phone" value="<?php echo $result['phone']; ?>" required>
            <br><br>
            <div class="passShow"><label class="passwordtext">Enter New Password</label><div><font class="show">SHOW</font><input type="checkbox" class="tick"></div></div><br>
            <input type="password" placeholder="PASSWORD" class="pass" name="pass" value="<?php echo $result['password']; ?>">
            <br><br>
            <label class="nametext">Re Enter Password</label><br>
            <input type="password" placeholder="PASSWORD" class="repass" name="repass" value="<?php echo $result['password']; ?>">
            <br><br>
            <label class="nametext">upload image</label><br>
            <input type="file" accept="image/*" class="image" name="image">
            <center><input type="submit" class="submit" name="update" disabled></center>

            </form>
            <font class="redirect">already have a accout?</font><a href="../login/index.html" class="re">click here</a>
        </div>
  </div>
    <script src="files/script.js"></script>
</body>
</html>
<?php 
if($_POST['update']){

    


    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $pass = $_POST['pass'];
    $img  =$_FILES["image"];//this change into a name
    if($img['size']>0){
        $filename = $_FILES["image"]["name"];
        $ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
        if ($ext === "heic" || $ext === "heif") {
            echo "<h1 style='color: red;border: 5px solid black;background-color: beige;'>.heic photo doesn't support choose another</h1>";
            $heic = true;
        }
        else{
             //delete old photo
            $oldPath = "../images/database_img/" . $result['img'];
            $newPath = "../images/delete_img/" . $result['img'];
            rename($oldPath, $newPath); //move old img

            //random string generator for img name
            function generateRandomString($length = 30) {
                $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                $charactersLength = strlen($characters);
                $randomString = '';
                for ($i = 0; $i < $length; $i++) {
                    $randomString .= $characters[random_int(0, $charactersLength - 1)];
                }
                return $randomString;
            }
            //move new photo
            $filename = $img["name"];
            $tempname = $img["tmp_name"];
            $img_name = generateRandomString(16).".jpg";
            move_uploaded_file($tempname,"../images/database_img/".$img_name);//add new img
            $heic = false;
        }
       

    }
    else{
        $img_name = $result['img'];
        echo "$id";
    }
    //preparion for update
    if($heic == false){
       $sql = "UPDATE logindata SET img='$img_name',name='$name',phone='$phone',password='$pass' WHERE id='$id'";

        $result = mysqli_query($con , $sql);
        if($result){
            header('location:../php/logout.php');
        }
        else{
            echo "<br>call pritam to turn on server";
        }
    }
} 
?>