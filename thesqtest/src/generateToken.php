<?php 

    require_once "connect.php";

    $email = $_POST['email'];
    $name = @$_POST['name'];
    $total_token = intval($_POST["total_token"]);
    $tokens = [];
    
    for ($i=0;$i < $total_token;$i++) {
        $date = new Datetime("now");
        $token  = md5($date->format('U').$i);
        $query = "INSERT INTO user (token,email ,name) VALUES ('$token','','$name')";
        $conn->query($query);
        array_push($tokens, $token);
    }
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    require "vendor/autoload.php";
    function send_email (){
        global $name;
        global $email;
        global $tokens;
        global $total_token;
        
        if($total_token ==1){
            $token = $tokens[0];
            $link = "http://thesqtest.com/index.php?token=$token\n";
        }else{
            for($i=0;$i< count($tokens);$i++){
                $token = $tokens[$i];
                $link.= ($i+1).". http://thesqtest.com/index.php?token=$token\n";
            }
        }
        
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
        $mail->Body    = "Dear $name\n\nHere is your token for taking the SQ Test\n$link\nLooking forward to have you taking the SQ Test.\nBest Wishes!";
        return $mail->send();
    }
    send_email();
    header("location:admin.php?msg=success send email to $email");