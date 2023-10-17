"use strict";

let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
let player1 = true;
let gameEnded = false;
let boardElement = document.querySelector(".board");
let title = document.querySelector(".title");
let overlay = document.querySelector(".overlay");
let btnAgain = document.querySelector("#btn-again");
let remain = 9; //remain cells

function checkWin(id, value) {
  let i = Number(id[0]);
  let j = Number(id[1]);

  if (
    (board[0][0] === value && board[1][1] === value && board[2][2] === value) ||
    (board[0][2] === value && board[1][1] === value && board[2][0] === value) ||
    (board[0][j] === value && board[1][j] === value && board[2][j] === value) ||
    (board[i][0] === value && board[i][1] === value && board[i][2] === value)
  ) {
    title.textContent = `${value} WIN`.toUpperCase();
    gameEnded = true;
    overlay.classList.toggle("hidden");
  } else if (remain === 0) {
    title.textContent = "DRAW";
    gameEnded = true;
    overlay.classList.toggle("hidden");
  }
}

//reset game
btnAgain.addEventListener("click", e => {
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  remain = 9;
  let cells = document.querySelectorAll(".cell");
  for (let i = 0; i < cells.length; i++) {
    cells[i].classList.remove("locked");
    cells[i].classList.remove("x");
    cells[i].classList.remove("o");
    cells[i].textContent = "";
    overlay.classList.toggle("hidden");
    gameEnded = false;
  }
});

for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    //create cell and add id base on i,j
    let tempCell = document.createElement("div");
    let _id = `${i}${j}`;
    tempCell.setAttribute("id", _id);
    tempCell.classList.add("cell");

    // add click event
    tempCell.addEventListener("click", e => {
      //set value will add as x if player1
      let value = player1 ? "x" : "o";

      // check if cell has clicked, if not add locked class, also check game ended?
      if (!e.target.classList.contains("locked") && gameEnded === false) {
        // reduce 1 cell
        remain--;
        //add locked class, change cell text to X / O
        e.target.classList.add("locked");
        e.target.textContent = value.toUpperCase();
        e.target.classList.add(`${value}`);
        //add value to board to check
        board[_id[0]][_id[1]] = value;
        //change player
        player1 = !player1;
        //check is win
        checkWin(_id, value);

        /* --- OLD CODE ----
        let value;
        if (player1) {
          e.target.textContent = "X";
          e.target.classList.add("x");
          board[_id[0]][_id[1]] = "x";
          player1 = !player1;
          value = "x";
        } else {
          e.target.textContent = "O";
          e.target.classList.add("o");
          board[_id[0]][_id[1]] = "o";
          player1 = !player1;
          value = "o";
        }
        console.log("id ", _id, " value ", value);   <--- just for console test
        check every new cell clicked  
        checkWin(_id, value);
        */
      }
    });

    boardElement.appendChild(tempCell);
  }
}
