<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "sync_notes_db";

    $conn = new mysqli($servername, $username, $password, $database);

    if ($conn->connect_error) {
        die("MySql connection error." . $conn->connect_error);
    }
    
?>