var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = 80;
var y = 80;
var shift = 10;

$(document).ready(function() {
  init();
});

function init() {
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(x, y, shift, shift);
}

$(window).keypress(keyPressHandler);

function keyPressHandler(e) {
  //use e.which
  var keyCode = e.which;
  console.log(e, keyCode, e.which);
  if (keyCode == 119) {
    pressedW();
  }
  if (keyCode == 115) {
    pressedS();
  }
  if (keyCode == 97) {
    pressedA();
  }
  if (keyCode == 100) {
    pressedD();
  }
  ctx.clearRect(0, 0, 500, 300);
  init();
  // if (keyCode == 119) {
  //   console.log("You pressed W!");
  //   //alert("You pressed W!");
  // }
}

function pressedW() {
  y = y - shift;
}

function pressedS() {
  y = y + shift;
}

function pressedA() {
  x = x - shift;
}

function pressedD() {
  x = x + shift;
}
