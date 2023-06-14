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

        public function get_rows($search_text, $day, $list_desc, $stat, $lang) {
            $search_text = mysqli_real_escape_string($this->conn, $search_text);
            $day = mysqli_real_escape_string($this->conn, $day);
            $list_desc = mysqli_real_escape_string($this->conn, $list_desc);
            $stat = mysqli_real_escape_string($this->conn, $stat);
            $lang = mysqli_real_escape_string($this->conn, $lang);


            //$day comes with 3 types all, single date 10.06.2023, 2 date 09.06.2023(-)10.06.2023
            
            $sql = "";

            if($day == "all") {
                $sql = "SELECT * FROM notes WHERE stat='$stat'";
            }
            // STR_TO_DATE('11.06.23', '%d.%m.%y')
            else {
                if(str_contains($day, "(-)")) {
                    $days = explode("(-)", $day);
                    $sql = "SELECT * FROM notes WHERE creation_date BETWEEN STR_TO_DATE('$days[0]', '%d/%m/%y') AND STR_TO_DATE('$days[1]', '%d/%m/%y') AND stat='$stat'";
                }
                else {
                    $sql = "SELECT * FROM notes WHERE creation_date =STR_TO_DATE('$day', '%d/%m/%y') AND stat='$stat'";
                }
            }
            if($search_text != "") {
                $sql .= " AND (LOWER(head) LIKE LOWER('%$search_text%') OR LOWER(body) LIKE LOWER('%$search_text%'))";
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

            return $this->get_mysql($sql, $lang);
            //return $sql;
        }

        private function get_mysql($sql, $lang) {
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
                    $cardArray[$n] = $createCard->getCardDiv($lang);
                    $n+=1;
                }
            }
            $this->close_connection();
            return $cardArray;
        }

        public function get_min_date() {
            $result = $this->conn->query("SELECT MIN(creation_date) AS min_date FROM notes");
            $minDate = '';
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $minDate = $row['min_date'];
                }
            } else {
                $minDate = "non";
            }
            $this->close_connection();
            return $minDate;
        }

        //add unkown row
        public function add_row($locale) {
            $locale = mysqli_real_escape_string($this->conn, $locale);
            $stat = "normal";

            if($locale == "TR") {
                $head = "Bir başlık yazın.";
                $body = "İçerik yazın.";
            }
            if($locale == "EN") {
                $head = "Type a title.";
                $body = "Type content.";
            }
            if($locale == "DE") {
                $head = "Eine Überschrift eingeben.";
                $body = "Inhalte schreiben.";
            }

            $t = time();
            $creation_date = date("Y-m-d", $t);
            //currentTime = date("Y-m-d H:i:s")
            $current_time = date("H:i:s");
            $sync_date_one_piece = $creation_date."|".$current_time;

            $sql_insert = "INSERT INTO notes (head, body, stat, creation_date, last_sync_date) VALUES ('$head', '$body', '$stat', '$creation_date', '$sync_date_one_piece')";

            $rData = array(
                "error"=> false,
                "card"=> "cardString"
            );
            if($this->conn->query($sql_insert) === true) {
                $createCard = new card_class($this->conn->insert_id, 
                                             $head,
                                             $body,
                                             $creation_date,
                                             $sync_date_one_piece,
                                             $stat);
                $rData["error"] = false;
                $rData["card"] = $createCard->getCardDiv($locale);
            }
            else {
                $rData["error"] = true;
                $rData["card"] = "";

            }
            $this->close_connection();
            return $rData;
        }

        public function update_rows($change, $id, $text) {
            $change = mysqli_real_escape_string($this->conn, $change);
            $id = mysqli_real_escape_string($this->conn, $id);
            $text = mysqli_real_escape_string($this->conn, $text);

            $sql = "";
            $t = time();
            $sync_date = date("Y-m-d", $t);
            //currentTime = date("Y-m-d H:i:s")
            $currentTime = date("H:i:s");
            $ls_one_piece = $sync_date."|".$currentTime;

            //1
            //maybe this can be dangerous?
            //$sql = "UPDATE notes SET  $change = '$text', last_sync_date = '$sync_date - $currentTime' WHERE id_notes = '$id' AND stat = 'normal'";

            //2
            if($change == "top") {    
                $sql = "UPDATE notes SET head = '$text', last_sync_date = '$ls_one_piece' WHERE id_notes = '$id' AND stat = 'normal'";
            }
            //else? idw t use else right now
            if($change == "body") {
                $sql = "UPDATE notes SET body = '$text', last_sync_date = '$ls_one_piece' WHERE id_notes = '$id' AND stat = 'normal'";
            }

            //$rt = "";
            $rt = array(
                "ok"=> true,
                "sync_date"=> date("d/m/Y", strtotime($sync_date)) . "-" . $currentTime
            );
            if($this->conn->query($sql) === true) {
                $rt["ok"] = true;
            }
            else {
                $rt["ok"] = false;
            }
            $this->close_connection();
            return $rt;
        }

        public function f_or_d_row($pro, $id) { //finish or delete row
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