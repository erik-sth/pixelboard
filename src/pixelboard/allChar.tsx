import React, { useState, useEffect } from "react";
import { getCharCoordinatesFromLocal } from "../utils/charLocalStorage";
import Char from "./char";

export const AllChar = () => {
  const chars = Object.keys(getCharCoordinatesFromLocal());
  const [currentChar, setCurrentChar] = useState<string>("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const inputValue = e.target.elements.textInput.value;
    setCurrentChar(inputValue);
    e.target.elements.textInput.value = "";
  };

  return (
    <div>
      {chars.map((char, index) => (
        <button onClick={() => setCurrentChar(char)} key={index}>
          {char}
        </button>
      ))}
      <Char input={currentChar} />
      <form onSubmit={handleFormSubmit}>
        <input
          name="textInput"
          placeholder="Enter text"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AllChar;
