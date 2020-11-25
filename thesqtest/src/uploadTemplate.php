<?php 

    $filename = $_FILES["file"];
    $myfile = fopen($filename["tmp_name"],"r");
    $index  = 0;
    $sent =0;
    require_once "connect.php";
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    require "vendor/autoload.php";
    function send_email ($name, $email,$token){
        $link = "http://thesqtest/index.php?token=$token";
        $mail = new PHPMailer();
        $mail->IsSMTP(); // enable SMTP
        $mail->SMTPDebug = 0;  // debugging: 1 = errors and messages, 2 = messages only
        $mail->SMTPAuth = true;  // authentication enabled
        $mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for GMail
        $mail->Host = 'thesqtest.com';
        $mail->Port = 465; 
        $mail->Username = 'admin@thesqtest.com';
        $mail->Password = 'adminunited33';
        $mail->setFrom("admin@thesqtest.com","SQ Test");
        $mail->addAddress($email);
        $mail->Subject = 'Token for test';
        $mail->Body    = "Dear $name\n\nHere is your token for taking the SQ Test\n$link\n\nLooking forward to have you taking the SQ Test.\nBest Wishes!";
        return $mail->send();
    }

    while(!feof($myfile)) {
        $line = fgets($myfile);
        $lines = explode("\t",$line);
        if (strpos($lines[0],"@") === false) continue;
        $email = $lines[0];
        $name = $lines[1];
        $date = new Datetime("now");
        $token  = md5($date->format('U'));
        $query = "INSERT INTO user (token,email,name) VALUES ('$token','$email','$name')";
        $conn->query($query);
        send_email($name,$email,$token);
        $sent++;

    }

    if ($sent ==0){
        header("location:admin.php?error=File is not valid");
    }else{
        header("location:admin.php?msg=Success sent $sent emails");
    }