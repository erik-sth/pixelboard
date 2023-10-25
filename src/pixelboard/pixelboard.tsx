import { useEffect, useState } from "react";
import {
  getCharCoordinatesFromLocal,
  saveCharCoordinatesToLocal,
} from "../utils/charLocalStorage";

interface Props {
  height: number;
  width: number;
  word: string;
}

const charToCoordinates = {
  A: [
    [0, 1, 0],
    [1, 0, 1],
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 1],
  ],
  B: [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 0],
    [1, 0, 1],
    [1, 1, 1],
  ],
  C: [
    [0, 1, 1],
    [1, 0, 0],
    [1, 0, 0],
    [1, 0, 0],
    [0, 1, 1],
  ],
  D: [
    [1, 1, 0],
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 0],
  ],
  E: [
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 0],
    [1, 0, 0],
    [1, 1, 1],
  ],
  F: [
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 0],
    [1, 0, 0],
    [1, 0, 0],
  ],
  G: [
    [0, 1, 1],
    [1, 0, 0],
    [1, 0, 1],
    [1, 0, 1],
    [0, 1, 1],
  ],
  H: [
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 1],
  ],
  I: [[1], [1], [1], [1], [1]],
  J: [
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
    [1, 0, 1],
    [0, 1, 0],
  ],
  K: [
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 0],
    [1, 0, 1],
    [1, 0, 1],
  ],
  L: [
    [1, 0, 0],
    [1, 0, 0],
    [1, 0, 0],
    [1, 0, 0],
    [1, 1, 1],
  ],
  M: [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  N: [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 1, 1],
    [1, 0, 0, 0, 1],
  ],
  O: [
    [0, 1, 0],
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [0, 1, 0],
  ],
  P: [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
    [1, 0, 0],
    [1, 0, 0],
  ],
  R: [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 0],
    [1, 0, 1],
    [1, 0, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
    [1, 1, 0],
  ],
  T: [
    [1, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ],
  U: [
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [0, 1, 0],
  ],
  V: [
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [0, 1, 0],
    [0, 1, 0],
  ],
  W: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 1, 0, 1, 1],
    [1, 0, 0, 0, 1],
  ],
  X: [
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [1, 0, 0, 0, 1],
  ],
  Y: [
    [1, 0, 1],
    [1, 0, 1],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ],
  Z: [
    [1, 1, 1, 1],
    [0, 0, 0, 1],
    [0, 0, 1, 0],
    [0, 1, 0, 0],
    [1, 1, 1, 1],
  ],
};

const MatrixComponent = ({ height, width, word }: Props) => {
  useEffect(() => {
    if (localStorage.getItem("savedChar") !== "true") {
      Object.keys(charToCoordinates).forEach((key) => {
        saveCharCoordinatesToLocal(key, charToCoordinates[key]);
      });
    }
    localStorage.setItem("savedChar", "true");
  }, []);
  useEffect(() => {
    updateMatrixFromText(word);
  }, [word]);
  const [matrix, setMatrix] = useState(() => {
    const initialMatrix = Array.from({ length: height }, () =>
      Array(width).fill(false)
    );
    return initialMatrix;
  });

  const updateMatrixFromText = (inputText: string) => {
    const newMatrix = Array.from({ length: height }, () =>
      Array(width).fill(false)
    );

    let currentXPosition = 0;

    for (let i = 0; i < inputText.length; i++) {
      const char = inputText[i].toUpperCase();
      const coordinates = getCharCoordinatesFromLocal()[char];
      console.log(coordinates);

      if (coordinates) {
        for (let j = 0; j < coordinates.length; j++) {
          for (let k = 0; k < coordinates[j].length; k++) {
            newMatrix[j][k + currentXPosition] = coordinates[j][k];
          }
        }
      }

      currentXPosition += coordinates[0].length + 1;
    }

    setMatrix(newMatrix);
  };

  return (
    <div>
      {matrix.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((cell, colIndex) => (
            <span
              key={colIndex}
              style={{
                display: "inline-block",
                width: "20px",
                height: "20px",
                border: "1px solid #000",
                background: cell ? "black" : "white",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default MatrixComponent;
