var Clock = (window.Clock = function (div, radius) {
  this.container = $(div)
  this.radius = radius
  this.timer = null

  // Create <canvas> element.
  var elem = document.createElement('canvas')
  elem.setAttribute('width', this.radius * 2)
  elem.setAttribute('height', this.radius * 2)
  this.container.html(elem)
  this.canvas = elem.getContext('2d')

  // Listen for ticking clock.
  $().bind('clock.tick', function (event, self) {
    self.update()
  })
})

Clock.prototype = {
  start: function () {
    var self = this

    // One for now.
    $().trigger('clock.tick', [self])

    // One for later.
    this.timer = setInterval(function () {
      $().trigger('clock.tick', [self])
    }, 25)
  },

  stop: function () {
    clearTimeout(this.timer)
  },

  update: function () {
    var now = new Date()
    var h = now.getHours()
    var m = now.getMinutes()
    var s = now.getSeconds()

    // Radiuses.
    var hr = this.radius / 3
    var mr = this.radius / 1.5
    var sr = this.radius

    var adjust = -Math.PI / 2

    // Radians.
    var ha = (((h % 12) + m / 60) / 6) * Math.PI
    var ma = ((m + s / 60) / 30) * Math.PI
    var sa = ((s + now.getMilliseconds() / 1000) / 30) * Math.PI

    // Clear.
    this.canvas.clearRect(0, 0, this.radius * 2, this.radius * 2)

    // Seconds.
    this.canvas.beginPath()
    this.canvas.moveTo(this.radius, this.radius)
    this.canvas.arc(this.radius, this.radius, sr, adjust, sa + adjust)
    this.canvas.fillStyle = '#000099'
    this.canvas.fill()

    // Minutes.
    this.canvas.beginPath()
    this.canvas.moveTo(this.radius, this.radius)
    this.canvas.arc(this.radius, this.radius, mr, adjust, ma + adjust)
    this.canvas.fillStyle = '#FFFFFF'
    this.canvas.fill()

    // Hours.
    this.canvas.beginPath()
    this.canvas.moveTo(this.radius, this.radius)
    this.canvas.arc(this.radius, this.radius, hr, adjust, ha + adjust)
    this.canvas.fillStyle = '#CC0033'
    this.canvas.fill()

    this.canvas.closePath()
  },
}
