import { ChangeEvent, FormEvent, useState } from 'react';
import MatrixComponent from './pixelboard/pixelboard';
import AllChar from './pixelboard/allChar';
import { Nav } from './Nav';

function App() {
	const [currentString, setCurrentString] = useState<string>('');
	const [allWords, setAllWords] = useState<string[]>([]);
	const [width, setWidth] = useState<number>(20);

	const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const inputElement = e.currentTarget.querySelector(
			'[name="textInput"]'
		) as HTMLInputElement;

		if (inputElement) {
			const inputValue = inputElement.value;

			setAllWords((prevWords) => [...prevWords, inputValue]);
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
			<input
				type='range'
				min='4'
				max='50'
				onChange={(e) => setWidth(parseInt(e.target.value))}
			></input>

     <div>{width}</div>

			<MatrixComponent
				width={width}
				height={5}
				word={currentString}
			></MatrixComponent>
			<form onSubmit={handleFormSubmit}>
				<input name='textInput' placeholder='Enter text' />
				<button type='submit'>Submit</button>
			</form>
			<input type='file' onChange={handleFileUpload} accept='.txt' />
			<ul>
				{allWords.map((word, index) => (
					<li key={index}>
						<button onClick={() => setCurrentString(word)}>
							{word}
						</button>
					</li>
				))}
			</ul>

			<AllChar />
		</div>
	);
}

export default App;
