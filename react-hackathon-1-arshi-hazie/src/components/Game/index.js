// game
// state - board, players, in progress, current player,
// props -
// behaviour - getNextPlayer(), startGame(), checkWinner()?, checkMoveValidity()

import React, { useState } from "react";
import Board from "../Board";
import { winningCombinations } from "./winningCombinations";

function Game() {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
    },
  ]);

  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

  const current = history[history.length - 1];
  const winner = calculateWinner(current.squares);

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (current.squares.every((s) => s)) {
    //every square has content -
    status = "GAME OVER - NO WINNER!";
  } else {
    status = "Next player: " + getNextPlayerValue();
  }

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const moves = history.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  function getNextPlayerValue() {
    if (xIsNext) {
      return "☠️";
    }
    return "🧟";
  }

  function handleClick(index) {
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[index]) {
      return;
    }
    squares[index] = getNextPlayerValue();

    setHistory([...history, { squares }]);
    setXIsNext(!xIsNext);
  }
  // put moves between ol
  return (
    <div>
      <div className="game-info">
        <div className="status">{status}</div>
      </div>
      <Board squares={current.squares} onClick={handleClick} />;
    </div>
  );
}

// bring calculate winner here
function calculateWinner(squares) {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;
