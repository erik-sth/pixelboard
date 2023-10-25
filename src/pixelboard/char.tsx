import React, { useEffect, useState } from "react";
import {
  getCharCoordinatesFromLocal,
  saveCharCoordinatesToLocal,
} from "../utils/charLocalStorage";

interface Props {
  input: string;
}

const Char: React.FC<Props> = ({ input }) => {
  const initialMatrix: boolean[][] = getCharCoordinatesFromLocal()[input];

  const [matrix, setMatrix] = useState<boolean[][]>(initialMatrix);

  const toggleCell = (row: number, col: number): void => {
    const newMatrix = [...matrix];
    newMatrix[row][col] = !newMatrix[row][col];
    setMatrix(newMatrix);
    saveCharCoordinatesToLocal(input, newMatrix);
  };
  useEffect(() => {
    setMatrix(getCharCoordinatesFromLocal()[input]);
  }, [input]);
  if (!matrix) {
    return <div>Matrix not found</div>;
  }
  return (
    <div>
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
