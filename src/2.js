const createRange = (start, finish) => {
  const array = []

  for (let i = start; i <= finish; i++) {
    array.push(i)
  }

  return array
}

const rowCount = 16
const cellCount = 16

const root = document.querySelector('#root')

const rows = createRange(1, rowCount).map(i => {
  const node = document.createElement('div')
  node.classList.add('row')
  root.appendChild(node)
  return node
})

const clocks = createRange(0, rowCount * cellCount - 1).map(i => {
  const rowIndex = Math.floor(i / cellCount)
  const row = rows[rowIndex]

  const node = document.createElement('div')
  node.classList.add('clock')

  const seconds = document.createElement('div')
  seconds.classList.add('seconds')
  node.appendChild(seconds)

  const minutes = document.createElement('div')
  minutes.classList.add('minutes')
  node.appendChild(minutes)

  const hours = document.createElement('div')
  hours.classList.add('hours')
  node.appendChild(hours)

  row.appendChild(node)

  return {
    hours,
    minutes,
    seconds,
  }
})

const positionHands = (clock, date) => {
  const milliseconds = date.getMilliseconds()
  const seconds = date.getSeconds()
  const minutes = date.getMinutes()
  const hours = date.getHours()

  const secondsDeg = (seconds + milliseconds / 1000) * 6
  const minutesDeg = (minutes + seconds / 60) * 6
  const hoursDeg = (hours + minutes / 60 + seconds / 3600) * 30

  clock.hours.style.transform = `rotate(${hoursDeg}deg)`
  clock.minutes.style.transform = `rotate(${minutesDeg}deg)`
  clock.seconds.style.transform = `rotate(${secondsDeg}deg)`
}

const frameRate = 20
const millsecondsPerFrame = 1000 / frameRate

const update = date => {
  date.setMilliseconds(
    date.getMilliseconds() - (clocks.length / 2) * millsecondsPerFrame
  )

  clocks.forEach((clock, i) => {
    positionHands(clock, date)

    date.setMilliseconds(date.getMilliseconds() + millsecondsPerFrame)
  })
}

update(new Date())

document.body.addEventListener('click', () => update(new Date()))
