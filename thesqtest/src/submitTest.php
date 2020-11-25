<?php 
    include "connect.php";
    $date = date("Y-m-d H:i:s");
    $section_id = $_POST['section_id'];
    $questions = $_SESSION["questions"];
    $token = $_POST["token"];
    $section_name= $_POST['section_name'];
    $lang = $_POST['lang'];
    if($lang == "cn"){
        $questions = $_SESSION["cn_questions"];
    }
    $query = "DELETE FROM answers WHERE token = $token AND section_id=$section_id";
    $conn->query($query);
    foreach($questions[$section_name] as $question){
        $answer = $_POST[$question['id']];
        $id = $question['id'];    
        $query = "INSERT INTO answers (token,section_id,question_id,answer,created_timestamp) value ('$token',$section_id,$id,$answer,'$date')";
        $conn->query($query);
    }

    if($section_id == 11){
        if($lang == "cn")
            header("location:cn_generateResult.php?token=$token");
        else
            header("location:generateResult.php?token=$token");
    }else{
        $section_id++;
        if($lang == "cn")
            header("location:cn_test.php?page=$section_id&token=$token");
        else
            header("location:test.php?page=$section_id&token=$token");
    }
