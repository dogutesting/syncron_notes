<?php

require_once "connect_mysql.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $object_connect_mysql = new connect_mysql();

    echo json_encode($object_connect_mysql->get_min_date(), JSON_UNESCAPED_UNICODE);
}



?>