// DOM
const BUT_CELLS = document.querySelectorAll("button.cell");

// Events
BUT_CELLS.forEach(button => {
  button.addEventListener("click", () => {
    const INDEX = button.dataset.id;
    console.log(INDEX);
    updateCellUI(button);
    gameManager.playMove(INDEX);
  })
})

function updateCellUI(button){
  if (button.textContent !== "") return;
  button.textContent = gameManager.activePlayer.symbol;
}

// Core Logic
class GameManager {
  constructor() {
    this.PLAYERS = [new Player("Player","X"),new Player("CPU","O")]
    this.activePlayer = this.PLAYERS[0];
    this.gameBoard = new GameBoard();
  }

  getActivePlayer() {
    return this.activePlayer.getName();
  }

  changeActivePlayer() {
    this.activePlayer = this.activePlayer === this.PLAYERS[0] ? this.PLAYERS[1] : this.PLAYERS[0];
  }

  playMove(index) {
    const CELL = this.gameBoard.board[index];
    if (CELL.getValue() != undefined) return;

    CELL.setValue(this.activePlayer);
    this.changeActivePlayer();
  }

  playRandom() {
    
  }
}

class GameBoard {
  constructor () {
    this.board = this.createBoard();
  }

  createBoard() {
    return Array(9).fill(undefined).map(() => new Cell());
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