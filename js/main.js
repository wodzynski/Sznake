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
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(x, y, leap, leap);
}

$(window).keypress(keyPressHandler);

function keyPressHandler(e) {
  //use e.which
  var keyCode = e.which;
  console.log(e, keyCode, e.which);
  if (keyCode == 119) {
    shift = [0, -10];
    movement();
  }
  if (keyCode == 115) {
    shift = [0, 10];
    movement();
  }
  if (keyCode == 97) {
    shift = [-10, 0];
    movement();
  }
  if (keyCode == 100) {
    shift = [10, 0];
    movement();
  }
  // ctx.clearRect(0, 0, 500, 300);
  // init();
}

function movement() {
  clearInterval(movementCycle);
  move();
  movementCycle = setInterval(move, speed);
}

function move() {
  ctx.clearRect(x, y, leap, leap);
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
