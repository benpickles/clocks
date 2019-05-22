var Clock = window.Clock = function(div, radius) {
  this.radius = radius;
  this.timer = null;

  var css = {
    position: 'absolute',
    'text-align': 'center',
    width: this.radius / 2 +'px'
  };

  this.hours = $('<div class="hours"></div>').css(css).css(
    'font-size', this.radius * 0.4 + 'px'
  );
  this.minutes = $('<div class="minutes"></div>').css(css).css(
    'font-size', this.radius * 0.3 + 'px'
  );
  this.seconds = $('<div class="seconds"></div>').css(css).css(
    'font-size', this.radius * 0.2 + 'px'
  );

  this.container = $(div).
    append(this.hours).append(this.minutes).append(this.seconds);

  // Listen for ticking clock.
  $().bind('clock.tick', function(event, self) {
    self.update();
  });
};

Clock.prototype = {
  position: function(angle, radius) {
    var radians = (angle * Math.PI) / 180;
    var x = Math.sin(radians) * radius;
    var y = -Math.cos(radians) * radius;

    return {
      left: this.radius + x + 'px',
      top: this.radius + y + 'px',
      '-moz-transform': 'rotate(' + angle + 'deg)',
      '-webkit-transform': 'rotate(' + angle + 'deg)'
    };
  },

  start: function() {
    var self = this;

    // One for now.
    $().trigger('clock.tick', [self]);

    // One for later.
    this.timer = setInterval(function() {
      $().trigger('clock.tick', [self]);
    }, 25);
  },

  stop: function() {
    clearTimeout(this.timer);
  },

  update: function() {
    var now = new Date();
    var h = now.getHours();
    var m = now.getMinutes();
    var s = now.getSeconds();
    var hd = ((h % 12) + (m / 60)) * 30;
    var md = (m + (s / 60)) * 6;
    var sd = (s + (now.getMilliseconds() / 1000)) * 6;

    this.hours.text(h).css(this.position(hd, this.radius));
    this.minutes.text(m).css(this.position(md, this.radius * 0.8));
    this.seconds.text(s).css(this.position(sd, this.radius * 0.66));
  }
}
