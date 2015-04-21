var Clock = React.createClass({displayName: "Clock",
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
      React.createElement("div", null,
        React.createElement("div", {className: hoursClassName}, hours),
        React.createElement("div", {className: minutesClassName}, minutes),
        React.createElement("div", {className: secondsClassName}, seconds)
      )
    )
  }
})

var render = function(date) {
  React.render(
    React.createElement(Clock, {date: date}),
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
