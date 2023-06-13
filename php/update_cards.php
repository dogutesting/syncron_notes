<?php

require_once "connect_mysql.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $change = $_POST["change"];
    $id = $_POST["id"];
    $text = $_POST["text"];
    
    $object_connect_mysql = new connect_mysql();
    echo json_encode($object_connect_mysql->update_rows($change, $id, $text));
}



?>