var Clock = React.createClass({
  render() {
    var date = this.props.date
      , hours = date.getHours()
      , minutes = date.getMinutes()
      , seconds = date.getSeconds()
      , hoursClassName = ['hand', 'hours', 'angle-' + (hours % 12 * 5)].join(' ')
      , minutesClassName = ['hand', 'minutes', 'angle-' + minutes].join(' ')
      , secondsClassName = ['hand', 'seconds', 'angle-' + seconds].join(' ')

    return (
      <div>
        <div className={hoursClassName}>{hours}</div>
        <div className={minutesClassName}>{minutes}</div>
        <div className={secondsClassName}>{seconds}</div>
      </div>
    )
  }
})

var render = function(date) {
  React.render(
    <Clock date={date} />,
    document.getElementById('container')
  )
}

var currentSeconds

var update = function() {
  var now = new Date
    , seconds = Math.floor(now.getTime() / 1000)

  // Only render once per second.
  if (seconds != currentSeconds) {
    render(now)
    currentSeconds = seconds
  }

  requestAnimationFrame(update)
}

requestAnimationFrame(update)
