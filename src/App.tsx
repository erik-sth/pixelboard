import React, { useState } from "react";
import MatrixComponent from "./pixelboard/pixelboard";
import AllChar from "./pixelboard/allChar";
import DownloadPdfButton from "./pixelboard/DownloadPdf";

function App() {
  const [currentString, setCurrentString] = useState<string>("");
  const [allWords, setAllWords] = useState<string[]>([]);
  const [width, setWidth] = useState<number>(20);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const inputValue = e.target.elements.textInput.value;

    setAllWords((prevWords) => [...prevWords, inputValue]);
    e.target.elements.textInput.value = "";
  };

  const handleFileUpload = (e) => {
    const fileInput = e.target;
    const file = fileInput.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target.result;
        const words = fileContent.match(/\b\w+\b/g) || []; // Extract words using a regular expression

        setAllWords((prevWords) => [...prevWords, ...words]);
      };

      reader.readAsText(file);
    }
  };

  const formatWordsAsCode = () => {
    const codeOutput = `Words: [${allWords
      .map((word) => `'${word}'`)
      .join(", ")}]`;

    const blob = new Blob([codeOutput], { type: "text/plain" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "words.txt";

    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <input
        type="range"
        min="4"
        max="50"
        onChange={(e) => setWidth(parseInt(e.target.value))}
      ></input>
      <DownloadPdfButton width={width} height={5} words={allWords} />
      <MatrixComponent
        width={width}
        height={5}
        word={currentString}
      ></MatrixComponent>
      <form onSubmit={handleFormSubmit}>
        <input name="textInput" placeholder="Enter text" />
        <button type="submit">Submit</button>
      </form>
      <input type="file" onChange={handleFileUpload} accept=".txt" />
      <ul>
        {allWords.map((word, index) => (
          <li key={index}>
            <button onClick={() => setCurrentString(word)}>{word}</button>
          </li>
        ))}
      </ul>
      <button onClick={formatWordsAsCode}>Download Words as Code</button>
      <AllChar />
    </div>
  );
}

export default App;
