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

    public function addVideo($title, $video_url, $thumb_url)
    {
        global $conn;

        $title = clean($title);
        $video_url = clean($video_url);
        $thumb_url = clean($thumb_url);

        $query = "INSERT INTO videos (title, raw_url, thumb_url) VALUES (:title, :vURL, :tURL)";
        $stmt = $conn->prepare($query);
        $stmt->bindValue(":title", $title, PDO::PARAM_STR);
        $stmt->bindValue(":vURL", $video_url, PDO::PARAM_STR);
        $stmt->bindValue(":tURL", $thumb_url, PDO::PARAM_STR);
        $stmt->execute();

        $num = $stmt->rowCount();

        if ($num == 0) {
            return false . '|' . 'Invalid params';
        } else {
            return true . '|' . $title . '|' . $video_url . '|' . $thumb_url;
        }
    }

    public function editVideo($id, $title, $video_url, $thumb_url)
    {
        global $conn;


        $id = clean($id);
        $title = clean($title);
        $video_url = clean($video_url);
        $thumb_url = clean($thumb_url);

        $query = "UPDATE videos SET title=:title, raw_url=:vURL, thumb_url=:tURL WHERE id=" . $id;
        $stmt = $conn->prepare($query);
        $stmt->bindValue(":title", $title, PDO::PARAM_STR);
        $stmt->bindValue(":vURL", $video_url, PDO::PARAM_STR);
        $stmt->bindValue(":tURL", $thumb_url, PDO::PARAM_STR);
        $stmt->execute();

        $num = $stmt->rowCount();

        if ($num == 0) {
            return false . '|' . 'Invalid params';
        } else {
            return true . '|' . $title . '|' . $video_url . '|' . $thumb_url;
        }
    }

    public function deleteVideo($id)
    {
        global $conn;

        $id = clean($id);
        $query = "DELETE FROM videos WHERE id=" . $id;
        $stmt = $conn->prepare($query);
        $stmt->execute();

        $num = $stmt->rowCount();

        if ($num == 0) {
            return false . '|' . 'Invalid params';
        } else {
            return true . '|' . $id;
        }
    }

    public function getVideos($num)
    {
        global $conn;
        $query = "SELECT * FROM videos" . ((is_string($num) && empty($num)) ? "" : " LIMIT 0," . $num);
        $stmt = $conn->prepare($query);
        $stmt->execute();
        $num = $stmt->rowCount();

        if ($num == 0) {
            return array();
        } else {
            $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $row;
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
