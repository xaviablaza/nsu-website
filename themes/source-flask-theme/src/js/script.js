import $ from 'jquery'
// import TweenMax from 'gsap/TweenMax'
// import TimelineMax from 'gsap/TimelineMax'

$(document).ready(() => {
  /* Smooth scrolling */
  // Select all links with hashes
  $('a[href*="#"]')
  // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
    // On-page links
      if (
        window.location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') &&
        window.location.hostname === this.hostname
      ) {
      // Figure out element to scroll to
        var target = $(this.hash)
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']')
        // Does a scroll target exist?
        if (target.length) {
        // Only prevent default if animation is actually gonna happen
          event.preventDefault()
          $('html, body').animate({
            scrollTop: target.offset().top - 70
          }, 1000, function () {
          // Callback after animation
          // Must change focus!
            var $target = $(target)
            $target.focus()
            if ($target.is(':focus')) { // Checking if the target was focused
              return false
            } else {
              $target.attr('tabindex', '-1') // Adding tabindex for elements not focusable
              $target.focus() // Set focus again
            }
          })
        }
      }
    })
})

// Set the date we're counting down to
var now = new Date().getTime()
var countdown
var voteStart = new Date('Sep 18, 2017 00:00:00').getTime()
var voteEnd = new Date('Sep 20, 2017 17:00:00').getTime()

if (voteStart - now > 0) {
  countdown = voteStart
  document.getElementById("vote-title").innerHTML = 'voting starts in'
} else if (voteEnd - now > 0) {
  countdown = voteEnd
  document.getElementById("vote-title").innerHTML = 'voting ends in'
} else {
  document.getElementById("vote-title").innerHTML = 'voting has ended!'
}

// Update the count down every 1 second
var x = setInterval(() => {
  // Get todays date and time
  var now = new Date().getTime()

  // Find the distance between now an the count down date
  var distance = countdown - now

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24))
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  var seconds = Math.floor((distance % (1000 * 60)) / 1000)

  // Display the result in the element with id="demo"
  document.getElementById('clock').innerHTML = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's '

  // If the count down is finished, write some text 
  if (distance < 0) {
    clearInterval(x)
    document.getElementById('clock').innerHTML = 'refresh the page to vote'
  }
}, 1000)
