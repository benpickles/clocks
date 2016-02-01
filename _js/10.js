import React from 'react'
import ReactDOM from 'react-dom'

function range(from, to) {
  const numbers = []

  for (let i = from; i <= to; i++) {
    numbers.push(i)
  }

  return numbers
}

class Clock extends React.Component {
  shouldComponentUpdate(nextProps) {
    const nextSeconds = Math.round(nextProps.date.getTime() / 1000)
    const seconds = Math.round(this.props.date.getTime() / 1000)
    return nextSeconds != seconds
  }

  colourAt(seconds) {
    const c3 = 86400 / 3
    const mod = seconds % c3
    const c1 = Math.min(28800 - mod, 14400) / 14400
    const c2 = Math.min(14400, mod) / 14400

    let r = 0
    let g = 0
    let b = 0

    switch (Math.floor(seconds / c3)) {
    case 0:
      b = c1
      g = c2
      break
    case 1:
      g = c1
      r = c2
      break
    case 2:
      r = c1
      b = c2
      break
    }

    r = Math.round(r * 255)
    g = Math.round(g * 255)
    b = Math.round(b * 255)

    return `rgb(${r}, ${g}, ${b})`
  }

  colouredDiv(seconds, text) {
    const style = {
      backgroundColor: this.colourAt(seconds),
    }

    return (
      <div
        className="colour"
        key={text}
        style={style}
      >{text}</div>
    )
  }

  render() {
    const am = range(0, 11).map(i => this.colouredDiv(3600 * i, i))
    const pm = range(12, 23).map(i => this.colouredDiv(3600 * i, i))
    const current = this.colouredDiv(this.seconds(), '♥︎')

    return (
      <div className="clock">
        <div className="row">
          {am}
        </div>
        <div className="row current">
          {current}
        </div>
        <div className="row">
          {pm}
        </div>
      </div>
    )
  }

  seconds() {
    return (this.props.date.getHours() * 3600)
      + (this.props.date.getMinutes() * 60)
      + this.props.date.getSeconds()
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
