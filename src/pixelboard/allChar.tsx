import { useState, FormEvent } from 'react';
import { getCharCoordinatesFromLocal } from '../utils/charLocalStorage';
import Char from './char';

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
		<div>
			{chars.map((char, index) => (
				<button onClick={() => setCurrentChar(char)} key={index}>
					{char}
				</button>
			))}
			<Char input={currentChar} />
			<div>Currently editing: {currentChar}</div>
			<form onSubmit={handleFormSubmit}>
				<input name='textInput' placeholder='Enter text' />
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
};

export default AllChar;
