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
        //moved here before starterKit(); <- what is this ; for :D
        var list_type_buttons = [];
        var stat_list_buttons = [];
        $("#list_type_buttons i").each(function() {
            list_type_buttons.push(this);
        });
        $("#stat_list_buttons i").each(function() {
            stat_list_buttons.push(this);
        });

        starterKit();
        
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
            $(this).stop().animate({scrollLeft: 0}, 1500);
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
                }
            });

        });

        $("#list_type_buttons").on("click", function() {
            var aI = parseInt($(this).attr("active"));
            aI += 1;
            if(aI + 1 > list_type_buttons.length) {
                aI = 0;
            }
            for(var i=0; i<list_type_buttons.length; i++) {
               $(list_type_buttons[i]).addClass("hidden");
            }
            $(list_type_buttons[aI]).removeClass("hidden");

            $(this).attr("active", aI); 

            var preference = {
                key : "listDesc",
                value : aI
            }
            setCookies(preference);
            showCards();
        });
        function selectListTypeButton(index) {            
            for(var i=0; i<list_type_buttons.length; i++) {
                $(list_type_buttons[i]).addClass("hidden");
            }
            $(list_type_buttons[index]).removeClass("hidden");
        }

        $("#stat_list_buttons").on("click", function() {
            var aI = parseInt($(this).attr("active"));
            aI += 1;
            if(aI + 1 > stat_list_buttons.length) {
                aI = 0;
            }
            for(var i=0; i<stat_list_buttons.length; i++) {
               $(stat_list_buttons[i]).addClass("hidden");
            }
            $(stat_list_buttons[aI]).removeClass("hidden");

            $(this).attr("active", aI);
            
            var preference = {
                key : "statDesc",
                value : aI
            }
            setCookies(preference);
            showCards();
        });
        function selectStatListButton(index) {            
            for(var i=0; i<stat_list_buttons.length; i++) {
                $(stat_list_buttons[i]).addClass("hidden");
            }
            $(stat_list_buttons[index]).removeClass("hidden");
        }

        $('#pick_date').on('apply.daterangepicker', function(ev, picker) {
            //console.log(picker.startDate.format('DD/MM/YY'));
            //console.log(picker.endDate.format('DD/MM/YY'));
            var startDate = picker.startDate.format('DD/MM/YY');
            var endDate = picker.endDate.format('DD/MM/YY');
            var val = "";
            //1
            if(startDate === endDate) {
                setCookies({key: "day", value: startDate})
                $(this).attr("title", startDate);
                //val = startDate;
            }
            else {
                setCookies({key: "day", value: startDate+"(-)"+endDate});
                $(this).attr("title", startDate+" - "+endDate);
                //val = startDate+"(-)"+endDate;
            }
            //2
            //one line setCookies
            //setCookies({key: "day", value: val});
            //$(this).attr("title", val);
            showCards();
        });
        $('#pick_date').on('cancel.daterangepicker', function(ev, picker) {
            //console.log(picker.startDate.format('DD/MM/YY'));
            //console.log(picker.endDate.format('DD/MM/YY'));
            setCookies({key: "day", value: "all"});
            $(this).attr("title", "all");
            showCards();
        });

        function setCookies(preference) {
            //1
            /* for (var key in preference) {
                if (preference.hasOwnProperty(key)) {
                var cookieName = key;
                var cookieValue = preference[key];
                document.cookie = cookieName + "=" + encodeURIComponent(cookieValue) + "; expires=" + expirationDate.toUTCString() + "; path=/";
                }
            }
            */

            //2
            //!->Key List
            //listDesc
            //statDesc
            localStorage.setItem(preference["key"], preference["value"]);
        }

        function getCookies(key) {
            var tercih = localStorage.getItem(key);
            return tercih;
        }       
        

        function starterKit() {
            showCards();

            //datePicker Settings
            var localeEN = {
                "format": "DD/MM/YY",
                "separator": " - ",
                "applyLabel": "Apply",
                "cancelLabel": "All Days",
                "fromLabel": "From",
                "toLabel": "To",
                "customRangeLabel": "Custom",
                "weekLabel": "W",
                "daysOfWeek": ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                "monthNames": [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December"
                ],
                "firstDay": 1
                };
        
                var localeDE = {
                "format": "DD/MM/YY",
                "separator": " - ",
                "applyLabel": "Anwenden",
                "cancelLabel": "Alle Tage",
                "fromLabel": "Von",
                "toLabel": "Bis",
                "customRangeLabel": "Benutzerdefiniert",
                "weekLabel": "W",
                "daysOfWeek": ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
                "monthNames": [
                    "Januar",
                    "Februar",
                    "März",
                    "April",
                    "Mai",
                    "Juni",
                    "Juli",
                    "August",
                    "September",
                    "Oktober",
                    "November",
                    "Dezember"
                ],
                "firstDay": 0
                };
                
                var localeTR = {
                "format": "DD/MM/YY",
                "separator": " - ",
                "applyLabel": "Uygula",
                "cancelLabel": "Tüm Günler",
                "fromLabel": "Başlangıç",
                "toLabel": "Bitiş",
                "customRangeLabel": "Özel",
                "weekLabel": "Hft",
                "daysOfWeek": ["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pz"],
                "monthNames": [
                    "Ocak",
                    "Şubat",
                    "Mart",
                    "Nisan",
                    "Mayıs",
                    "Haziran",
                    "Temmuz",
                    "Ağustos",
                    "Eylül",
                    "Ekim",
                    "Kasım",
                    "Aralık"
                ],
                "firstDay": 0
                };

            var today = new Date();
            var day = today.getDate();
            var month = today.getMonth() + 1;
            var yearSlice = today.getFullYear().toString().slice(-2);
            if (day < 10) {
                day = "0" + day;
            }
            if (month < 10) {
                month = "0" + month;
            }
            var formattedDate = day + "/" + month + "/" + yearSlice;
            //geridön
            $('#pick_date').attr("title", formattedDate);
            $('#pick_date').daterangepicker({
                "locale": localeEN,
                /* "startDate": startDate, */
                "startDate": "10/06/23",
                "endDate": formattedDate,
                /* "minDate":  */
                "maxDate": formattedDate,
                "opens": "center",
                "drops": "bottom"
            });
            
        }

        function showCards() {
            //card container list type and stat type settings
            //cookies
            var listDesc = getCookies("listDesc");
            if(listDesc) {
                selectListTypeButton(listDesc);
                $("#list_type_buttons").attr("active", listDesc);
            } else {
                $("#list_type_buttons").attr("active", "2");
            }
            //log("localData: " + listDesc + " - active: " + $("#list_type_buttons").attr("active"));
            var statDesc = getCookies("statDesc");
            if(statDesc) {
                selectStatListButton(statDesc);
                $("#stat_list_buttons").attr("active", statDesc);
            }

            listDesc = parseInt(listDesc);
            statDesc = parseInt(statDesc);

            switch (listDesc) {
                case 0:
                    listDesc = "a_to_z"
                    break;
                case 1:
                    listDesc = "z_to_a"
                    break;
                case 2:
                    listDesc = "1_to_31"
                    break;
                case 3:
                    listDesc = "31_to_1"
                    break;
                default:
                    statDesc = "31_to_1"
                    break;
            }

            switch (statDesc) {
                case 0:
                    statDesc = "normal"
                    break;
                case 1:
                    statDesc = "finish"
                    break;
                case 2:
                    statDesc = "delete"
                    break;
                default:
                    statDesc = "normal"
                    break;
            }

            var day = getCookies("day");
            //day night
            $.ajax({
                url: 'php/get_cards.php',
                type: 'POST',
                data: {"day": day, "list_desc": listDesc, "stat": statDesc},
                success: function(response) {
                    //console.log(response);
                    //specific day or to day | stat: normal, finished, deleted | 
                    //list_type: a_to_z, z_to_a, 1_to_31, 31_to_1
                    var jsonData = JSON.parse(response);
                    $("#myGrid").empty();
                    for(var i=0; i<jsonData.length; i++) {
                        $("#myGrid").append(jsonData[i]);
                    }
                }
            });
        }

        function notificationText(text) {
            //maybe i wil add notificationtext but now it will be normal alert
            //alert(text);
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