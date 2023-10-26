import React, { useEffect, useState } from "react";
import {
  getCharCoordinatesFromLocal,
  saveCharCoordinatesToLocal,
} from "../utils/charLocalStorage";

import Matrix from "../Class/Matrix";
import { createEmptyMatrix } from "../utils/matrix";

interface Props {
  input: string;
}

const Char: React.FC<Props> = ({ input }) => {
  const initialMatrix: number[][] = getCharCoordinatesFromLocal()[input];

  const [matrix, setMatrix] = useState<number[][]>(initialMatrix);
  const [width, setWidth] = useState<number>(5);

  const toggleCell = (row: number, col: number): void => {
    const newMatrix = [...matrix];
    newMatrix[row][col] = newMatrix[row][col] == 1 ? 0 : 1;
    setMatrix(newMatrix);
    saveCharCoordinatesToLocal(input, newMatrix);
  };
  useEffect(() => {
    if (initialMatrix) {
      setMatrix(getCharCoordinatesFromLocal()[input]);
    } else {
      const newMatrix = Array.from({ length: 5 }, () =>
        Array(width).fill(false)
      );
      setMatrix(newMatrix);
    }
  }, [input, width]);

  if (!matrix) {
    return <div>Matrix not found</div>;
  }

  return (
    <div>
      <input
        type="range"
        min="2"
        max="50"
        onChange={(e) => setWidth(parseInt(e.target.value))}
      ></input>
      <div>{width}</div>
      {matrix.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((cell, colIndex) => (
            <span
              key={colIndex}
              onClick={() => toggleCell(rowIndex, colIndex)}
              style={{
                display: "inline-block",
                width: "20px",
                height: "20px",
                border: "1px solid #000",
                background: cell ? "black" : "white",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Char;
