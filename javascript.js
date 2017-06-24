/**
 * Created by Ben on 24/06/2017.
 */

$( document ).ready(function() {

    $(document).ready(function(){
        $("#container").hide(0).delay(500).fadeIn(3000)
    });

    $(document).ready(function(){
        $("#project1").hide(0).delay(1000).fadeIn(2000)
    });
    $(document).ready(function(){
        $("#project2").hide(0).delay(1000).fadeIn(2500)
    });
    $(document).ready(function(){
        $("#project3").hide(0).delay(1000).fadeIn(3000)
    });
    $(document).ready(function(){
        $("#project4").hide(0).delay(1000).fadeIn(3500)
    });

    $(document).ready(function(){
        $("#main").hide(0)
    });

    $("#project1").click(function(){
        $("#main").fadeIn(2000);
    });

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
                    // Only prevent default if animation is actually gonna happen
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
                }
            }
        });

});