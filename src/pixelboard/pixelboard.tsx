import React, { useState } from 'react';

interface MatrixComponentProps {
  initialHeight: number;
  initialWidth: number;
}

const MatrixComponent: React.FC<MatrixComponentProps> = ({
  initialHeight,
  initialWidth,
}) => {
  const initialMatrix: boolean[][] = Array.from({ length: initialHeight }, () =>
    Array(initialWidth).fill(false)
  );

  const [matrix, setMatrix] = useState<boolean[][]>(initialMatrix);

  const toggleCell = (row: number, col: number): void => {
    const newMatrix = [...matrix];
    newMatrix[row][col] = !newMatrix[row][col];
    setMatrix(newMatrix);
  };

  return (
    <div>
      {matrix.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((cell, colIndex) => (
            <span
              key={colIndex}
              onClick={() => toggleCell(rowIndex, colIndex)}
              style={{
                display: 'inline-block',
                width: '20px',
                height: '20px',
                border: '1px solid #000',
                background: cell ? 'black' : 'white', 
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default MatrixComponent;

