<?php
session_start();
include("../php/connection.php");
error_reporting(0);

   //isset check the submit button clicked or not
   if(isset($_POST['submit']))
   {
    $phone = $_POST['phone'];
    $pass = $_POST['pass'];
    $table = "SELECT * FROM logindata WHERE phone = '$phone' && password = '$pass' ";
    $data = mysqli_query($con , $table);
    $total = mysqli_num_rows($data); //check any data available or not
  
   }
    if ($total == 1) {
      $profile = mysqli_fetch_assoc($data);
      $_SESSION['session_id']="$profile[id]";
      $_SESSION['session_img']="$profile[img]";
      $_SESSION['session_name']="$profile[name]";
      echo $_SESSION['session_img'];
      header('location:../../index.php');
     }
    elseif($total>1) {
?>
         <table border="3">
            <tr>
               <th>ID</th>
               <th>IMAGE</th>
               <th>NAME</th>
               <th>PHONE</th>
               <th>log in account</th>
            </tr>
<?php
         while($profile = mysqli_fetch_assoc($data)) {
            echo "
                  <tr>
                  <td>".$profile['id']."</td>
                  <td><img src='../images/database_img/".$profile['img']."' width='100px'></td>
                  <td>".$profile['name']."</td>
                  <td>".$profile['phone']."</td>
                  <td><a href='switch.php?id=$profile[id]&img=$profile[img]'><button style='width: 90%;height: 2rem;margin-left: 5%;box-shadow: none;border: none;background-color: darkcyan;color: white;'>LOG IN</button></a></td>
                  </tr>
               ";
         }    
?>
      </table>
<?php
      }
     else{
      header('location:../login/');
     } 

?>