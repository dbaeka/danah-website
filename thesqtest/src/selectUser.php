<?php 

    session_start();
    $id = $_POST['id'];
    $checked = $_POST['checked'];
    $selected_user = array();
    $selected_user = @$_SESSION['selected_user'];
    $key = $id."";
    if(isset($selected_user)){
        if ($checked == "false"){
            unset($selected_user[$key]);
        }else{
            $selected_user += [$key => $id];
        }
        $_SESSION['selected_user'] = $selected_user;
    }else{
        $selected_user = [$key => $id];
        $_SESSION['selected_user'] = $selected_user;
    }
    print_r($selected_user);