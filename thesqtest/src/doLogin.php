<?php 
    require_once "connect.php";
    $username = $_POST['username'];
    $password = md5($_POST['password']);

    $query = "SELECT * FROM user_login WHERE username = '$username' AND password = '$password'";

    $result = $conn->query($query);
    
    $row =  $result->fetch_assoc();

    if (count($row)==0){
        header("location:login.php?error=username or password invalid");
    }else{
        setcookie("user_id", $row['id'], time() + (86400 * 30), "/");
        header("location:admin.php");
    }

    
