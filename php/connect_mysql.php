<?php

    require_once "card_class.php";

    class connect_mysql {
        private $servername = "localhost";
        private $username = "root";
        private $password = "";
        private $database = "sync_notes_db";
    
        private $conn;
        private $sql;

        public function __construct() {
            $this->conn = new mysqli($this->servername, $this->username, $this->password, $this->database);
    
            if ($this->conn->connect_error) {
                die("MySql connection error." . $this->conn->connect_error);
            }
        }

        //type_0 -> get_all_new_to_old
        //type_1 -> get_all_old_to_new

        //type_2 -> get_[day]_new_to_old
        //type_3 -> get_[day]_old_to_new

        //type_4 -> get_all_finished_new_to_old
        //type_5 -> get_all_finished_old_to_new

        //type_6 -> get_all_deleted_new_to_old
        //type_7 -> get_all_deleted_old_to_new

        //$sql = "SELECT * FROM notes";

        public function get_rows($day, $list_desc, $stat) {
            $day = mysqli_real_escape_string($this->conn, $day);
            $list_desc = mysqli_real_escape_string($this->conn, $list_desc);
            $stat = mysqli_real_escape_string($this->conn, $stat);

            //$day comes with 3 types all, single date 10.06.2023, 2 date 09.06.2023(-)10.06.2023
            
            $sql = "";

            if($day == "all") {
                $sql = "SELECT * FROM notes WHERE stat='$stat'";
            }
            else {
                $sql = "SELECT * FROM notes WHERE creation_date ='$day' AND stat='$stat'";
            }

            if($list_desc == "31_to_1") {
                $sql .= " ORDER BY id_notes DESC";
            }
            if($list_desc == "1_to_31") {
                $sql .= " ORDER BY id_notes";
            }
            if($list_desc == "a_to_z") {
                $sql .= " ORDER BY SUBSTRING(head, 1, 1)";
            }
            if($list_desc == "z_to_a") {
                $sql .= " ORDER BY SUBSTRING(head, 1, 1) DESC";
            }

            return $this->get_mysql($sql);
        }

        private function get_mysql($sql) {
            $cardArray = array();
            $n = 0;
            $result = $this->conn->query($sql);
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $createCard = new card_class($row["id_notes"], 
                                                    $row["head"],
                                                    $row["body"],
                                                    $row["creation_date"],
                                                    $row["last_sync_date"],
                                                    $row["stat"]);
                    $cardArray[$n] = $createCard->getCardDiv();
                    $n+=1;
                }
            }
            $this->close_connection();
            return $cardArray;
        }

        public function search_rows($search_text) {
            $search_text = mysqli_real_escape_string($this->conn, $search_text);
            $sql_search = "SELECT * FROM notes WHERE LOWER(head) LIKE LOWER('%$search_text%') OR LOWER(body) LIKE LOWER('%$search_text%')";
            $cardArray = array();
            $n = 0;
            $result = $this->conn->query($sql_search);
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $createCard = new card_class($row["id_notes"], 
                                                    $row["head"],
                                                    $row["body"],
                                                    $row["creation_date"],
                                                    $row["last_sync_date"],
                                                    $row["stat"]);
                    $cardArray[$n] = $createCard->getCardDiv();
                    $n+=1;
                }
            }
            $this->close_connection();
            return $cardArray;
        }

        //add unkown row
        public function add_row() {
            $gun = date("d");    // Günü alır (01-31)
            $ay = date("m");     // Ayı alır (01-12)
            $yil = date("y");

            $head = "Başlık yazın.";
            $body = "İçerik yazın.";
            $stat = "normal";
            $creation_date = $gun.'.'.$ay.'.'.$yil;

            $sql_insert = "INSERT INTO notes (head, body, stat, creation_date) VALUES ('$head', '$body', '$stat', '$creation_date')";
            $res = "";
            $rData = array(
                "error"=> false,
                "card"=> "cardString"
            );
            if($this->conn->query($sql_insert) === true) {
                //$res = "suc";
                $createCard = new card_class($this->conn->insert_id, 
                                             $head,
                                             $body,
                                             $creation_date,
                                             "0",
                                             $stat);
                $rData["error"] = false;
                $rData["card"] = $createCard->getCardDiv();
            }
            else {
                $rData["error"] = true;
                $rData["card"] = "";

            }
            $this->close_connection();
            return $rData;
        }

        public function f_or_d_row($pro, $id) {
            $id = mysqli_real_escape_string($this->conn, $id);
            $sql = "UPDATE notes SET stat = '$pro' WHERE id_notes = '$id'";
            $rt = "";
            if($this->conn->query($sql) === true) {
                $rt = "1";
            }
            else {
                $rt = "0";
            }
            $this->close_connection();
            return $rt;
        }

        private function close_connection() {
            $this->conn->close();
        }
    }
?>