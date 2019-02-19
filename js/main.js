const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// the base length is 20
const leap = 20;
let movementCycle;
let shift = [0, 0];
const speed = 100;
const head = [80, 80];
let snake = [[head[0], head[1]]];
const trait = [];
let isOver;

document.addEventListener('DOMContentLoaded', () => init(), false);

function init() {
  // drawing board and initialize start position of the sznake
  ctx.fillStyle = "#FFFFFF";
  // ctx.fillRect(snake[0][0], snake[0][1], leap, leap);
  ctx.fillRect(head[0], head[1], leap, leap);
  generateTrait();
}

document.addEventListener("keydown", keyPressHandler);

function keyPressHandler(e) {
  const keyPressed = e.keyCode;
  console.log(e, keyPressed, e.keyCode);
  // W key pressed
  if (keyPressed === 119 || keyPressed === 87) {
    // checking if movement occurs horizontally
    if (shift[1] == 0) {
      // if yes, movement modifier is set
      shift = [0, -leap];
      // and movement is made so action appears immediately after key press
      movement();
    }
  }
  // S key pressed
  if (keyPressed === 115 || keyPressed === 83) {
    if (shift[1] == 0) {
      shift = [0, leap];
      movement();
    }
  }
  // A key pressed
  if (keyPressed === 97 || keyPressed === 65) {
    // checking if movement occurs vertically
    if (shift[0] == 0) {
      shift = [-leap, 0];
      movement();
    }
  }
  // D key pressed
  if (keyPressed === 100 || keyPressed === 68) {
    if (shift[0] == 0) {
      shift = [leap, 0];
      movement();
    }
  }
  // Q key pressed
  if (keyPressed == 113 || keyPressed === 81) {
    // stopping movement cycle and clearing shift so movement can start in every dirrection
    console.log(snake);
    clearInterval(movementCycle);
    shift = [0, 0];
    snake = [[head[0], head[1]]];
    isOver = false;
    ctx.clearRect(0, 0, 500, 300);
    init();
  }
}

function movement() {
  // stopping previous movement
  clearInterval(movementCycle);
  // moving snake once
  move();
  if (isOver) return;
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
  if (head[1] + shift[1] > 280) {
    head[1] = 0;
  } else if (head[1] + shift[1] < 0) {
    head[1] = 280;
  } else {
    head[1] = head[1] + shift[1];
  }
  snake.push([head[0], head[1]]);
  isSnakeBitten();
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(head[0], head[1], leap, leap);
  if (head[0] === trait[0] && head[1] === trait[1]) {
    snake.unshift(0);
    generateTrait();
  }
}

function isSnakeBitten() {
  for(let i = 0; i < (snake.length - 4); i++) {
    if (head[0] == snake[i][0] && head[1] == snake[i][1]) {
      clearInterval(movementCycle);
      isOver = true;
    }
  }
}

function generateTrait() {
  trait[0] = Math.floor(Math.random() * 25) * 20;
  trait[1] = Math.floor(Math.random() * 15) * 20;
  // checking if generated on the snake body
  snake.forEach((segment) => {if (trait[0] == segment[0] && trait[1] == segment[1]) generateTrait()});
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(trait[0], trait[1], leap, leap);
}