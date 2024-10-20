"use strict";

//Global Variables
window.addEventListener("DOMContentLoaded", () => {
  let currentPlayer = "X";
  let currentBoard = Array(9).fill(""); //Holds board state
  const cells = Array.from(document.querySelectorAll("#board div"));
  const status = document.getElementById("status");
  const winConditons = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]; //Stores win conditions

  const createGrid = () => {
    cells.forEach((cell) => {
      if (cell.innerHTML === "") {
        cell.classList.add("square");
      }
    });
  };

  createGrid(); //create grid

  //Player move
  const playerMove = (square) => {
    console.log(square);
    let index = Array.from(cells).indexOf(square);
    if (currentBoard[index] === "") {
      currentBoard[index] = currentPlayer;
      square.innerHTML = currentPlayer;
      square.classList.add(currentPlayer);
      if (checkWin()) {
        return;
      } else {
        if (currentPlayer === "X") { //Switch players
          currentPlayer = "O";
        } else {
          currentPlayer = "X";
        }
      }
    }
  };

  //Player hover
  const playerHover = (square) => {
    let index = Array.from(cells).indexOf(square);
    if (currentBoard[index] === "") {
      square.classList.add("hover");
    }
  };

  //Checks win
  const checkWin = () => {
    let winState = false;
    for (let i = 0; i < winConditons.length; i++) {
      const winCheck = winConditons[i];

      let a = currentBoard[winCheck[0]];
      let b = currentBoard[winCheck[1]];
      let c = currentBoard[winCheck[2]];

      if (a === "" || b === "" || c === "") {
        continue;
      }

      if (a === b && b === c) {
        winState = true;
        break;
      }
    }
    if (winState) {
      if (currentPlayer === "X") {
        status.innerHTML = "Congratulations! X is the Winner!"; 
        status.classList.add("you-won"); 
      } else {
        status.innerHTML = "Congratulations! O is the Winner!";
        status.classList.add("you-won");
      }
    }
    return winState;
  };

  //Starts a new game
  const newGame = () => {
    currentPlayer = "X"; //Resets player
    currentBoard = Array(9).fill(""); //Resets board
    status.innerHTML =
      "Move your mouse over a square and click to play an X or an O.";
    status.classList.remove("you-won");
    cells.forEach((cell) => {
      cell.innerHTML = ""; //clear board
      cell.classList.remove("X", "O", "hover"); //clear classes
    });
  };

  //Event Listeners
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("square")) {
      playerMove(event.target);
    }
  });

  document.addEventListener("mouseover", (event) => {
    if (event.target.classList.contains("square")) {
      playerHover(event.target);
    }
  });

  document.addEventListener("mouseout", (event) => {
    if (event.target.classList.contains("square")) {
      event.target.classList.remove("hover");
    }
  });

  document.querySelector(".btn").addEventListener("click", newGame);
});
