var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = 80;
var y = 80;
var leap = 10;
var movementCycle;
var shift = [0, 0];
var speed = 400;

$(document).ready(function() {
  init();
});

function init() {
  // drawing board and initialize start position of the sznake
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(x, y, leap, leap);
}

$(window).keypress(keyPressHandler);

function keyPressHandler(e) {
  var keyCode = e.which;
  // console.log(e, keyCode, e.which);
  // W key pressed
  if (keyCode == 119) {
    // checking if movement occurs horizontally
    if (shift[1] == 0) {
      // if yes, movement modifier is set
      shift = [0, -10];
      // and movement is made so action appears immediately after key press
      movement();
    }
  }
  // S key pressed
  if (keyCode == 115) {
    if (shift[1] == 0) {
      shift = [0, 10];
      movement();
    }
  }
  // A key pressed
  if (keyCode == 97) {
    // checking if movement occurs vertically
    if (shift[0] == 0) {
      shift = [-10, 0];
      movement();
    }
  }
  // D key pressed
  if (keyCode == 100) {
    if (shift[0] == 0) {
      shift = [10, 0];
      movement();
    }
  }
  // Q key pressed
  if (keyCode == 113) {
    // stopping movement cycle and clearing shift so movement can start in every dirrection
    clearInterval(movementCycle);
    shift = [0, 0];
  }
  // ctx.clearRect(0, 0, 500, 300);
  // init();
}

function movement() {
  // stopping previous movement
  clearInterval(movementCycle);
  // moving snake once
  move();
  // starting forward movement cycle
  movementCycle = setInterval(move, speed);
}

function move() {
  // clearing an existing square
  ctx.clearRect(x, y, leap, leap);
  // calculating position of a new square and drawing it
  y = y + shift[1];
  x = x + shift[0];
  ctx.fillRect(x, y, leap, leap);
}

// function pressedW() {
//   shift = [0, -10];
// }

// function pressedS() {
//   shift = [0, 10];
// }

// function pressedA() {
//   shift = [-10, 0];
// }

// function pressedD() {
//   shift = [+10, 0];
// }
