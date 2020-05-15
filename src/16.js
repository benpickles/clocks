const hoursElem = document.querySelector('.hand.hours')
const minutesElem = document.querySelector('.hand.minutes')
const secondsElem = document.querySelector('.hand.seconds')

let lastSeconds = null

const render = date => {
  const seconds = date.getSeconds()

  if (seconds === lastSeconds) {
    return
  } else {
    lastSeconds = seconds
  }

  const hours = date.getHours()
  const minutes = date.getMinutes()

  const hoursClassName = `hand hours angle-${(hours % 12) * 5}`
  const minutesClassName = `hand minutes angle-${minutes}`
  const secondsClassName = `hand seconds angle-${seconds}`

  hoursElem.setAttribute('class', hoursClassName)
  hoursElem.textContent = hours

  minutesElem.setAttribute('class', minutesClassName)
  minutesElem.textContent = minutes

  secondsElem.setAttribute('class', secondsClassName)
  secondsElem.textContent = seconds
}

const loop = () => {
  render(new Date())

  if (window.play) {
    requestAnimationFrame(loop)
  }
}

window.start = () => {
  window.play = true
  loop()
}

window.stop = () => {
  window.play = false
}

start()
