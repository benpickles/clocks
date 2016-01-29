import React from 'react'

class Clock extends React.Component {
  render() {
    const date = this.props.date
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    const hoursClassName = ['hand', 'hours', `angle-${hours % 12 * 5}`].join(' ')
    const minutesClassName = ['hand', 'minutes', `angle-${minutes}`].join(' ')
    const secondsClassName = ['hand', 'seconds', `angle-${seconds}`].join(' ')

    return (
      <div>
        <div className={hoursClassName}>{hours}</div>
        <div className={minutesClassName}>{minutes}</div>
        <div className={secondsClassName}>{seconds}</div>
      </div>
    )
  }
}

const render = function(date) {
  React.render(
    <Clock date={date} />,
    document.getElementById('container')
  )
}

let currentSeconds

const update = function() {
  const now = new Date
  const seconds = Math.round(now.getTime() / 1000)

  // Only render once per second.
  if (seconds != currentSeconds) {
    render(now)
    currentSeconds = seconds
  }

  requestAnimationFrame(update)
}

requestAnimationFrame(update)
