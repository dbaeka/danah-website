<?php 

require "connect.php";

$total = $_POST["total"];
$tokens = [];

$html = '<html><table border=1>
<th>No</th>
<th>Token</th>
';

for ($i =1 ; $i<= $total;$i++){
    $name = '';
    $email = '';
    $date = new Datetime("now");
    $token  = md5($date->format('U').$i);
    $query = "INSERT INTO user (token,email,name) VALUES ('$token','$email','$name')";
    $conn->query($query);
    $link = "http://thesqtest.com/index.php?token=$token";
    $html .= "<tr>
    <td>$i</td>
    <td>$link</td>
    </tr>";
} 
header("Pragma: public");
header("Content-type: application/vnd.ms-excel");
header("Content-Disposition: attachment;Filename=list_token.xls");
$html.= '</table></html>';
echo $html;
setcookie("fileLoading", true, time() + (86400 * 30), "/");
?>
