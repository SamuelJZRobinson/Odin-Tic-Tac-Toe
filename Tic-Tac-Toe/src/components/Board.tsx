import { useState } from "react";
import Cell from "./Cell";

function Board() {
  const [cells, setCells] = useState(Array(9).fill(""));
  const [xIsPlaying, setXIsPlaying] = useState(true);
  const [winner, setWinner] = useState("");

  function handleClick(i) {
    // Don't modify existing values
    if (cells[i] || winner) return;

    const nextCells = cells.slice();
    nextCells[i] = "X";
    setCells(nextCells);
    setXIsPlaying(false);

    if (calculateWinner(nextCells)) {
      setWinner("X Wins!");
      return;
    }

    // Let CPU move if no winner
    cpuMove(nextCells);
    setXIsPlaying(true);

    if (calculateWinner(nextCells)) {
      setWinner("O Wins!");
      return;
    }
  }

  function cpuMove(currentCells) {
    // Get available cells
    const cellOptions = currentCells
      .map((cell, index) => (cell === "" ? index : ""))
      .filter((index) => index !== "");

    // Get random index
    const RANDOM_INDEX =
      cellOptions[Math.floor(Math.random() * cellOptions.length)];

    // Set cell item, change default value to token
    currentCells[RANDOM_INDEX] = "O";
    // Trigger re-render
    setCells(currentCells);
  }

  function calculateWinner(cells) {
    // Win conditions
    const lines = [
      // Rows
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // Columns
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Diagonals
      [0, 4, 8],
      [2, 4, 6],
    ];

    // Iteratre over each win line
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      // Check cell a is not blank
      // Check cells are all the same (a = b = c)
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        // Declare winning token
        return cells[a];
      }
    }
    // Declare no winner
    return null;
  }

  return (
    // Cells directly read the cells array values via props
    <>
      <div className="winner">{winner}</div>

      <div className="board-row">
        <Cell value={cells[0]} onCellClick={() => handleClick(0)} />
        <Cell value={cells[1]} onCellClick={() => handleClick(1)} />
        <Cell value={cells[2]} onCellClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Cell value={cells[3]} onCellClick={() => handleClick(3)} />
        <Cell value={cells[4]} onCellClick={() => handleClick(4)} />
        <Cell value={cells[5]} onCellClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Cell value={cells[6]} onCellClick={() => handleClick(6)} />
        <Cell value={cells[7]} onCellClick={() => handleClick(7)} />
        <Cell value={cells[8]} onCellClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default Board;
