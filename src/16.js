import React, { Component, Fragment } from 'react'
import { render } from 'react-dom'
import './16.scss'

class Timer extends Component {
  constructor() {
    super()
    this.state = { date: new Date }
  }

  componentDidMount() {
    this.updateDate()
  }

  updateDate() {
    this.setState({ date: new Date })
    requestAnimationFrame(() => this.updateDate())
  }

  render() {
    return this.props.children(this.state.date)
  }
}

class Clock extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.date.getSeconds() !== this.props.date.getSeconds()
  }

  render() {
    const date = this.props.date
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    const hoursClassName = `hand hours angle-${hours % 12 * 5}`
    const minutesClassName = `hand minutes angle-${minutes}`
    const secondsClassName = `hand seconds angle-${seconds}`

    return (
      <Fragment>
        <div className={hoursClassName}>{hours}</div>
        <div className={minutesClassName}>{minutes}</div>
        <div className={secondsClassName}>{seconds}</div>
      </Fragment>
    )
  }
}

render(
  <Timer>
    {date => <Clock date={date} />}
  </Timer>,
  document.getElementById('root')
)
