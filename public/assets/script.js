
$(document).ready(function(){

    $("#view-portfolio").hover(function(){
        $("#down-arrow").animate({ paddingTop: "20px" });
        }, function() {
        $("#down-arrow").animate({ paddingTop: "0px" });
    });



    //---PROJECT OVERLAY SCRIPT---//
    if ( $(window).width() > 667) { 
        $( ".project-wrap" ).each(function( index ) {
            var overlay = jQuery(this).children(".overlay");
            var imageURL = jQuery(this).children(".image-url");
            //console.log(this.innerHTML);
            $(this).mouseenter(function(){
               overlay.animate({ opacity: "0" });
               imageURL.animate({ opacity: "1", bottom: "+=50" });
            })
            $(this).mouseleave(function(){
               overlay.animate({ opacity: "1" });
               imageURL.animate({ opacity: "0", bottom: "-=50" });
            })
        });
    };

    //---ONE PAGER SMOOTH SCROLL SCRIPT---//

    // Select all links with hashes
    $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')

    .click(function(event) {
        // On-page links
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
            && 
            location.hostname == this.hostname
            ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually going to happen
                event.preventDefault();
                $('html, body').animate({
                scrollTop: target.offset().top
                }, 1000, function() {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                });
            };
        };
    });

    // Contact Me Email script
    $("#sender" && "#address").change(function() {
        $("#send-email").removeAttr("disabled");
        console.log( "Handler for .change() called." );
    });
    
    $("#send-email").click(function(event) {
        event.preventDefault();
        var name = $("#sender").val().trim();
        var address = $("#address").val().trim();
        var text = $("#message").val().trim();
        $("#confirm").text("Sending your message...");
          $.post("/email", {
            from: name,
            address: address,
            text: text
            }, function(data) {
              if (data === "buffalochicken") {
                $("#confirm").empty().html("Your email was sent. I will be in touch with you soon!");
                clearMessage();
              } else {
                alert("Email not sent!");
              }
          });
        $("#sender").val("");
        $("#address").val("");
        $("#message").val("");
    });
});

function clearMessage() {
    setTimeout(confirm, 3000);
}

function confirm() {
    $("#confirm").fadeOut("slow");
};      