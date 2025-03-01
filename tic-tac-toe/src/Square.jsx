export default function Square({ value, onSquareClick }) {
  return (
    <button
      className={`square ${value ? "square-ticked" : ""}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
