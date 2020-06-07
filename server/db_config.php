<?php
session_start();
date_default_timezone_set("Africa/Accra");
define("BASE_URL", "https://danahzohar.com");
?>

<?php
function connectPDO()
{
    try {
        $pdoConn = new PDO("mysql:host=127.0.0.1;dbname=testdb;port=3306;charset=utf8", 'tester', 'test12345');
        $pdoConn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdoConn;
    } catch (PDOException $e) {
        die("<h1 style = 'text-align:center;color:red;'>Error connecting to db. " . $e->getMessage() . " <h1>");
    }
}

$conn = connectPDO();
?>


