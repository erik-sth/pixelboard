import AllChar from "./pixelboard/allChar";
import MatrixComponent from "./pixelboard/pixelboard";
import { useState } from "react";

function App() {
  const [currentString, setCurrentString] = useState<string>("");
  const [allWords, setAllWords] = useState<String[]>([]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const inputValue = e.target.elements.textInput.value;

    const isValidInput = /^[A-Z]+$/.test(inputValue);

    if (isValidInput) {
      setAllWords([...allWords, inputValue]);
    } else {
      alert("Please enter only uppercase letters A-Z.");
    }

    e.target.elements.textInput.value = "";
  };

  return (
    <div>
      <MatrixComponent
        width={20}
        height={5}
        word={currentString}
      ></MatrixComponent>
      <form onSubmit={handleFormSubmit}>
        <input
          name="textInput"
          placeholder="Enter text"
          pattern="[A-Z]+"
          title="Please enter one or more uppercase letters A-Z"
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {allWords.map((word, index) => (
          <li key={index}>
            <button onClick={() => setCurrentString(word)}>{word}</button>
          </li>
        ))}
      </ul>
      <AllChar />
    </div>
  );
}

export default App;
