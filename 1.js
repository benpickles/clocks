var Clock = function(div) {
  this.height = 120;
  this.timer = null;
  this.width = 720;

  this.container = $(div);
  this.container.css({
    height: this.height + 'px',
    position: 'relative',
    width: this.width + 'px'
  });

  this.pixel = $('<div></div>');
  this.pixel.css({
    background: '#000000',
    height: '1px',
    position: 'absolute',
    width: '1px'
  });

  this.container.append(this.pixel);

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

    this.pixel.text(n);
    this.pixel.css({
      left: x + 'px',
      top: y + 'px'
    });
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
