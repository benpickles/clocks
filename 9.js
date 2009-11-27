var Clock = function(elem, radius) {
  this.container = $(elem);
  this.radius = radius;
  this.timer = null;

  this.setup();

  // Listen for ticking clock.
  $().bind('clock.tick', function(event, self) {
    self.update();
  });
};

Clock.prototype = {
  setup: function() {
    // Centred;
    var css = {
      left: this.radius + 'px',
      position: 'absolute',
      top: this.radius + 'px'
    };

    this.hoursAm = $('<div class="hours am"></div>').css(css);
    this.hoursPm = $('<div class="hours pm"></div>').css(css);
    this.minutes = $('<div class="minutes"></div>').css(css);
    this.seconds = $('<div class="seconds"></div>').css(css);

    for (var i = 0; i < 12; i++) { this.hoursAm.append($('<span></span>')); };
    for (var i = 0; i < 12; i++) { this.hoursPm.append($('<span></span>')); };
    for (var i = 0; i < 60; i++) { this.minutes.append($('<span></span>')); };
    for (var i = 0; i < 60; i++) { this.seconds.append($('<span></span>')); };

    this.container.append(this.hoursAm);
    this.container.append(this.hoursPm);
    this.container.append(this.minutes);
    this.container.append(this.seconds);

    var position = function(i, total, radius) {
      var slice = (2 * Math.PI) / total;
      var angle = slice * i;
      var x = Math.sin(angle) * radius;
      var y = -Math.cos(angle) * radius;
      return {
        left: x + 'px',
        top: y + 'px'
      };
    }

    $('span', this.hoursAm).each(function(i) {
      $(this).css(position(i, 12, 100)).text(i);
    });

    $('span', this.hoursPm).each(function(i) {
      $(this).css(position(i, 12, 120)).text(i + 12);
    });

    $('span', this.minutes).each(function(i) {
      $(this).css(position(i, 60, 160)).text(i);
    });

    $('span', this.seconds).each(function(i) {
      $(this).css(position(i, 60, 200)).text(i);
    });
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
    //
  }
}
