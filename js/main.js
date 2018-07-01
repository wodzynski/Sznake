var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var leap = 20;
var movementCycle;
var shift = [0, 0];
var speed = 100;
var head = [80, 80];
var snake = [[head[0], head[1]]];
var trait = [];
// var snake = [head];

$(document).ready(function() {
  init();
});

function init() {
  // drawing board and initialize start position of the sznake
  ctx.fillStyle = "#FFFFFF";
  // ctx.fillRect(snake[0][0], snake[0][1], leap, leap);
  ctx.fillRect(head[0], head[1], leap, leap);
  traitGenerator();
}

$(window).keypress(keyPressHandler);

function keyPressHandler(e) {
  var keyCode = e.which;
  // console.log(e, keyCode, e.which);
  // W key pressed
  if (keyCode === 119 || keyCode === 87) {
    // checking if movement occurs horizontally
    if (shift[1] == 0) {
      // if yes, movement modifier is set
      shift = [0, -leap];
      // and movement is made so action appears immediately after key press
      movement();
    }
  }
  // S key pressed
  if (keyCode === 115 || keyCode === 83) {
    if (shift[1] == 0) {
      shift = [0, leap];
      movement();
    }
  }
  // A key pressed
  if (keyCode === 97 || keyCode === 65) {
    // checking if movement occurs vertically
    if (shift[0] == 0) {
      shift = [-leap, 0];
      movement();
    }
  }
  // D key pressed
  if (keyCode === 100 || keyCode === 68) {
    if (shift[0] == 0) {
      shift = [leap, 0];
      movement();
    }
  }
  // Q key pressed
  if (keyCode == 113 || keyCode === 81) {
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
  ctx.clearRect(snake[0][0], snake[0][1], leap, leap);
  snake.shift();
  // calculating position of a new square and drawing it
  // if head goes beyond screen, drawing it on the other side, else normal movemenet appears
  if (head[0] + shift[0] > 500) {
    head[0] = 0;
  } else if (head[0] + shift[0] < 0) {
    head[0] = 480;
  } else {
    head[0] = head[0] + shift[0];
  }
  // head[1] = head[1] + shift[1];
  if (head[1] + shift[1] > 280) {
    head[1] = 0;
  } else if (head[1] + shift[1] < 0) {
    head[1] = 280;
  } else {
    head[1] = head[1] + shift[1];
  }
  snake.push([head[0], head[1]]);
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(head[0], head[1], leap, leap);
  if (head[0] === trait[0] && head[1] === trait[1]) {
    snake.unshift(0);
    traitGenerator();
  }
}

function traitGenerator() {
  trait[0] = Math.floor(Math.random() * 25) * 20;
  trait[1] = Math.floor(Math.random() * 15) * 20;
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(trait[0], trait[1], leap, leap);
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
