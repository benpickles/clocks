var Clock = React.createClass({
  render: function() {
    var date = this.props.date
      , hours = date.getHours()
      , minutes = date.getMinutes()
      , seconds = date.getSeconds()
      , hoursAngle = Math.round((hours % 12 / 12) * 360)
      , minutesAngle = Math.round((minutes / 6) * 36)
      , secondsAngle = Math.round((seconds / 6) * 36)
      , hoursClassName = ['hand', 'hours', 'angle-' + hoursAngle].join(' ')
      , minutesClassName = ['hand', 'minutes', 'angle-' + minutesAngle].join(' ')
      , secondsClassName = ['hand', 'seconds', 'angle-' + secondsAngle].join(' ')

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
