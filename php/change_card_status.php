<?php

require_once "connect_mysql.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $object_connect_mysql = new connect_mysql();

    //echo json_encode($object_connect_mysql->delete_row($_POST["deleteId"]), JSON_UNESCAPED_UNICODE);
    echo $object_connect_mysql->f_or_d_row($_POST["pro"], $_POST["id"]);
}

?>