"use strict";
let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
let player1 = true;
let boardElement = document.querySelector(".board");

for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    //tao cell va them id theo vi tri i,j
    let tempCell = document.createElement("div");
    let _id = `${i}${j}`;
    tempCell.setAttribute("id", _id);
    tempCell.classList.add("cell");
    // tempCell.getAttribute

    // if (board[i][j] === "x") {
    //   tempCell.textContent = "X";
    // } else if (board[i][j] === "o") {
    //   tempCell.textContent = "O";
    // }
    //add event
    tempCell.addEventListener("click", e => {
      //neu chua co class locked => da click
      if (!e.target.classList.contains("locked")) {
        e.target.classList.add("locked");
        //neu player 1, gia tri x, doi player va nguoc lai
        // let _id = e.target.getAttribute("id");
        if (player1) {
          e.target.textContent = "X";
          board[_id[0]][_id[1]] = "x";
          player1 = !player1;
        } else {
          e.target.textContent = "O";
          board[_id[0]][_id[1]] = "o";
          player1 = !player1;
        }
      }
    });

    boardElement.appendChild(tempCell);
  }
}
