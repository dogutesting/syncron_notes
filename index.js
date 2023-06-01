    //#logo h1 title change

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
        event.stopPropagation();

        //main_card elementine tıklandığında p elementini seçiyoruz
        var pElement = element.querySelector('p');

        //p elementine odaklanmak için
        pElement.focus();

        //p elementinin sonuna gelmek için
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
            event.target.blur();
        }
    }

    function startScrolling(element) {
        console.log(element);

        textWidth = element.scrollWidth;
        containerWidth = element.clientWidth;

        /* if (textWidth > containerWidth) {
            element.style.animation = "scrollText " + (textWidth / 50) + "s linear infinite";
        } */
    }

    var scrollInterval;

    function stopScrolling(element) {
        scrollInterval = setInterval(function() {
            element.scrollLeft += 1;
        }, 20);
    }

    function stopScrolling() {
        clearInterval(scrollInterval);
    }