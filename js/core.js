class GameBoard{
  constructor (){
    this.board = this.createBoard();
  }

  createBoard(){
    // Manually set board for now
    return [[new Cell(),new Cell(),new Cell()],[new Cell(),new Cell(),new Cell()],[new Cell(),new Cell(),new Cell()]];
  }

  setCellSymbol(row,column,symbol){
    this.board[row][column].setValue(symbol);
    this.printBoard();
  }

  printBoard(){
    for (let row of this.board){
      let rowString = row.map(cell => cell.getValue());
      console.log(rowString);
    }
    console.log("");
  }
}

class Cell{
  constructor(){
    this.value = null;
  }

  setValue(symbol){
    this.value = symbol;
  }

  getValue(){
    return this.value;
  }
}

class Player{
  constructor (symbol){
    this.playerSymbol = symbol;
  }

  getSymbol(){
    return this.playerSymbol;
  }
}

// Setup
const PLAYER_1 = new Player("O");
const PLAYER_2 = new Player("X");
let activePlayer = PLAYER_1;
let board = new GameBoard();
board.printBoard();

function gameHandler(){
  board.setCellSymbol(1,1,activePlayer.getSymbol());
  // switchPlayer();
}

function switchPlayer(){
  return PLAYER_1 ? PLAYER_2 : PLAYER_1;
}

gameHandler();