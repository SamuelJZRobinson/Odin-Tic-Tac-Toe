import { useState } from "react";
import Cell from "./Cell";

function Board() {
  const [cells, setCells] = useState(Array(9).fill(""));

  function handleClick(i) {
    // Don't modify existing values
    if (cells[i]) {
      return;
    }

    // Create cell array copy
    const nextCells = cells.slice();
    // Set cell item, change default value to token
    nextCells[i] = "X";
    // Trigger re-render
    setCells(nextCells);

    cpuMove(nextCells);
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

  return (
    // Cells directly read the cells array values via props
    <>
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
