import React from 'react'
import ReactDOM from 'react-dom'

class Clock extends React.Component {
  shouldComponentUpdate(nextProps) {
    const nextSeconds = Math.round(nextProps.date.getTime() / 1000)
    const seconds = Math.round(this.props.date.getTime() / 1000)
    return nextSeconds != seconds
  }

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
  ReactDOM.render(
    <Clock date={date} />,
    document.getElementById('container')
  )
}

const update = function() {
  render(new Date)
  requestAnimationFrame(update)
}

requestAnimationFrame(update)
