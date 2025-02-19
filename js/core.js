// DOM
const BUT_CELLS = document.querySelectorAll("button.cell");
const ACTIVE_PLAYER_VALUE = document.querySelector("#active-player-value");

// Events
BUT_CELLS.forEach(button => {
  button.addEventListener("click", () => {
    const INDEX = button.dataset.id;
    console.log(INDEX);
    gameManager.play(INDEX);
  })
})

// Core Logic
class GameManager {
  constructor() {
    this.PLAYERS = [new Player("Player","X"),new Player("CPU","O")]
    this.activePlayer = this.PLAYERS[0];
    this.gameBoard = new GameBoard();
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
    this.playerMove(index);
    
    if (this.gameBoard.getMovesLeft() > 1) {
      this.cpuMove();
    }
    else {
      console.log("Gameover");
      console.log(this.gameBoard.getMovesLeft());
    }
  }

  playerMove(index) {
    const CELL = this.gameBoard.board[index];
    if (CELL.getValue() != undefined) return;

    CELL.setValue(this.activePlayer);
    this.updateCellUI(index);
    this.changeActivePlayer();
    this.gameBoard.decMovesLeft();
  }

  cpuMove() {
    console.log("Cpu move");
    // Map available array cells as indexes and filter out what is already taken
    let cellIndexes = this.gameBoard.board.map((cell, index) => cell.getValue() === undefined ? index : null)
    let availableCells = cellIndexes.filter(index => index !== null);
    const RANDOM_INDEX = availableCells[Math.floor(Math.random() * availableCells.length)];
    this.gameBoard.board[RANDOM_INDEX].setValue(this.activePlayer);
    this.updateCellUI(RANDOM_INDEX);
    this.changeActivePlayer();
    this.gameBoard.decMovesLeft();
  }

  updateCellUI(index) {
    if (BUT_CELLS[index].textContent !== "") return;
    BUT_CELLS[index].textContent = gameManager.activePlayer.symbol;
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
gameManager.updateActivePlayerUI();