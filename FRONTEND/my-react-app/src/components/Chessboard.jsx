// Chessboard.jsx
import React from 'react';
import './Chessboard.css';

const Chessboard = () => {
  // Generate the chessboard squares dynamically
  const renderSquares = () => {
    const squares = [];

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const isEvenSquare = (row + col) % 2 === 0;
        const squareColor = isEvenSquare ? 'light' : 'dark';

        squares.push(
          <div key={`${row}-${col}`} className={`square ${squareColor}`}>
            {/* You can place chess pieces or any content here */}
          </div>
        );
      }
    }

    return squares;
  };

  return <div className="chessboard">{renderSquares()}</div>;
};

export default Chessboard;
