<?php

require_once "connect_mysql.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $object_connect_mysql = new connect_mysql();

    $locale = $_POST["locale"];
    echo json_encode($object_connect_mysql->add_row($locale), JSON_UNESCAPED_UNICODE);
}

?>