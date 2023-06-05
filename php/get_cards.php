<?php

require "connect_mysql.php";
require_once 'card_class.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    //type_0 -> get_all_new_to_old
    //type_1 -> get_all_old_to_new

    //type_2 -> get_[day]_new_to_old
    //type_3 -> get_[day]_old_to_new
    
    //type_4 -> get_all_finished
    //type_5 -> get_all_deleted

    $list_type = $_POST["list_type"];
    $day = $_POST["day"];
    $stat = $_POST["stat"];
    
    $sql = "SELECT * FROM notes";
    /*
    if($list_type == "type_0" && $day == "all" && ) {
        $sql = "SELECT * FROM notes";
    }
    */
    
    $cardArray = array();
    $n = 0;
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            if($stat == $row["stat"]) {
                $createCard = new card_class($row["id_notes"], 
                                             $row["head"],
                                             $row["body"],
                                             $row["creation_date"],
                                             $row["last_sync_date"]);
                $cardArray[$n] = $createCard->getCardDiv();
                $n+=1;
            }
        }
    }
    
    
    /*
    //! note for me
    $response = array(
        'status' => "success",
        'message' => $cardArray,
    ); 
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
    */

    echo json_encode($cardArray);
}

/*

$text = '
<div class="card" data-id="1">
    <div class="top_bar_card">
        <h3 contenteditable="true" onkeydown="enterDisable(event)" onblur="handleBlurOnH3(this)">Aceq Yapılacaklar Listesi şimdi buradan ooo...</h3>
        <div class="top_bar_card_right_buttons">
            <div class="sync" title="Senkron">
                <i class="fa-solid fa-rotate fa-lg"></i>
            </div>
            <div class="finish_icon" title="Bitirililenler listesine ekle.">
                <i class="fa-sharp fa-solid fa-circle-check fa-lg"></i>
            </div>
            <div class="delete_icon" title="Sil">
                <i class="fa-solid fa-trash fa-lg"></i>
            </div>
        </div>
    </div>
    <div class="main_card" onclick="enableEditingForP(this, event)">
        <p contenteditable="true" onclick="getLostPropagation(event)" onblur="handleBlurOnP(this)">1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
    </div>
</div>
'; */



?>