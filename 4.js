var Clock = function(elem) {
  this.height = 120;
  this.timer = null;
  this.width = 720;

  this.container = $(elem).css({
    height: this.height + 'px',
    position: 'relative',
    width: this.width + 'px'
  });

  this.pixel = $('<div id="pixel"></div>');
  this.text = $('<span id="text"></span>');

  this.container.append(this.pixel);
  this.container.append(this.text);

  // Listen for ticking clock.
  $().bind('clock.tick', function(event, self) {
    self.draw();
  });
};

Clock.prototype = {
  draw: function() {
    var n = this.seconds();
    var x = Math.floor(n / this.height);
    var y = n % this.height;
    var css = {
      left: x + 'px',
      position: 'absolute',
      top: y + 'px'
    };

    this.pixel.css(css);
    this.text.css(css).text(n + '/86400');
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
  }
}
