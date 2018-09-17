var navopen = false
var dropdownOpen = false

function capitalize (lower) {
  var upper = lower.charAt(0).toUpperCase() + lower.substr(1)
  return upper
}

$(document).ready(() => {
  // Check Log in
  axios
    .get('/api/loggedIn')
    .then(function (data) {
      if (!data.ok) throw new Error('Not logged in!')
      // logged in
      $('#login').hide()
      $('#accountSetting').show()
      $('#logout').show()
      // show username
      if (data.type === 'admin') {
        window.location.replace('/admin')
      } else if (data.type === 'partner') {
        window.location.replace('/partner')
      } else {
        $('.username').html(data.username)
      }
    })
    .catch(function () {
      $('#login').show()
      $('#accountSetting').hide()
      $('#logout').hide()
      $('.username').html('')
    })

  // Get zones
  axios
    .get('/api/zones')
    .then(function (resp) {
      const nav = document.querySelector('#navigation')
      resp.data = Array.prototype.slice.call(resp.data)
      if (resp.data.length < 1) return false
      resp.data.forEach(function (zone, idx) {
        if (idx % 3 === 0) {
          const dummy = document.createElement('li')
          nav.appendChild(dummy)
        }
        const li = document.createElement('li')
        const a = document.createElement('a')
        a.setAttribute('href', '#')
        a.addEventListener('click', function (e) {
          getOffer(zone.name)
        })
        a.innerHTML = capitalize(zone.name)
        li.appendChild(a)
        nav.appendChild(li)
      })
    })
    .catch(function (err) {
      console.error(err)
    })

  // Navigation Menu
  $('#hamIcon').click(() => {
    if (navopen) {
      // close the side panel
      $('.hamMenu').css('left', '0')
      $('.sidePanel').css('left', '-300px')
      navopen = !navopen
    } else {
      // open the side panel
      $('.hamMenu').css('left', '300px')
      $('.sidePanel').css('left', '0')
      navopen = !navopen
    }
  })

  // Back to nav from spin
  $('#backArrow').click(() => {
    $('.zones').addClass('pushRight')
    if ($('.zones').hasClass('pushLeft')) {
      $('.zones').removeClass('pushLeft')
    }
    $('#postGeo').fadeOut()
    $('#preGeo').fadeIn()
    $('#backArrow').css('display', 'none')
    $('#hamIcon').css('color', '#222')
  })

  // spin button
  $('#spin').click(() => {
    spin()
  })

  // close btn of notification
  $('.notification .closeNotification').click(() => {
    $('.dimmer').fadeOut(400)
    $('.notification').fadeOut(400)
  })

  // user dropdown
  $('.userIcon').click(() => {
    if (dropdownOpen) {
      $('.dropdown').slideUp('slow')
      dropdownOpen = false
    } else {
      $('.dropdown').slideDown('slow')
      dropdownOpen = true
    }
  })
})

function getOffer (zone) {
  $('.zones').addClass('pushLeft')
  if ($('.zones').hasClass('pushRight')) {
    $('.zones').removeClass('pushRight')
  }
  $('#hamIcon').css('color', 'white')
  $('#geoLocation')[0].innerHTML = zone
  $('#preGeo').fadeOut()
  $('#postGeo').fadeIn()
  $('#backArrow').css('display', 'inline-block')
  // get offer for the zone
}

function getRandomInt (max) {
  return Math.floor(Math.random() * Math.floor(max))
}

function qr (image, code) {
  $('.notification h5').html(code)
  $('.notification img').attr('src', image)
  $('.notification').fadeIn(400)
  $('.dimmer').fadeIn(200)
}

function notification (message) {
  $('.notification h5').html(message)
  $('.notification img').hide()
  $('.notification').fadeIn(400)
  $('.dimmer').fadeIn(200)
}

function rotate () {
  var rotateangle = 135 + getRandomInt(4) * 360
  $('.wheelHolder img').css('transition', '1.2s ease-out')
  $('.wheelHolder img').css('transform', 'rotate(' + rotateangle + 'deg)')
}

function spin () {
  var width = window.innerWidth > 0 ? window.innerWidth : screen.width
  if (width > 720) {
    // pc
    // check log in
    var rotateangle = 135 + 5 * 360
    $('.wheelHolder img').css('transition', '3s ease-out')
    $('.wheelHolder img').css('transform', 'rotate(' + rotateangle + 'deg)')
  } else {
    // mobile
    // check log in
    // slide animation
    $('.zone').css('margin-left', '-200%')
    $('.about').css('margin-left', '-100%')
    setTimeout(rotate, 500)
  }
  // animaton
}
