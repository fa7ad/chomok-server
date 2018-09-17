function notification (message) {
  $('.notification h5')[0].innerHTML = message
  $('.notification').fadeIn(300)
}

$(document).ready(() => {
  $('.notification .closeNotification').click(() => {
    $('.notification').fadeOut(400)
  })
})
