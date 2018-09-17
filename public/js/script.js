var navopen = false
var dropdownOpen = false

function capitalize (lower) {
  var upper = lower.charAt(0).toUpperCase() + lower.substr(1)
  return upper
}

$(document).ready(() => {
  // Check Log in
  const root = window.location.origin
  // $.ajax({
  //   method: 'GET',
  //   url: root + '/api/loggedIn',
  //   success: data => {
  //     console.log(data)
  //     if (data.ok) {
  //     } else {
  //     }
  //   }
  // })
  $.getJSON('/api/loggedIn')
    .done(data => {
      if (data.ok) {
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
          $('.username')[0].innerHTML = data.username
        }
      } else throw new Error('not logged in')
    })
    .fail(e => {
      // not logged in
      $('#login').show()
      $('#accountSetting').hide()
      $('#logout').hide()
      $('.username').html('')
    })

  // Get zones
  $.ajax({
    method: 'GET',
    url: root + '/api/zones',
    success: data => {
      console.log(data)
      let i = 1
      if (data.data.length !== 0) {
        $('.navigation')[0].empty()
      }
      for (x in data.data) {
        if (i % 3 === 0) {
          $('.navigation')[0].append('<li></li>')
          $('.navigation')[0].append(
            '<li><a href="#" onclick="getOffer(\'' +
              data.data[x].name +
              '\')">' +
              capitalize(data.data[x].name) +
              '</a></li>'
          )
        } else {
          $('.navigation')[0].append(
            '<li><a href="#" onclick="getOffer(\'' +
              data.data[x].name +
              '\')">' +
              capitalize(data.data[x].name) +
              '</a></li>'
          )
        }
      }
    }
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
