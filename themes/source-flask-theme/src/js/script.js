import $ from 'jquery'
import TweenMax from 'gsap/TweenMax'
import TimelineMax from 'gsap/TimelineMax'

$(document).ready(() => {
  TweenMax.set('svg', {
    visibility: 'visible'
  })

  let tl = new TimelineMax()
  tl.staggerTo('#bubbleGroup circle', 3, {
    attr: {
      cy: 200
    },
    ease: TweenMax.Power2.easeIn,
    repeat: -1
  }, 0.6)

  let animatedFooter = $('#bottom-title-animate-message')

  let messageStack = ['|amazing website?|', '|intuitive user experience?|', '|affordable pricing?|']
  let charIndex = 0
  let lineIndex = 0

  let message = messageStack[0]

  let state = 'deleting'

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

  function writingUpdate () {
    let line = messageStack[lineIndex]
    switch (state) {
      case 'writing':
        message += line[charIndex]
        charIndex++
        if (charIndex >= line.length) {
          state = 'deleting'
          charIndex = 0
          setTimeout(writingUpdate, 10000)
        } else {
          setTimeout(writingUpdate, 100)
        }
        break
      case 'deleting':
        message = message.substr(0, message.length - 1)
        if (message.length === 0) {
          lineIndex++
          if (lineIndex >= messageStack.length) {
            lineIndex = 0
          }
          state = 'writing'
          setTimeout(writingUpdate, 2000)
        } else {
          setTimeout(writingUpdate, 100)
        }
        break
    }

    let output = ''
    let highlight = false
    for (let i = 0; i < message.length; i++) {
      if (message[i] === '|') {
        if (highlight === false) {
          highlight = true
          output += '<span>'
        } else {
          output += '</span>'
        }
      } else {
        output += message[i]
      }
    }
    if (highlight === true) {
      output += '</span>'
    }

    animatedFooter.html(output + ' ')
  }
  setTimeout(writingUpdate, 1000)
})

