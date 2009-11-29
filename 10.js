var Clock = function(div) {
  this.timer = null;

  this.container = $(div);

  // Listen for ticking clock.
  $().bind('clock.tick', function(event, self) {
    self.update();
  });

  this.setup();
};

Clock.prototype = {
  colourAt: function(seconds) {
    var c3 = 86400 / 3;
    var mod = seconds % c3;
    var c1 = Math.min(28800 - mod, 14400) / 14400;
    var c2 = Math.min(14400, mod) / 14400;
    var r = 0, g = 0, b = 0;

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

    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);

    return 'rgb(' + [r, g, b].join(',') + ')';
  },

  seconds: function() {
    var now = new Date();
    return (now.getHours() * 3600) + (now.getMinutes() * 60) + now.getSeconds();
  },

  setup: function() {
    for (var i = 0; i < 24; i++) {
      this.container.append($('<div></div>').text(i).css({
        background: this.colourAt(3600 * i)
      }));
    }
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
    this.container.css('background', colour);
  }
}
