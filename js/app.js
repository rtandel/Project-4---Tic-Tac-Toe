(function() {
'use strict';
//1. Hide the game board and display start screen.
var startScreen = document.getElementById("start");                // The Start Screen
var startButton = document.getElementsByClassName("button")[0];   // The Start Button
var gameBoard = document.getElementById("board");                 // The game board
var finishGame = document.getElementById("finish");

// The tic-tac-toe boxes
var boxes = document.querySelector(".boxes");
var individualBoxes = document.getElementsByClassName("box");

// Hides the game board and the finish screen at the start.
gameBoard.style.display = 'none';
finishGame.style.display = "none";
//2. When the start button is clicked, hide the start screen.
startButton.onclick = function() {
  startScreen.style.display = 'none';
  finishGame.style.display = "none"
  gameBoard.style.display = 'block';

  finishGame.className = "screen screen-win";

  // Takes in each box as an index to be compared with one another.
  var boxArray = [];
  for (var i = 0; i < individualBoxes.length; i++) {
    boxArray.push(i);
    individualBoxes[i].style.backgroundImage = "";
    individualBoxes[i].className = "box";
    counter = 0;
  }
  xo = 0;
  currentPlayer = player.currentPlayer(xo);
}

// The player constructor
function Player(player) {

}

Player.prototype.currentPlayer = function(xo) {
  if (xo === 0) {
    player1.className = "players active";
    player2.className = "players";
  } else {
    player2.className = "players active";
    player1.className = "players";
  }
}

// Number for each player. 0 is O and 1 is X.
var xo = 0;

// The player object
var player = new Player();
var player1 = document.getElementById("player1");
var player2 = document.getElementById("player2");
var currentPlayer = player.currentPlayer(xo);

// Event Listeners
boxes.addEventListener("click", boxSelect, false);
boxes.addEventListener("mouseover", boxHover, false);
boxes.addEventListener("mouseout", boxOut, false);

// When the boxes are being hovered over.
// Display the background image.
function boxHover(e) {
  if (e.target !== e.currentTarget) {
    if (e.target.className !== "box box-filled-1" &&
        e.target.className !== "box box-filled-2") {
      var background;
      if (xo === 0) {
        background = "url('img/o.svg')";
        e.target.style.backgroundImage= background;
      } else {
        background = "url('img/x.svg')";
        e.target.style.backgroundImage = background;
      }
    }
  }
  e.stopPropagation();
}

// When the mouse is taken off the box,
// the background image is removed.
function boxOut(e) {
  if (e.target !== e.currentTarget) {
    if (e.target.className !== "box box-filled-1" &&
        e.target.className !== "box box-filled-2") {
      if (xo === 0) {
        e.target.style.backgroundImage="";
      } else {
        e.target.style.backgroundImage="";
      }
    }
  }
  e.stopPropagation();
}




var counter = 0;
function boxSelect(e) {
  if (e.target !== e.currentTarget) {
    if (e.target.className !== "box box-filled-1" &&
        e.target.className !== "box box-filled-2") {
      if (xo === 0) {
        e.target.className = "box box-filled-1";
        if (checkWin("box box-filled-1")) {
          gameOver(player1);
        }
        xo = 1;
        currentPlayer = player.currentPlayer(xo);
        counter++;
      } else {
        e.target.className = "box box-filled-2";
        if (checkWin("box box-filled-2")) {
            gameOver(player2);
        }
        xo = 0;
        currentPlayer = player.currentPlayer(xo);
        counter++;
      }
    }
  }
  if (counter === 9) {
    if (checkWin("box box-filled-1")) {
        gameOver(player1);
    } else if (checkWin("box box-filled-2")) {
        gameOver(player2);
    } else {
        gameOver();
    }
  }
  e.stopPropagation();
}

function checkWin(className) {
  var possWins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  var win = false;
  for (var i = 0; i < possWins.length; i++) {
    var counter = 0;
    for (var j = 0; j < possWins[i].length; j++) {
      var key = possWins[i][j];
      if (individualBoxes[key].className === className) {
        counter++;
      }
      if (counter === 3) {
        win = true;
        break;
      }
    }
  }
  return win;
}

var endMessage = document.getElementsByClassName("message")[0];

function gameOver(winner) {
  gameBoard.style.display = "none";
  endMessage.innerHTML = "You Won!!!!!!";
  if (winner === player1) {
    finishGame.className = "screen screen-win-one";
  } else if (winner === player2) {
    finishGame.className = "screen screen-win-two";
  } else {
    finishGame.className = "screen screen-win-draw";
    endMessage.innerHTML = "It's a draw";
  }
  finishGame.style.display = "block";
}

var newGame = document.getElementsByClassName("button")[1];

newGame.onclick = function() {
  startButton.onclick();
}


}());
