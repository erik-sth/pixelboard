import { useState, FormEvent } from 'react';
import {
    getCharCoordinatesFromLocal,
    removeCharsFromLocalStorage,
    setAllCharToLocalStorage,
} from '../utils/charLocalStorage';
import Char from './char';
import charToCoordinates from '../data/char';

export const AllChar = () => {
    const chars = Object.keys(getCharCoordinatesFromLocal());
    const [currentChar, setCurrentChar] = useState<string>('');

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const inputElement = e.currentTarget.elements.namedItem(
            'textInput'
        ) as HTMLInputElement;

        if (inputElement) {
            const inputValue = inputElement.value;
            setCurrentChar(inputValue);
            inputElement.value = '';
        }
    };

    return (
        <div className="max-width container">
            <div>
                <h4>Currently editing: {currentChar}</h4>
                <Char input={currentChar} />
            </div>
            <div>
                <div className="container">
                    <form onSubmit={handleFormSubmit}>
                        <input
                            name="textInput"
                            placeholder="Enter text"
                            maxLength={1}
                        />
                        <button className="btn" type="submit">
                            Submit
                        </button>
                    </form>
                    <button
                        className="btn"
                        onClick={() => {
                            removeCharsFromLocalStorage();
                            setAllCharToLocalStorage(charToCoordinates);
                        }}
                    >
                        Reset
                    </button>
                </div>
                <div>
                    {chars.map((char, index) => (
                        <button
                            className="btn"
                            onClick={() => setCurrentChar(char)}
                            key={index}
                        >
                            {char}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllChar;
