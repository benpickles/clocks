import React from 'react'

class Clock extends React.Component {
  render() {
    const date = this.props.date
    const seconds = (date.getHours() * 3600)
      + (date.getMinutes() * 60)
      + date.getSeconds()
    const x = Math.floor(seconds / 120)
    const y = seconds % 120

    const pixelStyle = {
      left: x,
      top: y,
    }

    const textStyle = {}

    if (x > 660) {
      textStyle.left = x - 60
      textStyle.textAlign = 'right'
    } else {
      textStyle.left = pixelStyle.left
    }

    if (y > 110) {
      textStyle.top = y - 10
    } else {
      textStyle.top = pixelStyle.top
    }

    return (
      <div className="clock">
        <span className="text" style={textStyle}>{seconds}/86400</span>
        <span className="pixel" style={pixelStyle}></span>
      </div>
    )
  }
}

const render = function(date) {
  React.render(
    <Clock date={date} />,
    document.getElementById('clock')
  )
}

let currentSeconds

const update = function() {
  const now = new Date
  const seconds = Math.floor(now.getTime() / 1000)

  // Only render once per second.
  if (seconds != currentSeconds) {
    render(now)
    currentSeconds = seconds
  }

  requestAnimationFrame(update)
}

requestAnimationFrame(update)
