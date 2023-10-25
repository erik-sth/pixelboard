import React, { useState } from "react";
import { getCharCoordinatesFromLocal } from "../utils/charLocalStorage";
import Char from "./char";

export const AllChar = () => {
  const chars = Object.keys(getCharCoordinatesFromLocal());
  const [currentChar, setCurrentChar] = useState<string>("A");
  return (
    <div>
        {chars.map((char, index) => (
            <button onClick={(e) => setCurrentChar(e.target.value)} key={index}>
              {char}
            </button>
        ))}
      <Char input={currentChar} />
    </div>
  );
};

export default AllChar;
