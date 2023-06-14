$(function() {

    var div = document.getElementById("list_type_buttons");
    var iElements = div.getElementsByTagName("i");

    var div2 = document.getElementById("stat_list_buttons");
    var iElements2 = div2.getElementsByTagName("i");

    function checkScreenSize() {
        if (window.innerWidth <= 580) {
            
            for (var i = 0; i < iElements.length; i++) {
                var element = iElements[i];
                element.classList.replace("fa-2xl", "fa-lg");
            }
            for (var i = 0; i < iElements2.length; i++) {
                var element = iElements2[i];
                element.classList.replace("fa-2xl", "fa-lg");
            }
            //add_card_button_i.classList.replace("fa-2xl", "fa-lg");
            $("#acb").removeClass("fa-2xl").addClass("fa-lg");
            
            //pick_Date.classList.replace("fa-2xl", "fa-lg");
            $("#pick_date").removeClass("fa-2xl").addClass("fa-lg");

        } else {
            
            for (var i = 0; i < iElements.length; i++) {
                var element = iElements[i];
                element.classList.replace("fa-lg", "fa-2xl");
            }
            for (var i = 0; i < iElements2.length; i++) {
                var element = iElements2[i];
                element.classList.replace("fa-lg", "fa-2xl");
            }
            $("#add_cart_button i").removeClass("fa-lg").addClass("fa-2xl");
            $("#pick_date").removeClass("fa-lg").addClass("fa-2xl");
        }
    }

    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();

    var flags_modal = $("#flags_modal");

    $("#single_flag").on("click", () => {
        $(flags_modal).css("display", "block");
    });

    $("#search_cont i").on("click", () => {
        flags_modal.css("display", "none");
    });

    $(".close").on("click", () => {
        flags_modal.css("display", "none");
    });


    $(window).on("click", function(event) {
        if (event.target.id == $(flags_modal).attr("id")) {
            flags_modal.css("display", "none");
        }
    })
});