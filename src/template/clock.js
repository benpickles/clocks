function render(date) {
  // Your code here.
}

let play = false

function loop() {
  render(new Date())
  if (play) requestAnimationFrame(loop)
}

function start() {
  play = true
  loop()
}

function stop() {
  play = false
}

start()

// Allow start/stop/debugging from the browser console.
window.render = render
window.start = start
window.stop = stop
