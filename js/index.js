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
        -> sonradan eklenen elemanları görebilmek için $('body') kullanıyorum.;
        
        -> arrow function'da "this" anahtar kelimesi çalışmıyormuş
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
            data: {"day": "all", "list_desc": "31_to_1", "stat": "normal"},
            success: function(response) {
                //console.log(response);
                
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
        $("body").on("click", ".delete_icon", function() {
            //1
            //var targetId = $(this).parent().parent().parent().attr("data-id");

            //2
            var target = $(this).parents().eq(2);
            var targetId = $(target).attr("data-id");
            $.ajax({
                url: 'php/change_card_status.php',
                type: 'POST',
                data: {"pro": "delete", "id": targetId},
                success: function(response) {
                    //var jsonData = JSON.parse(response);
                    if(response == "1") {
                        notificationText("Silinenlere eklendi.");
                        
                        //1
                        //$(target).remove();

                        //2
                        $(target).fadeOut("300", function() {
                            $(this).remove();
                        });
                    }
                    else {
                        error();
                    }
                }
            });

        }).on("click", ".finish_icon", function () {
            var target = $(this).parents().eq(2);
            var targetId = $(target).attr("data-id");
            $.ajax({
                url: 'php/change_card_status.php',
                type: 'POST',
                data: {"pro": "finish","id": targetId},
                success: function(response) {
                    //var jsonData = JSON.parse(response);
                    if(response == "1") {
                        notificationText("Tamamlananlara eklendi.");
                        
                        //1
                        //$(target).remove();

                        //2
                        $(target).fadeOut("300", function() {
                            $(this).remove();
                        });
                    }
                    else {
                        error();
                    }
                }
            });
        });

        $("#add_card_button").on("click", () => {
            //solution 1: show add card modal
            //https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal
            //set head, body text and add to main

            //solution 2: add card directly to main and mysql database
            $.ajax({
                url: 'php/add_card.php',
                type: 'POST',
                success: function(response) {
                    var jsonData = JSON.parse(response);
                    //console.log(jsonData["card"]);
                    if(!jsonData["error"]) {
                        //response 1
                        $("#myGrid > div:first").before(jsonData["card"]);

                        //response 2
                        //response içerisinde alayını tekrar döndürebilirim. Bir kaç nedenim var ama şimdilik kullanmamayı tercih ediyorum.
                        /* $("#myGrid").empty();
                        for(var i=0; i<jsonData.length; i++) {
                            $("#myGrid").append(jsonData[i]);
                        } */
                    }
                    else {
                        //neden success: function() içerisinde hata mesajı yazıyorum zaten bunun için error: function() var?
                        //bende bunu kendime soruyorum.
                        error();
                    }
    
                },
                error: function() {
                    bigError();
                }
            });
            
        });

        //kodlanmadı
        $("#search_input").on("keyup", function(event) {
            var search_text = $(this).val();
            $.ajax({
                url: 'php/search_cards.php',
                type: 'POST',
                //specific day or to day | stat: normal, finished, deleted | 
                //list_type: a_to_z, z_to_a, 1_to_31, 31_to_1
                data: {"search_text": search_text},
                success: function(response) {
                    var jsonData = JSON.parse(response);
                    $("#myGrid").empty();
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

        var i_array = [];
        $("#list_type_button i").each(function() {
            i_array.push(this);
        });
        $("#list_type_button").on("click", function() {
            
        });

        $("#settings_button").on("click", () => {
            alert("Buraya pop up ayarlar yeri yapılacak");
        })

        function notificationText(text) {
            //maybe i wil add notificationtext but now it will be normal alert
            alert(text);
        }

        function error() {
            alert("Beklenmedik bir hata");
        }

        function bigError() {
            alert("Acayip bir hata ile karşılaşıldı. Programcıyı düşündürecek türden bir hata bu.");
        }

        function log(data) {
            console.log(data);
        }
    });