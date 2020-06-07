<?php
include_once __DIR__ . '/../db_config.php';

function clean($data)
{
    return htmlspecialchars(strip_tags($data));
}


class Admin
{

    public function login($username, $password)
    {
        global $conn;

        $username = clean($username);
        $password = clean($password);

        $passx = clean(md5($password));

        $query = "SELECT apid, name FROM account WHERE username=:uname AND password=:pass LIMIT 0,1";
        $stmt = $conn->prepare($query);
        $stmt->bindValue(":uname", $username, PDO::PARAM_STR);
        $stmt->bindValue(":pass", $passx, PDO::PARAM_STR);
        $stmt->execute();

        $num = $stmt->rowCount();

        if ($num == 0) {
            return false . '|' . 'Invalid Username and Password combination';
        } else {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $apid = $row["apid"];
            $name = $row["name"];
            return true . '|' . $apid . '|' . $name;
        }
    }


    public function user_data($apid)
    {
        global $conn;

        $func_num_args = func_num_args();
        $func_get_args = func_get_args();

        if ($func_num_args > 1) {
            unset($func_get_args[0]);
            $fields = '' . implode(',', $func_get_args) . '';
//            $data = mysqli_fetch_assoc(mysqli_query($conn, "SELECT $fields FROM admins WHERE aid='$userid' "));
            return array();// $data;
        } else {
            return null;
        }
    }
}
