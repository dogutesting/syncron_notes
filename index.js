//#logo h1 title change

console.log("Loaded");

var isEnterFree;

function makeEditable(element, bool) {
    element.contentEditable = true;
    isEnterFree = bool;
    //burada mysql'e kaydetme işlemini başlatman lazım
    //Anında başlatma ama yazma işlemi bittiğinde başlat
    //sync'yide çevir
}

function handleBlur() {
    //onBlur=
    alert("Edit sona erdi");
}

function handleKeyDown(event) {
    if (event.keyCode === 13) {
        //event.preventDefault();
        //return false;
        event.target.blur();
    }
}