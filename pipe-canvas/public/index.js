// Minimum time between updates
const UPDATE_INTERVAL = 20; // ms
// Minimum time between draws
const DRAW_INTERVAL = 20; // ms
// Number of pipes drawn
const PIPES_DENSITY = 0.0005;
// Max size of pipe
const MAX_SIZE = 10;
// Max speed of pipe
const MAX_SPEED = 50;

const canvas = document.getElementById("pipe-canvas");
const context = canvas.getContext("2d");
let pipesCount;

let pipes = [];

const updateStopwatch = getStopwatch();

// Setup and tear down drawing animation
function main() {
  init();

  let updateInterval = setInterval(update, UPDATE_INTERVAL);
  let drawInterval = setInterval(draw, DRAW_INTERVAL);

  window.onunload = () => {
    clearInterval(updateInterval);
    clearInterval(drawInterval);
  };
}

function init() {
  handleResize();
  document.body.onresize = handleResize;

  const area = canvas.height * canvas.width;
  pipesCount = area * PIPES_DENSITY;

  flushPipes();
}

// Update draw on screen
function update() {
  const timeLapsed = updateStopwatch();

  for (let pipe of pipes) {
    updatePipe(pipe, timeLapsed);
  }
}

function draw() {
  for (let pipe of pipes) {
    drawPipe(pipe);
  }
}

function updatePipe(pipe, timeLapsed) {
  const newX = pipe.x + pipe.vx * timeLapsed;
  const newY = pipe.y + pipe.vy * timeLapsed;

  if (newX < 0 || newX > canvas.width) {
    pipe.vx *= -1;
  } else if (newY < 0 || newY > canvas.height) {
    pipe.vy *= -1;
  }

  pipe.x = bound(newX, 0, canvas.width);
  pipe.y = bound(newY, 0, canvas.height);
}

function drawPipe(pipe) {
  drawFilledCircle(pipe.x, pipe.y, pipe.size, pipe.color);
}

function drawFilledCircle(x, y, radius, color) {
  // Draw
  context.beginPath();
  context.fillStyle = color;

  context.arc(x, y, radius, 0, 2 * Math.PI);

  context.closePath();
  context.fill();
}

function handleResize() {
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;

  const area = canvas.height * canvas.width;
  pipesCount = area * PIPES_DENSITY;

  flushPipes();
}

function getStopwatch() {
  let previousTime = new Date().getTime(); // ms

  return function() {
    const currentTime = new Date().getTime(); // ms

    timeLapsed = (currentTime - previousTime) / 1000; // s
    previousTime = currentTime;

    return timeLapsed; // s
  };
}

function bound(value, min, max) {
  if (value > max) {
    return max;
  }

  if (value < min) {
    return min;
  }

  return value;
}

function flushPipes() {
  pipes = [];

  for (let i = 0; i < pipesCount; i += 1) {
    pipes.push(
      Pipe.getRandom(canvas.width, canvas.height, MAX_SIZE, MAX_SPEED)
    );
  }
}

main();
