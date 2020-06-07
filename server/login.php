<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


require(__DIR__ . '/app/admin.php');

$admin = new Admin();

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

if (isset($_POST['action']) && $_POST['action'] == 'login') {
    if (isset($_POST['username'], $_POST['password'])) {
        $error = 0;

        $username = clean($_POST['username']);
        $password = clean($_POST['password']);

        if ($error == 0) {
            $udata = $admin->login($username, $password);
            $udatax = explode("|", $udata);
            if ($udatax[0] == true) {
                $apid = $udatax[1];
                $name = $udatax[2];
                $data['apid'] = $apid;
                $data['name'] = $name;
                $data['username'] = $username;
                $data['state'] = 200;
                echo json_encode($data);
                exit();
            } else {
                $data['state'] = 400;
                $data['response_msg'] = $udatax[1];
                echo json_encode($data);
                exit();
            }
        } else {
            $data['state'] = 400;
            $data['response_msg'] = 'invalid parameters';
            echo json_encode($data);
            exit();
        }
    } else {
        $data['state'] = 400;
        $data['response_msg'] = 'invalid parameters';
        echo json_encode($data);
        exit();
    }
} else {
    $data['state'] = 400;
    $data['response_msg'] = 'required parameters missing';
    echo json_encode($data);
    exit();
}