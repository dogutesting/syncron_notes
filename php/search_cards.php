<?php

require_once "connect_mysql.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $search_text = $_POST["search_text"];

    $object_connect_mysql = new connect_mysql();

    echo json_encode($object_connect_mysql->search_rows($search_text), JSON_UNESCAPED_UNICODE);
}



?>