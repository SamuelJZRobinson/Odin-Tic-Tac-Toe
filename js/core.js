class GameBoard{
  constructor (){
    this.BOARD_SIZE = 3;
    this.board = this.setBoard();
  }

  setBoard(){
    console.log("set board");
    // Manually set board for now
    return [[new Cell(),new Cell(),new Cell()],[new Cell(),new Cell(),new Cell()],[new Cell(),new Cell(),new Cell()]]
  }

  printBoard(){
    for (let row of this.board){
      let rowString = row.map(cell => cell.getValue());
      console.log(rowString);
    }
  }
}

class Cell{
  constructor(){
    this.value = null;
  }

  setValue(player){
    this.playerOwner = player;
  }

  getValue(){
    return this.value;
  }
}

class Player{
  constructor (symbol){
    this.playerSymbol = symbol;
  }
}

// // function GameHandler{

// // }
// Create Players
const Player1 = new Player("X")
const Player2 = new Player("O")

let board = new GameBoard();
board.setBoard();
board.printBoard();