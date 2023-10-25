import MatrixComponent from "./pixelboard/pixelboard";
import { useState } from "react";

function App() {
  const [currentString, setCurrentString] = useState<string>("");
  const [allWords, setAllWords] = useState<String[]>([]);

  return (
    <div>
      <MatrixComponent
        width={20}
        height={5}
        word={currentString}
      ></MatrixComponent>
      <textarea
        placeholder="Enter text"
        onBlur={(e) => setAllWords([...allWords, e.target.value])}
      />
      <ul>
        {allWords.map((word, index) => (
          <li key={index}>
            <button onClick={() => setCurrentString(word)}>{word}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
