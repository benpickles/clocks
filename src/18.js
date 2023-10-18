function range(n) {
  const a = new Array(n)
  for (let i = 0; i <= n; i++) {
    a[i] = i
  }
  return a
}

const currentYear = new Date().getFullYear()

const daysInMonths = range(11).reduce((acc, i) => {
  acc[i] = new Date(currentYear, i + 1, 0).getDate()
  return acc
}, {})

function dayOfYear(date) {
  const month = date.getMonth()
  let total = 0
  let day = 0

  for (n in daysInMonths) {
    const days = daysInMonths[n]
    total += days
    if (n < month) day += days
  }

  return [day + date.getDate(), total]
}

const root = document.getElementById('root')
const [secondElem, minuteElem, hourElem, dayElem, monthElem, yearElem] =
  root.getElementsByTagName('div')

function setBackgroundColour(date) {
  const [day, total] = dayOfYear(date)
  const h = Math.round((day / total) * 360)

  root.style.backgroundColor = `hsl(${h}, 75%, 50%)`
}

const asPercent = n => `${n * 100}%`

function render(date) {
  const milliseconds = date.getMilliseconds()
  const seconds = date.getSeconds()
  const minutes = date.getMinutes()
  const hours = date.getHours()
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()

  const secondPerc = milliseconds / 1000
  const minutePerc = (seconds + secondPerc) / 60
  const hourPerc = (minutes + minutePerc) / 60
  const dayPerc = (hours + hourPerc) / 24
  const monthPerc = (day - 1 + dayPerc) / daysInMonths[month]
  const yearPerc = (month + monthPerc) / 12

  secondElem.style.width = asPercent(secondPerc)
  secondElem.title = seconds

  minuteElem.style.width = asPercent(minutePerc)
  minuteElem.title = minutes

  hourElem.style.width = asPercent(hourPerc)
  hourElem.title = hours

  dayElem.style.width = asPercent(dayPerc)
  dayElem.title = day

  monthElem.style.width = asPercent(monthPerc)
  monthElem.title = month + 1

  yearElem.style.width = asPercent(yearPerc)
  yearElem.title = year
}

let play = false

function loop() {
  render(new Date())

  if (play) {
    requestAnimationFrame(loop)
  }
}

function start() {
  play = true
  loop()
}

function stop() {
  play = false
}

setBackgroundColour(new Date())

start()

// Allow start/stop/debugging from the browser console.
window.render = render
window.setBackgroundColour = setBackgroundColour
window.start = start
window.stop = stop
