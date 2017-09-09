import 'tether'
import 'jquery'
import 'popper.js'
import 'bootstrap/dist/js/bootstrap'

$(document).ready(() => {
  let timeout = null
  let target = $('#title-card').offset().top + $('#title-card').height()

  $(window).scroll(function () {
    if (!timeout) {
      timeout = setTimeout(function () {
        clearTimeout(timeout)
        timeout = null
        if ($(window).scrollTop() >= target) {
          $('#header').removeClass('nav-hidden')
        } else {
          $('#header').addClass('nav-hidden')
        }
      }, 250)
    }
  })
  // Set the date we're counting down to
  $('.vote-btn').hide()
  let voteStart = new Date('Sep 18, 2017 00:00:00').getTime()
  const voteEnd = new Date('Sep 20, 2017 17:00:00').getTime()
  // Update the count down every 1 second
  const x = setInterval(() => {
    // Get todays date and time
    const now = new Date().getTime()

    // Find the distance between now an the count down date
    let distance = -1

    if (voteStart - now > 0) {
      distance = voteStart - now
      document.getElementById('vote-title').innerHTML = 'voting starts in'
      document.getElementById('voting-flag').innerHTML = 'voting starts in'
    } else if (voteEnd - now > 0) {
      distance = voteEnd - now
      document.getElementById('vote-title').innerHTML = 'voting ends in'
      document.getElementById('voting-flag').innerHTML = 'voting ends in'
      $('.vote-btn').show()
    } else {
      document.getElementById('vote-title').innerHTML = 'voting has ended!'
      document.getElementById('voting-flag').innerHTML = 'voting has ended!'
    }

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)

    // Display the result in the element with id="demo"
    document.getElementById('clock').innerHTML = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's '
    document.getElementById('clock1').innerHTML = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's '

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x)
      document.getElementById('clock').innerHTML = ''
      $('.vote-btn').hide()
    }
  }, 1000)
})
