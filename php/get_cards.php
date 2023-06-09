<?php

require_once "connect_mysql.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    /*
    //! note for me
    $response = array(
        'status' => "success",
        'message' => $cardArray,
    ); 
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
    */
    
    $day = $_POST["day"];
    $list_desc = $_POST["list_desc"];
    $stat = $_POST["stat"];

    $object_connect_mysql = new connect_mysql();

    echo json_encode($object_connect_mysql->
    get_rows($day, $list_desc, $stat), JSON_UNESCAPED_UNICODE);
}



?>