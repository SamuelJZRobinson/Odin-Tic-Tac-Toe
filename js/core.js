// DOM
const BUT_CELLS = document.querySelectorAll("button.cell");

// Events
BUT_CELLS.forEach(button => {
  button.addEventListener("click", () => {
    const CELL_ID = button.dataset.id;
    console.log(CELL_ID);
    gameManager.playMove(CELL_ID);
  })
})

// Core Logic
class GameManager {
  constructor() {
    this.PLAYERS = [new Player("Player","X"),new Player("CPU","O")]
    this.activePlayer = this.PLAYERS[0];
    this.GAME_BOARD = new GameBoard();
  }

  getActivePlayer() {
    return this.activePlayer.getName();
  }

  changeActivePlayer() {
    this.activePlayer = this.activePlayer === this.PLAYERS[0] ? this.PLAYERS[1] : this.PLAYERS[0];
  }

  playMove(cellId) {

  }
}

class GameBoard {
  constructor () {
    this.board = this.createBoard();
    this.TOTAL_CELLS = 3 * 3;
  }

  createBoard() {
    return Array(9).fill(new Cell());
  }

  setPlayerToken() {

  }

  setCpuToken() {

  }

  randomCell() {

  }
}

class Cell {
  constructor(){
    this.value = undefined;
  }

  setValue(player) {
    this.value = player.symbol;
  }

  getValue() {
    return this.value;
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
console.log("Active player:",gameManager.activePlayer);
console.log("Active player:",gameManager.getActivePlayer());
gameManager.changeActivePlayer();
console.log("Active player:",gameManager.getActivePlayer());
console.log(gameManager.GAME_BOARD);