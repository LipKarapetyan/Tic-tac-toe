import React, { useState } from 'react';
import './App.css';

const initialState = {
  board: Array(9).fill(null),
  currentPlayer: 'X',
  winner: null,
};

const App = () => {
  const [state, setState] = useState(initialState);

  const checkWinner = (board) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    if (board.every((cell) => cell !== null)) {
      return 'Draw';
    }

    return null;
  };

  const handleCellClick = (index) => {
    if (state.board[index] || state.winner) {
      return;
    }

    const updatedBoard = [...state.board];
    updatedBoard[index] = state.currentPlayer;

    const winner = checkWinner(updatedBoard);
    setState({
      board: updatedBoard,
      currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X',
      winner: winner,
    });
  };

  const handleRestart = () => {
    setState(initialState);
  };

  const renderCell = (index) => {
    return (
      <div className="cell" onClick={() => handleCellClick(index)}>
        {state.board[index]}
      </div>
    );
  };

  return (
    <div className="app">
      <h1>Tic-Tac-Toe</h1>
      <div className="board">
        {state.board.map((_, index) => renderCell(index))}
      </div>
      {state.winner && (
        <div className="result">
          {state.winner === 'Draw' ? 'It\'s a Draw!' : `Player ${state.winner} wins!`}
          <button onClick={handleRestart}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default App;
