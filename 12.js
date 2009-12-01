var Clock = function(div, radius) {
  this.radius = radius;
  this.timer = null;

  this.hours = $('<div class="hours"></div>');
  this.minutes = $('<div class="minutes"></div>');
  this.seconds = $('<div class="seconds"></div>');

  this.container = $(div).
    append(this.hours).append(this.minutes).append(this.seconds);

  // Listen for ticking clock.
  $().bind('clock.tick', function(event, self) {
    self.update();
  });
};

Clock.prototype = {
  start: function() {
    var self = this;

    // One for now.
    $().trigger('clock.tick', [self]);

    // One for later.
    this.timer = setInterval(function() {
      $().trigger('clock.tick', [self]);
    }, 1000);
  },

  stop: function() {
    clearTimeout(this.timer);
  },

  update: function() {
    var now = new Date();
    var h = now.getHours();
    var m = now.getMinutes();
    var s = now.getSeconds();

    var position = function(angle, radius) {
      var radians = (angle * Math.PI) / 180;
      var x = Math.sin(radians) * radius;
      var y = -Math.cos(radians) * radius;

      return {
        left: x + 'px',
        position: 'absolute',
        top: y + 'px',
        '-webkit-transform': 'rotate(' + angle + 'deg)',
        '-webkit-transform-origin': 'center'
      };
    }

    this.hours.text(h).css(position((h % 12) * 30, this.radius));
    this.minutes.text(m).css(position(m * 6, this.radius - 60));
    this.seconds.text(s).css(position(s * 6, this.radius - 110));
  }
}
