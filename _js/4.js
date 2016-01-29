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
  ReactDOM.render(
    <Clock date={date} />,
    document.getElementById('clock')
  )
}

const update = function() {
  render(new Date)
  requestAnimationFrame(update)
}

requestAnimationFrame(update)
