var Clock = React.createClass({
  render() {
    var date = this.props.date
    var seconds = (date.getHours() * 3600)
      + (date.getMinutes() * 60)
      + date.getSeconds()
    var x = Math.floor(seconds / 120)
    var y = seconds % 120
    var style = {
      left: x + 'px',
      top: y + 'px',
    }

    return (
      <div className="clock">
        <span className="pixel" style={style}></span>
        <span className="text" style={style}>{seconds}/86400</span>
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
