var DIAMETER = 400
  , RADIUS = DIAMETER / 2
  , RECT_SIDE = 18
  , ZEROER = Math.PI / 2
  , MILLISECOND_PORTION = 2 / 60000
  , SECOND_PORTION = 2 / 3600
  , MINUTE_PORTION = 2 / 720

var svg = d3.select('svg')
  .attr({
    width: DIAMETER + RECT_SIDE,
    height: DIAMETER + RECT_SIDE
  })

svg.selectAll('rect')
  .attr({
    height: RECT_SIDE,
    width: RECT_SIDE
  })

svg.selectAll('text')
  .attr({
    'font-size': (RECT_SIDE * 0.6) + 'px',
    x: RECT_SIDE / 2,
    y: RECT_SIDE / 2
  })

var updater = function(selection, handLength) {
  var hand = selection.filter('path')
    , tip = selection.filter('g')
    , text = tip.select('text')

  return function(radianCount, number) {
    var radians = radianCount * Math.PI
      , x = Math.cos(radians - ZEROER) * handLength
      , y = Math.sin(radians - ZEROER) * handLength
      , x1 = 0
      , y1 = 0

    if (radianCount < 0.25) {
      y1 = y + x
    } else if (radianCount >= 0.25 && radianCount < 0.75) {
      x1 = x - Math.abs(y)
    } else if (radianCount >= 0.75 && radianCount < 1.25) {
      y1 = y - Math.abs(x)
    } else if (radianCount >= 1.25 && radianCount < 1.75) {
      x1 = x + Math.abs(y)
    } else { // radianCount >= 1.75
      y1 = y - x
    }

    var d = [
      'M', RADIUS, RADIUS,
      'l', x1, y1,
      'L', x + RADIUS, y + RADIUS
    ].join(' ')

    hand.attr('d', d)

    tip.attr('transform', 'translate(' + (x + RADIUS) + ', ' + (y + RADIUS) + ')')

    text.text(number)
  }
}

var updateHours   = updater(svg.selectAll('.hours'),   100)
  , updateMinutes = updater(svg.selectAll('.minutes'), 150)
  , updateSeconds = updater(svg.selectAll('.seconds'), 200)

var update = function(date) {
  var hours = date.getHours()
    , minutes = date.getMinutes()
    , seconds = date.getSeconds()
    , milliseconds = date.getMilliseconds()

  updateHours(hours % 12 / 6 + minutes * MINUTE_PORTION, hours)
  updateMinutes(minutes / 30 + seconds * SECOND_PORTION, minutes)
  updateSeconds(seconds / 30 + milliseconds * MILLISECOND_PORTION, seconds)
}

;(function draw() {
  update(new Date())
  requestAnimationFrame(draw)
})()
