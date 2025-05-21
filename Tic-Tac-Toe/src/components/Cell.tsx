function Cell({ value, onCellClick }) {
  return (
    <button className="cell" onClick={onCellClick}>
      {value}
    </button>
  );
}

export default Cell;
