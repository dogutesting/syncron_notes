<?php

class card_class{
    
    private $id;
    private $head;
    private $body;
    private $creation_date;
    private $last_sync_date;
    private $stat;

    public function __construct($id, $head, $body, $creation_date, $last_sync_date, $stat) {
        $this->id = $id;
        $this->head = $head;
        $this->body = $body;
        $this->creation_date = $creation_date;
        $this->last_sync_date = $last_sync_date;
        $this->stat = $stat;
    }

    private $dateFormat = "d/m/Y";

    public function getCardDiv($lang) {
        $ls_split = explode("|", $this->last_sync_date);
        $ls_split[0] = date($this->dateFormat, strtotime($ls_split[0]));
        $one_piece = $ls_split[0] . "-" . $ls_split[1];
        
        if($lang == "TR") {
            $t0 = "Bitirilenler listesine ekle.";
            $t1 = "Sil";
            $t2 = "Oluşturma Tarihi";
            $t3 = "Son Senkron Tarihi";
            $t4 = "Senkron";
        }
        
        if($lang == "EN") {
            $t0 = "Add to done list.";
            $t1 = "Delete";
            $t2 = "Creation date";
            $t3 = "Last Sync Date";
            $t4 = "Sync";
        }
        
        if($lang == "DE") {
            $t0 = "Zur Erledigt-Liste hinzufügen.";
            $t1 = "Löschen";
            $t2 = "Erstellungsdatum";
            $t3 = "Letztes Synchronisierungsdatum";
            $t4 = "Synchronizität";
        }

        $cardSt = '';
        if($this->stat == "normal") {
            $cardSt= '<div class="card" data-id="'.$this->id.'" data-status="'.$this->stat.'">
            <div class="top_bar_card">
                <h3 class="h3hover_normal" contenteditable="true" onkeydown="enterDisable(event)" onblur="handleBlurOnH3(this)">'.$this->head.'</h3>
                <div class="top_bar_card_right_buttons">
                    <div class="sync" title="'.$t4.'">
                        <i class="fa-solid fa-rotate fa-lg"></i>
                    </div>
                    <div class="finish_icon" title="'.$t0.'">
                        <i class="fa-sharp fa-solid fa-circle-check fa-lg"></i>
                    </div>
                    <div class="delete_icon" title="'.$t1.'">
                        <i class="fa-solid fa-trash fa-lg"></i>
                    </div>
                </div>
            </div>
            <div class="main_card">
                <textarea class="textarea_writable" onblur="handleBlur(this)">'.$this->body.'</textarea>
            </div>
            <div class="end_card" style="background-color: rgb(205 195 146);">
                <div title="'.$t2.'"><i class="fa-solid fa-calendar-days fa-xs"></i><p class="creation_date">'.date($this->dateFormat, strtotime($this->creation_date)).'</p></div>
                <div title="'.$t3.'"><i class="fa-solid fa-rotate fa-xs"></i><p class="sync_date">'.$one_piece.'</p></div>
            </div>
        </div>';
        }
        if($this->stat == "finish") {
            $cardSt = '<div class="card finishCard" data-id="'.$this->id.'" data-status="'.$this->stat.'">
            <div class="top_bar_card finishCardH3">
                <h3 class="h3hover_none">'.$this->head.'</h3>
            </div>
            <div class="main_card">
                <textarea readonly>'.$this->body.'</textarea>
            </div>
            <div class="end_card" style="background-color: rgb(75 187 75);">
                <div title="'.$t2.'"><i class="fa-solid fa-calendar-days fa-xs"></i><p class="creation_date">'.date($this->dateFormat, strtotime($this->creation_date)).'</p></div>
                <div title="'.$t3.'"><i class="fa-solid fa-rotate fa-xs"></i><p class="sync_date">'.$one_piece.'</p></div>
            </div>
        </div>';
        }
        if($this->stat == "delete") {
            $cardSt = '<div class="card deleteCard" data-id="'.$this->id.'" data-status="'.$this->stat.'">
            <div class="top_bar_card deleteCardH3">
                <h3 class="h3hover_none">'.$this->head.'</h3>
            </div>
            <div class="main_card">
                <textarea readonly>'.$this->body.'</textarea>
            </div>
            <div class="end_card" style="background-color: rgb(207 78 78);">
                <div title="'.$t2.'"><i class="fa-solid fa-calendar-days fa-xs"></i><p class="creation_date">'.date($this->dateFormat, strtotime($this->creation_date)).'</p></div>
                <div title="'.$t3.'"><i class="fa-solid fa-rotate fa-xs"></i><p class="sync_date">'.$one_piece.'</p></div>
            </div>
        </div>';
        }
        return $cardSt;
    }
    /* public function getCardDiv() {
        $cardSt = '';
        if($this->stat == "normal") {
            $cardSt= '<div class="card" data-id="'.$this->id.'" data-status="'.$this->stat.'">
            <div class="top_bar_card">
                <h3 contenteditable="true" onkeydown="enterDisable(event)" onblur="handleBlurOnH3(this)">'.$this->head.'</h3>
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
                <p contenteditable="true" onclick="getLostPropagation(event)" onblur="handleBlurOnP(this)">'.$this->body.'</p>
            </div>
            <div class="end_card" style="background-color: rgb(205 195 146);">
                <div title="Oluşturma Tarihi"><i class="fa-solid fa-calendar-days fa-xs"></i><p class="creation_date">'.date($this->dateFormat, strtotime($this->creation_date)).'</p></div>
                <div title="Son Senktron Tarihi"><i class="fa-solid fa-rotate fa-xs"></i><p class="sync_date">'.date($this->dateFormat, strtotime($this->last_sync_date)).'</p></div>
            </div>
        </div>';
        }
        if($this->stat == "finish") {
            $cardSt = '<div class="card finishCard" data-id="'.$this->id.'" data-status="'.$this->stat.'">
            <div class="top_bar_card finishCardH3">
                <h3 contenteditable="false">'.$this->head.'</h3>
            </div>
            <div class="main_card">
                <p contenteditable="false">'.$this->body.'</p>
            </div>
            <div class="end_card" style="background-color: rgb(75 187 75);">
                <div title="Oluşturma Tarihi"><i class="fa-solid fa-calendar-days fa-xs"></i><p class="creation_date">'.date($this->dateFormat, strtotime($this->creation_date)).'</p></div>
                <div title="Son Senktron Tarihi"><i class="fa-solid fa-rotate fa-xs"></i><p class="sync_date">'.date($this->dateFormat, strtotime($this->last_sync_date)).'</p></div>
            </div>
        </div>';
        }
        if($this->stat == "delete") {
            $cardSt = '<div class="card deleteCard" data-id="'.$this->id.'" data-status="'.$this->stat.'">
            <div class="top_bar_card deleteCardH3">
                <h3 contenteditable="false">'.$this->head.'</h3>
            </div>
            <div class="main_card">
                <p contenteditable="false">'.$this->body.'</p>
            </div>
            <div class="end_card" style="background-color: rgb(207 78 78);">
                <div title="Oluşturma Tarihi"><i class="fa-solid fa-calendar-days fa-xs"></i><p class="creation_date">'.date($this->dateFormat, strtotime($this->creation_date)).'</p></div>
                <div title="Son Senktron Tarihi"><i class="fa-solid fa-rotate fa-xs"></i><p class="sync_date">'.date($this->dateFormat, strtotime($this->last_sync_date)).'</p></div>
            </div>
        </div>';
        }
        return $cardSt;
    } */
}

?>