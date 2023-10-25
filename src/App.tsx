import AllChar from "./pixelboard/allChar";
import MatrixComponent from "./pixelboard/pixelboard";
import { useState } from "react";

function App() {
  const [currentString, setCurrentString] = useState<string>("");
  const [allWords, setAllWords] = useState<String[]>([]);
  const [width, setWidth] = useState<number>(20);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const inputValue = e.target.elements.textInput.value;

    setAllWords([...allWords, inputValue]);
    e.target.elements.textInput.value = "";
  };

  return (
    <div>
      <input
        type="range"
        min="4"
        max="50"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setWidth(parseInt(e.target.value))
        }
      ></input>
      <MatrixComponent
        width={width}
        height={5}
        word={currentString}
      ></MatrixComponent>
      <form onSubmit={handleFormSubmit}>
        <input name="textInput" placeholder="Enter text" />
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
