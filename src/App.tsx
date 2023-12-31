import { ChangeEvent, FormEvent, useState } from 'react';
import { Nav } from './Nav/Nav';
import WordList from './pixelboard/WordList';
import Chars from './charMapping/Chars';
import './App.css';
import MatrixComponent from './pixelboard/pixelboard';
function App() {
    const [currentString, setCurrentString] = useState<string>('');
    const [allWords, setAllWords] = useState<string[]>([]);
    const [width, setWidth] = useState<number>(19);

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const inputElement = e.currentTarget.querySelector(
            '[name="textInput"]'
        ) as HTMLInputElement;

        if (inputElement) {
            const inputValue = inputElement.value;

            setAllWords((prevWords) => [...prevWords, inputValue]);
            setCurrentString(inputValue);
            inputElement.value = '';
        }
    };
    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const fileInput = e.target;
        const file = fileInput.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const fileContent = (event.target as FileReader)
                    .result as string;
                const words = fileContent.match(/\b\w+\b/g) || [];

                setAllWords((prevWords) => [...prevWords, ...words]);
            };

            reader.readAsText(file);
        }
    };

    return (
        <div>
            <Nav allWords={allWords} width={width} />

            <div className="container space-between">
                <div>
                    <form onSubmit={handleFormSubmit}>
                        <input
                            pattern={'^[a-zA-Z]+$'}
                            className="input"
                            name="textInput"
                            placeholder="Enter text"
                        />
                        <button className="btn" type="submit">
                            Submit
                        </button>
                    </form>
                    <WordList
                        allWords={allWords}
                        onClick={(currentString) =>
                            setCurrentString(currentString)
                        }
                    />
                </div>
                <MatrixComponent
                    width={width}
                    height={5}
                    word={currentString}
                ></MatrixComponent>
                <div>
                    <h3>Settings</h3>
                    <input
                        type="file"
                        onChange={handleFileUpload}
                        accept=".txt"
                    />
                    <h4 className="reset">width:</h4>
                    <div className="container">
                        <input
                            type="range"
                            value={width}
                            min="4"
                            max="50"
                            onChange={(e) => setWidth(parseInt(e.target.value))}
                        ></input>
                        <div className="white">{width}</div>
                    </div>
                </div>
            </div>

            <Chars />
        </div>
    );
}

export default App;
