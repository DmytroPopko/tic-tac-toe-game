import React from "react";
import { useState } from "react";

function Square({ value, onSquareClick }) {
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}

function Board( {xIsNext, squares, onPlay} ) {
  
  function handleClic(i) {
    if (squares[i] || calculateWinner(squares)) {
      return
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X"
    } else {
      nextSquares[i] = "0"
    }
    onPlay(nextSquares);
  }

  const winner  = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "0");
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClic(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClic(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClic(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClic(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClic(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClic(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClic(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClic(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClic(8)}/>
      </div>
    </div>
  );
}

export default function Game(){
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrenMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlPlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory);
    setCurrenMove(nextHistory.length - 1);
  }
  
  function jumpTo(nextMove) {
    setCurrenMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let decsription;
    if (move > 0) {
      decsription = 'Go to move #' + move;
    } else {
      decsription = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{decsription}</button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlPlay} />
      </div>
    <div className="game-info">
      <ol>{moves}</ol>
    </div>
    </div>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
  }
}
return null;
}