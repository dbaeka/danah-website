<?php


// $servername = "sql200.epizy.com";
// $username = "epiz_25135773";
// $password = "KzPgiEMT1H";
// $database = "epiz_25135773_database";
session_start();
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