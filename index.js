//#logo h1 title change

console.log("Loaded");

var isEnterFree;

function handleBlurOnH3(element) {
    element.contentEditable = false;
    /* console.log("Edit sona erdi"); */
    element.contentEditable = true;
}

function handleBlurOnP(element) {
    if(element.classList.contains("main_card")) {
        return;
    }
    else {
        element.contentEditable = false;
        /* console.log("Edit sona erdi"); */
        element.contentEditable = true;
    }
    
}

function enableEditingForP(element, event) {
    console.log(element);
    event.stopPropagation();

    // main_card elementine tıklandığında p elementini seçiyoruz
    var pElement = element.querySelector('p');

    // p elementini contenteditable yapmak ve odaklanmak için
    pElement.focus();

    // imleci p elementinin sonuna taşıyoruz
    var range = document.createRange();
    range.selectNodeContents(pElement);
    range.collapse(false);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
}

function fuckOffPropagation(event) {
    event.stopPropagation();
}


function enterDisable(event) {
    if (event.keyCode === 13) {
        //event.preventDefault();
        //return false;
        event.target.blur();
    }
}