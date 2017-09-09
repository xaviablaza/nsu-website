import 'tether'
import 'jquery'
import 'popper.js'
import 'bootstrap/dist/js/bootstrap'

$(document).ready(() => {
    let timeout = null;
    let target = $("#title-card").offset().top +  $("#title-card").height()

    $(window).scroll(function () {
        if (!timeout) {
            timeout = setTimeout(function () {
                clearTimeout(timeout)
                timeout = null;
                if ($(window).scrollTop() >= target) {
                  $('#header').removeClass('nav-hidden')
                } else {
                  $('#header').addClass('nav-hidden')
                }
            }, 250)
        }
    })
})
