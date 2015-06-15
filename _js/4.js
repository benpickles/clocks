var Clock = React.createClass({
  render() {
    var date = this.props.date
    var seconds = (date.getHours() * 3600)
      + (date.getMinutes() * 60)
      + date.getSeconds()
    var x = Math.floor(seconds / 120)
    var y = seconds % 120

    var pixelStyle = {
      left: x + 'px',
      top: y + 'px',
    }

    var textStyle = {}

    if (x > 660) {
      textStyle.left = (x - 60) + 'px'
      textStyle.textAlign = 'right'
    } else {
      textStyle.left = pixelStyle.left
    }

    if (y > 110) {
      textStyle.top = (y - 10) + 'px'
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
})

var render = function(date) {
  React.render(
    <Clock date={date} />,
    document.getElementById('clock')
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
