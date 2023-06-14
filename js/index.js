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

    var senkron0 = "Sync";
    var senkron1 = "Syncing...";
    var emptyGrid0 =  "I couldn't find the note you were looking for. Maybe there is no such note.";
    var emptyGrid1 = "It seems like you haven't created any notes yet. Or maybe the app threw an error?";
    var emptyGrid2 = "You may not have finished something like this. Or maybe you haven't even started.";
    var emptyGrid3 = "You haven't finished anything yet. Hopefully, I must have written the code wrong.";
    var emptyGrid4 = "It seems like you couldn't find what you were looking for in me. Like a breakup sentence.";
    var emptyGrid5 = "The Deleted folder appears to be empty. It will be filled soon. Far away, in euros.";
    var bigError_t = "An extraordinary error occurred. A kind of error that will make the programmer think.";
    var error_t = "An unexpected error. I was caught unprepared."
    
    function notificationText(text) {
        //maybe i wil add notificationtext but now it will be normal alert
        //alert(text);
    }
    function error() {
        alert(error);
    }

    function bigError() {
        alert(bigError);
    }

    function log(data) {
        console.log(data);
    }

    var refreshable = true;

    function handleBlurOnH3(element) { //old
        element.contentEditable = false;
        refreshable = false;
        var card = $(element).parent().parent();
        var h3_data_id = $(card).attr("data-id");

        var newText = $(element).text();
        
        var rotateElement = $(element).parent().children(".top_bar_card_right_buttons").children(".sync").children("i");
        $(rotateElement).css('animation', 'rotate 2s linear infinite'); 
        $(rotateElement).attr("title", senkron1);
        
        $.ajax({
            url: 'php/update_cards.php',
            type: 'POST',
            data: {change: "top", id: h3_data_id, text: newText},
            success: function(response) {
                var jsonData = JSON.parse(response);
                if(jsonData["ok"]) {
                    $(rotateElement).css('animation', 'none');
                    $(rotateElement).attr("title", senkron0);
                    $(element).parent().parent().find(".sync_date").text(jsonData["sync_date"]);
                    refreshable = true;
                }
                else {
                    bigError();    
                }
            }
        });
        element.contentEditable = true;
    }

    function enterDisable(event) {
        if (event.keyCode === 13) {
            event.target.blur();
        }
    }

    function handleBlur(textarea) { //new
        refreshable = false;
        var card = $(textarea).parent().parent();
        var card_id = $(card).attr("data-id");
        var newText = $(textarea).val();

        var rotateElement = $(textarea).parent().children(".top_bar_card_right_buttons").children(".sync").children("i");
        $(rotateElement).css('animation', 'rotate 2s linear infinite'); 
        $(rotateElement).attr("title", senkron1);
        
        $.ajax({
            url: 'php/update_cards.php',
            type: 'POST',
            data: {change: "body", id: card_id, text: newText},
            success: function(response) {
                var jsonData = JSON.parse(response);
                if(jsonData["ok"]) {
                    $(rotateElement).css('animation', 'none');
                    $(rotateElement).attr("title", senkron0);
                    $(card).find(".sync_date").text(jsonData["sync_date"]);
                    refreshable = true;
                }
                else {
                    bigError();    
                }
            }
        });
    }

    /* function checkRefreshable() {
        if (refreshable) {
            return true;
        }
        else {
            $( "#dialog-confirm" ).dialog({
                resizable: false,
                height: "auto",
                width: 400,
                modal: true,
                buttons: {
                    "": function() {
                        console.log("");
                        $( this ).dialog( "close" );
                    },
                    Cancel: function() {
                        $( this ).dialog( "close" );
                    }
                }
            });
            return false;
        }
    } */

    $(function() {

        $(window).on('beforeunload', function() {
            if(refreshable) return;
            else return false;
        });

        var fontsArray = [
            "Roboto-Medium",
            "Pangolin-Regular",
            "Poppins-Medium"
        ];    

        $("#logo").on("click", () => {
            setFont(true);
        });

        function setFont(increase) {
            var index = getCookies("fontsIndex");
            if(index == null) {
                index = 0;
                setCookies({key: "fontsIndex", value: index});
            }
            else {
                if(increase) index = parseInt(index) + 1;
                if(index == fontsArray.length) index = 0;
                setCookies({key: "fontsIndex", value: index})
            }
            $("body").css("font-family", fontsArray[index]);
        }

        //moved here before starterKit(); <- what is this ; for :D
        var list_type_buttons = [];
        var stat_list_buttons = [];
        $("#list_type_buttons i").each(function() {
            list_type_buttons.push(this);
        });
        $("#stat_list_buttons i").each(function() {
            stat_list_buttons.push(this);
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

        starterKit();

        $('body').on('wheel', "h3", function(event) {
            //event.preventDefault();
            $(this).stop(true, false);
            var scrollAmount = event.originalEvent.deltaY;
            $(this).scrollLeft($(this).scrollLeft() + scrollAmount); 
        }).on("mouseenter", "h3", function() {
            var textWidth = $(this).get(0).scrollWidth;
            
            var textLenght = $(this).text().split(" ").length;
            var textScrollSpeed = textLenght * 350;
            //ortalama bir kelimenin okunuş süresi 250ms - 400ms arası
            //log(textLenght + " - " + textScrollSpeed);

            $(this).stop().animate({scrollLeft: textWidth}, textScrollSpeed);
            
        })
        .on("mouseout", "h3", function () {
            var textLenght = $(this).text().split(" ").length;
            var textScrollSpeed = textLenght * 200;
            

            $(this).stop().animate({scrollLeft: 0}, textScrollSpeed);
        })
        .on("click", "h3", function() {
            last_click = $(this);
            $(this).stop();
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
                        $(target).fadeOut("300", function() {
                            $(this).remove();
                            if ($('#myGrid').children().length == 0) {
                                $("#emptyGrid").css("display", "flex");
                            }
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
                            if ($('#myGrid').children().length == 0) {
                                $("#emptyGrid").css("display", "flex");
                            }
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
                data: {"locale": getCookies("locale")},
                type: 'POST',
                success: function(response) {
                    var jsonData = JSON.parse(response);
                    //console.log(jsonData["card"]);
                    if(!jsonData["error"]) {
                        //response 1
                        /* var preference = {
                            key: "listDesc",
                            value: "3"
                        }; */
                        //setCookies(preference);
                        setCookies({key: "listDesc", value: "3"})
                        selectListTypeButton(3);
                        $("#list_type_buttons").attr("active", 3);
                        
                        setCookies({key: "statDesc", value: "0"});
                        selectStatListButton(0);
                        $("#stat_list_buttons").attr("active", 0);
                        setCookies({key: "day", value: "all"});
                        showCards();
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

        var typingTimeout;
        $("body").on("input", ".textarea_writable", function() {
            clearTimeout(typingTimeout);

            refreshable = false;
            var card = $(this).parent().parent();
            var card_id = $(card).attr("data-id");
            var newText = $(this).val();

            var rotateElement = $(card).find(".top_bar_card_right_buttons .sync i");
            $(rotateElement).css('animation', 'rotate 2s linear infinite');
            $(rotateElement).attr("title", "Senkronize ediliyor..");
            typingTimeout = setTimeout(function() {
                $.ajax({
                    url: 'php/update_cards.php',
                    type: 'POST',
                    data: {change: "body", id: card_id, text: newText},
                    success: function(response) {
                        var jsonData = JSON.parse(response);
                        if(jsonData["ok"]) {
                            $(rotateElement).css('animation', 'none');
                            $(rotateElement).attr("title", "Senkron");
                            $(card).find(".sync_date").text(jsonData["sync_date"]);
                            refreshable = true;
                        }
                        else {
                            bigError();    
                        }
                    }
                });
            }, 2000);
        });

        var typingTimeoutForH3;
        $("body").on("input", ".h3hover_normal", function() {
            clearTimeout(typingTimeoutForH3);
            
            refreshable = false;
            var card = $(this).parent().parent();
            var card_id = $(card).attr("data-id");
            var newText = $(this).text();
            
            var rotateElement = $(card).find(".top_bar_card_right_buttons .sync i");
            $(rotateElement).css('animation', 'rotate 2s linear infinite');
            $(rotateElement).attr("title", "Senkronize ediliyor..");

            typingTimeoutForH3 = setTimeout(function() {
                $.ajax({
                    url: 'php/update_cards.php',
                    type: 'POST',
                    data: {change: "top", id: card_id, text: newText},
                    success: function(response) {
                        var jsonData = JSON.parse(response);
                        if(jsonData["ok"]) {
                            $(rotateElement).css('animation', 'none');
                            $(rotateElement).attr("title", "Senkron")
                            $(card).find(".sync_date").text(jsonData["sync_date"]);
                            refreshable = true;
                        }
                        else {
                            bigError();    
                        }
                    }
                });
            }, 2000);
        });

        $("#search_input").on("keyup", function(event) {
            setCookies({key: "day", value: "all"});
            showCards();
        });

        $('#pick_date').on('apply.daterangepicker', function(ev, picker) {
            var startDate = picker.startDate.format('DD/MM/YY');
            var endDate = picker.endDate.format('DD/MM/YY');
            /* var startDate = picker.startDate.format('YY/MM/DD');
            var endDate = picker.endDate.format('YY/MM/DD'); */
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
            $(this).attr("title", "Bütün günler");
            showCards();
        });

        function setDataToFront(data) {
            $("#logo").attr("title", data.logo)
            $("#az").attr("title", data.az)
            $("#za").attr("title", data.za)
            $("#ey").attr("title", data.ey)
            $("#ye").attr("title", data.ye)
            $("#add_card_button").attr("title", data.add_card_button)
            $("#search_input").attr("placeholder", data.search_input)
            $("#normal").attr("title", data.normal)
            $("#ends").attr("title", data.ends)
            $("#deletes").attr("title", data.deletes)

            senkron0 = data.senkron0;
            senkron1 = data.senkron1;
            emptyGrid0 = data.emptyGrid0;
            emptyGrid1 = data.emptyGrid1;
            emptyGrid2 = data.emptyGrid2;
            emptyGrid3 = data.emptyGrid3;
            emptyGrid4 = data.emptyGrid4;
            emptyGrid5 = data.emptyGrid5;
            bigError_t = data.bigError;
            error_t = data.error;
        }

        function setFrontLanguages() {
            var locale = getCookies("locale");
            var setLocale = {};
            if(locale == "TR") {
                $.getJSON("json/tr.json", function(data) {
                    setLocale = localeTR;
                    setDataToFront(data);
                });
            }
            if(locale == "EN") {
                $.getJSON("json/en.json", function(data) {
                    setLocale = localeEN;
                    setDataToFront(data);
                });
            }
            if(locale == "DE") {
                $.getJSON("json/de.json", function(data) {
                    setLocale = localeDE;
                    setDataToFront(data);
                });
            }

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
            $.ajax({
                url: "php/get_min_date.php",
                type: "POST",
                success: function(data) {
                    if(data != "non") {
                        dataArr = data.replace(/"/g, '').split('-');
                        var minDate = dataArr[2] + "/" + dataArr[1] + "/" + dataArr[0].slice(-2);
                        setCookies({key: "startDate", value: minDate});
                        setCookies({key: "endDate", value: formattedDate});
                        $('#pick_date').attr("title", minDate + "-" +formattedDate);
                        $('#pick_date').daterangepicker({
                            "locale": setLocale,
                            "startDate": minDate,
                            "endDate": formattedDate,
                            "minDate": minDate,
                            "maxDate": formattedDate,
                            "opens": "center",
                            "drops": "bottom"
                        });
                    } 
                    else {
                        $('#pick_date').attr("title", formattedDate);
                        $('#pick_date').daterangepicker({
                            "locale": setLocale,
                            "startDate": formattedDate,
                            "endDate": formattedDate,
                            "maxDate": formattedDate,
                            "opens": "center",
                            "drops": "bottom"
                        });
                    }
                },
                error: function() {
                    bigError();
                }
            })

            
        }

        $("#lang_buttons img").click(function() {
            var imgDizi = $("#lang_buttons img");
            var tiklananIndex = imgDizi.index(this);
            var langObj = {key: "locale", value: ""}
            switch(tiklananIndex) {
                case 0:
                    langObj.value = "TR";
                    setCookies(langObj);
                    setFrontLanguages();
                    showCards();
                    break;
                case 1:
                    langObj.value = "EN";
                    setCookies(langObj);
                    setFrontLanguages();
                    showCards();
                    break;
                case 2:
                    langObj.value = "DE";
                    setCookies(langObj);
                    setFrontLanguages();
                    showCards();
                    break;
            }
        });

        function starterKit() {
            
            setFont();

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

            var setLocale = {};
            switch(getCookies("locale")) {
                case "TR": 
                    setLocale = localeTR;
                    break;
                case "EN": 
                    setLocale = localeEN;
                    break;
                case "DE": 
                    setLocale = localeDE;
                    break;
                default: 
                    setCookies({key: "locale", value: "TR"});
                    setLocale = localeTR;
                    break;
            }
            
            setFrontLanguages();

            var formattedDate = day + "/" + month + "/" + yearSlice;
            
            makeAjaxRequest('php/get_min_date.php')
            .then(function(data) {
                //log(data);
                if(data != "non") {
                    dataArr = data.replace(/"/g, '').split('-');
                    var minDate = dataArr[2] + "/" + dataArr[1] + "/" + dataArr[0].slice(-2);
                    setCookies({key: "startDate", value: minDate});
                    setCookies({key: "endDate", value: formattedDate});
                    $('#pick_date').attr("title", minDate + "-" +formattedDate);
                    $('#pick_date').daterangepicker({
                        "locale": setLocale,
                        "startDate": minDate,
                        "endDate": formattedDate,
                        "minDate": minDate,
                        "maxDate": formattedDate,
                        "opens": "center",
                        "drops": "bottom"
                    });
                } 
                else {
                    $('#pick_date').attr("title", formattedDate);
                    $('#pick_date').daterangepicker({
                        "locale": setLocale,
                        "startDate": formattedDate,
                        "endDate": formattedDate,
                        "maxDate": formattedDate,
                        "opens": "center",
                        "drops": "bottom"
                    });
                }
                
            }).then(function() {
                showCards();
            })
            .catch(function(error) {
                bigError();
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
                $("#list_type_buttons").attr("active", "3");
                selectListTypeButton(3);
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
                    listDesc = "31_to_1"
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

            var day = getCookies("day"); //all or selected date or 2 selected date

            if(day == null || day == "all") {
                day = "all";
                $('#pick_date').data('daterangepicker').setStartDate(getCookies("startDate"));
                $('#pick_date').data('daterangepicker').setEndDate((getCookies("endDate")));
            }
            else if(day.includes("(-)")){
                $('#pick_date').data('daterangepicker').setStartDate(day.split("(-)")[0]);
                $('#pick_date').data('daterangepicker').setEndDate(day.split("(-)")[1]);
                
            }
            else {
                $('#pick_date').data('daterangepicker').setStartDate(day);
                $('#pick_date').data('daterangepicker').setEndDate(day);
            }

            var search_text = $("#search_input").val();
            
            $.ajax({
                url: 'php/get_cards.php',
                type: 'POST',
                data: {"search_text": search_text, "day": day, "list_desc": listDesc, "stat": statDesc, "lang": getCookies("locale")},
                success: function(response) {
                    //specific day or to day | stat: normal, finished, deleted | 
                    //list_type: a_to_z, z_to_a, 1_to_31, 31_to_1
                    $("#myGrid").empty();
                    var jsonData = JSON.parse(response);
                    if(!Object.keys(jsonData).length){
                        //boş bırak
                        //alert("boş");
                        $("#emptyGrid").css("display", "flex");
                        if(statDesc == "normal") {
                            $("#emptyGrid img").attr("src","imgs/empty-folder.png");
                            if(search_text.length > 0) {
                                $("#emptyGrid b").text(emptyGrid0);
                            }
                            else {
                                $("#emptyGrid b").text(emptyGrid1);
                            }
                            
                        }
                        if(statDesc == "finish") {
                            $("#emptyGrid img").attr("src","imgs/empty-folder.png");
                            if(search_text.length > 0) {
                                $("#emptyGrid b").text(emptyGrid2);
                            }
                            else {
                                $("#emptyGrid b").text(emptyGrid3);
                            }
                            
                        }
                        if(statDesc == "delete") {
                            $("#emptyGrid img").attr("src","imgs/cold.png");
                            if(search_text.length > 0) {
                                $("#emptyGrid b").text(emptyGrid4);
                            }
                            else {
                                $("#emptyGrid b").text(emptyGrid5);
                            }
                            
                            
                        }
                    }
                    else {
                        for(var i=0; i<jsonData.length; i++) {
                            $("#myGrid").append(jsonData[i]);
                        }
                        $("#emptyGrid").css("display", "none");
                    }
                    
                }
            });
        }

        function makeAjaxRequest(url) {
            return new Promise(function(resolve, reject) {
              $.ajax({
                url: url,
                method: 'POST',
                success: function(data) {
                  resolve(data);
                },
                error: function(xhr, status, error) {
                  reject(error);
                }
              });
            });
        }
    });