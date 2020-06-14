<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


require(__DIR__ . '/app/admin.php');

$admin = new Admin();

$str = $_SERVER["PATH_INFO"];
if ($str == NULL)
    $str = "";
if (isset($_SERVER["PATH_INFO"])) {
    $str = substr($str, 1);
}

$vids = $admin->getVideos($str);
$result["data"] = $vids;
$result["state"] = 200;
echo json_encode($result);