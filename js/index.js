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

    function getLostPropagation(event) {
        event.stopPropagation();
    }

    function enterDisable(event) {
        if (event.keyCode === 13) {
            event.target.blur();
        }
    }

    $(function() {

        /* $("h3").on("wheel", function(event) {
            event.preventDefault();
            $(this).stop();
            var scrollAmount = event.originalEvent.deltaY;
            $(this).scrollLeft($(this).scrollLeft() + scrollAmount);
        })
        .on("mouseenter", function() {
            var textWidth = $(this).get(0).scrollWidth;
            $(this).stop().animate({scrollLeft: textWidth}, 2000);
            //kayma hızı cümlenin uzunluğuna göre değiştirilebilir
        })
        .on("mouseout", function () {
            $(this).stop().animate({scrollLeft: 0}, 2000);
        }); */

        $('body').on('wheel', "h3", function(event) {
            event.preventDefault();
            $(this).stop();
            var scrollAmount = event.originalEvent.deltaY;
            $(this).scrollLeft($(this).scrollLeft() + scrollAmount); 
        }, {passive: false }).on("mouseenter", "h3", function() {
            var textWidth = $(this).get(0).scrollWidth;
            $(this).stop().animate({scrollLeft: textWidth}, 2000);
            //kayma hızı cümlenin uzunluğuna göre değiştirilebilir
        })
        .on("mouseout", "h3", function () {
            $(this).stop().animate({scrollLeft: 0}, 1700);
        });
        
        /* 
        //! Note for me
        arrow function'da "this" anahtar kelimesi çalışmıyormuş
        onun yerine "event.currentTarget" kullanılmalıymış.
        $("h3").on("mouseenter", (event) => {
            log($(event.currentTarget).attr("id"));
        }) 
    
        $("h3").on("mouseenter", function(event) => {
            log($(this).attr("id"));
        }) 
        */

        //on start
        $.ajax({
            url: 'php/get_cards.php',
            type: 'POST',
            data: {"list_type": 'type_0', "day": "all", "stat": "normal"},
            success: function(response) {
              var jsonData = JSON.parse(response);
              $("myGrid").empty();
              for(var i=0; i<jsonData.length; i++) {
                $("#myGrid").append(jsonData[i]);
              }
            },
            /*
            error: function(error) {
              //console.error(error);
            } */
        });


        //button clicks
        $("#add_cart_button").on("click", () => {

        });

        //kodlanmadı
        $("#search_input").on("keyup", function(event) {
            var search_text = $(this).val();
            $.ajax({
                url: 'php/search_cards.php',
                type: 'POST',
                data: {"list_type": 'type_0', "day": "all", "stat": "normal"},
                success: function(response) {
                  var jsonData = JSON.parse(response);
                  $("myGrid").empty();
                  for(var i=0; i<jsonData.length; i++) {
                    $("#myGrid").append(jsonData[i]);
                  }
                },
                /*
                error: function(error) {
                  //console.error(error);
                } */
            });

        });

        //kodlanmadı
        $("#search_button").on("click", () => {
            //$("#search_input").val();
        })
        
        function log(data) {
            console.log(data);
        }
    });