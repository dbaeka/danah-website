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

if (isset($_POST['action']) && $_POST['action'] == 'edit_event') {
    if (isset($_POST['id'], $_POST['title'], $_POST['start'], $_POST['end'], $_POST['all_day'])) {
        $error = 0;

        $id = clean($_POST['id']);
        $title = clean($_POST['title']);
        $start = clean($_POST['start']);
        $end = clean($_POST['end']);
        $all_day = clean($_POST['all_day']);

        if ($error == 0) {
            $udata = $admin->editEvent($id, $title, $start, $end, $all_day);
            $udatax = explode("|", $udata);
            if ($udatax[0] == true) {
                $events = $admin->getEvents("");
                $data["results"] = $events;
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