<?php


// $servername = "sql200.epizy.com";
// $username = "epiz_25135773";
// $password = "KzPgiEMT1H";
// $database = "epiz_25135773_database";

if(!function_exists('getallheaders')){
    function getallheaders(){
        $headers = array();
        foreach ($_SERVER as $name => $value) {
            if (substr($name, 0, 5) == 'HTTP_') {
                $headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
            }
        }
        return $headers;
    }
}

$servername = "45.118.132.253";
$username = "thesqtes_admin";
$password = "adminunited33";
$database = "thesqtes_sqtest";
// phpinfo();

// Create connection
$conn = mysqli_connect($servername, $username, $password,$database);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
// echo "Connected successfully";