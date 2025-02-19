// DOM
const BUT_CELLS = document.querySelectorAll("button.cell");
const BUT_RESET = document.querySelector("button#reset");
const ACTIVE_PLAYER_VALUE = document.querySelector("#active-player-value");
const POP_UP_GAMEOVER_CONTAINER = document.querySelector("#pop-up-gameover-container");
const WINNER_VALUE = document.querySelector("#winner-value");

// Events
BUT_CELLS.forEach(button => {
  button.addEventListener("click", () => {
    const INDEX = Number(button.dataset.id);
    console.log(INDEX);
    gameManager.play(INDEX);
  })
})

BUT_RESET.addEventListener("click", () => {
  gameManager.reset();
})

// Core Logic
class GameManager {
  constructor() {
    this.PLAYERS = [new Player("Player","X"),new Player("CPU","O")]
    this.activePlayer = this.PLAYERS[0];
    this.gameBoard = new GameBoard();
    this.winner = undefined;
    this.WIN_CONDITIONS = [
      // Horizontal rows
      [0, 1, 2],
      [3, 4 ,5],
      [6, 7 ,8],
      // Vertical Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Diagonal Rows
      [0, 4, 8],
      [2, 4, 6]
    ]
  }

  getActivePlayerName() {
    return this.activePlayer.getName();
  }

  changeActivePlayer() {
    this.activePlayer = this.activePlayer === this.PLAYERS[0] ? this.PLAYERS[1] : this.PLAYERS[0];
    this.updateActivePlayerUI();
  }
  
  updateActivePlayerUI() {
    ACTIVE_PLAYER_VALUE.innerHTML = `<b>Turn:</b> ${this.getActivePlayerName()}`;
  }

  play(index) {
    if (this.winner) return this.gameOver();

    this.playerMove(index);
    if (this.winner || this.gameBoard.getMovesLeft() <= 0) return this.gameOver();

    this.cpuMove();
    if (this.winner) return this.gameOver();
  }

  playerMove(index) {
    const CELL = this.gameBoard.board[index];
    if (CELL.getValue() != undefined) return;

    CELL.setValue(this.activePlayer);
    this.checkWin();
    this.updateCellUI(index);
    this.changeActivePlayer();
    this.gameBoard.decMovesLeft();
  }

  cpuMove() {
    console.log("Cpu move");
    // Map available array cells as indexes and filter out what is already taken
    let cellIndices  = this.gameBoard.board.map((cell, index) => cell.getValue() === undefined ? index : null)
    let availableCells = cellIndices .filter(index => index !== null);
    const RANDOM_INDEX = availableCells[Math.floor(Math.random() * availableCells.length)];
    this.gameBoard.board[RANDOM_INDEX].setValue(this.activePlayer);
    this.checkWin();
    this.updateCellUI(RANDOM_INDEX);
    this.changeActivePlayer();
    this.gameBoard.decMovesLeft();
  }

  updateCellUI(index) {
    if (BUT_CELLS[index].textContent !== "") return;
    BUT_CELLS[index].textContent = this.activePlayer.symbol;
  }
  
  checkWin() {
    const BOARD = this.gameBoard.getBoard();

    for (let i = 0; i < this.WIN_CONDITIONS.length; i++) {
      const condition = this.WIN_CONDITIONS[i];
      const cellA = BOARD[condition[0]].getValue();
      const cellB = BOARD[condition[1]].getValue();
      const cellC = BOARD[condition[2]].getValue();

      if (cellA === undefined || cellB === undefined || cellC === undefined) {
        continue;
      }

      if (cellA == cellB && cellB == cellC) {
        this.winner = this.getActivePlayerName();
        break;
      }
    }
  }

  gameOver() {
    if (this.winner === undefined) {
      WINNER_VALUE.textContent = "Tie";
    }
    else {
      WINNER_VALUE.textContent = `${this.winner} won the game!`;
    }

    POP_UP_GAMEOVER_CONTAINER.style.display = "block";
  }

  reset() {
    this.activePlayer = this.PLAYERS[0];
    this.gameBoard = new GameBoard();
    this.winner = undefined;
    this.updateActivePlayerUI();
    BUT_CELLS.forEach(button => {
      button.textContent = "";
    })
    POP_UP_GAMEOVER_CONTAINER.style.display = "none";
  }
}

class GameBoard {
  constructor () {
    this.board = this.createBoard();
    this.movesLeft = 9;
  }

  createBoard() {
    return Array(9).fill(undefined).map(() => new Cell());
  }

  getBoard(){ 
    return this.board;
  }

  decMovesLeft() {
    this.movesLeft--;
  }

  getMovesLeft() {
    return this.movesLeft;
  }
}

class Cell {
  constructor(){
    this.value = undefined;
  }

  getValue() {
    return this.value;
  }

  setValue(player) {
    this.value = player.symbol;
  }
}

class Player {
  constructor(name,symbol) {
    this.name = name;
    this.symbol = symbol;
  }

  getName() {
    return this.name;
  }
}

// Create Board
let gameManager = new GameManager();
gameManager.reset();