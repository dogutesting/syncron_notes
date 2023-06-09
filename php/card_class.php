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

    public function getCardDiv() {
        return '<div class="card" data-id="'.$this->id.'" data-creation="'.$this->creation_date.'" data-update="'.$this->last_sync_date.'" data-status="'.$this->stat.'">
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
    </div>';
    }
}

?>