var Clock = function(div) {
  this.timer = null;

  this.container = $(div);

  // Listen for ticking clock.
  $().bind('clock.tick', function(event, self) {
    self.update();
  });
};

Clock.prototype = {
  colourAt: function(seconds) {
    var c3 = 86400 / 3;
    var mod = seconds % c3;
    var c1 = Math.min(28800 - mod, 14400) / 14400;
    var c2 = Math.min(14400, mod) / 14400;
    var r, g, b;

    switch(Math.floor(seconds / c3)) {
      case 0:
        b = c1;
        r = c2;
        break;
      case 1:
        r = c1;
        g = c2;
        break;
      case 2:
        g = c1;
        b = c2;
        break;
    };

    var rgb = 'rgb(' + [
      Math.round(r * 255) || 0,
      Math.round(g * 255) || 0,
      Math.round(b * 255) || 0
    ].join(',') + ')';

    return rgb;
  },

  seconds: function() {
    var now = new Date();
    return (now.getHours() * 3600) + (now.getMinutes() * 60) + now.getSeconds();
  },

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
    var colour = this.colourAt(this.seconds());
    console.log(colour)
    this.container.css('background', colour);
  }
}
