import { useEffect, useState } from 'react';

interface Props {
	height: number;
	width: number;
	word: string;
}

const charToCoordinates = {
	A: [
		[0, 1, 0],
		[1, 0, 1],
		[1, 1, 1],
		[1, 0, 1],
		[1, 0, 1],
	],
	B: [
		[1, 1, 1],
		[1, 0, 1],
		[1, 1, 0],
		[1, 0, 1],
		[1, 1, 1],
	],
	C: [
		[0, 1, 1],
		[1, 0, 0],
		[1, 0, 0],
		[1, 0, 0],
		[0, 1, 1],
	],
	D: [
		[1, 1, 0],
		[1, 0, 1],
		[1, 0, 1],
		[1, 0, 1],
		[1, 1, 0],
	],
	E: [
		[1, 1, 1],
		[1, 0, 0],
		[1, 1, 0],
		[1, 0, 0],
		[1, 1, 1],
	],
	F: [
		[1, 1, 1],
		[1, 0, 0],
		[1, 1, 0],
		[1, 0, 0],
		[1, 0, 0],
	],
	G: [
		[0, 1, 1],
		[1, 0, 0],
		[1, 0, 1],
		[1, 0, 1],
		[0, 1, 1],
	],
	H: [
		[1, 0, 1],
		[1, 0, 1],
		[1, 1, 1],
		[1, 0, 1],
		[1, 0, 1],
	],
	I: [[1], [1], [1], [1], [1]],
	J: [
		[0, 0, 1],
		[0, 0, 1],
		[0, 0, 1],
		[1, 0, 1],
		[0, 1, 0],
	],
	K: [
		[1, 0, 1],
		[1, 0, 1],
		[1, 1, 0],
		[1, 0, 1],
		[1, 0, 1],
	],
	L: [
		[1, 0, 0],
		[1, 0, 0],
		[1, 0, 0],
		[1, 0, 0],
		[1, 1, 1],
	],
	M: [
		[1, 0, 0, 0, 1],
		[1, 1, 0, 1, 1],
		[1, 0, 1, 0, 1],
		[1, 0, 0, 0, 1],
		[1, 0, 0, 0, 1],
	],
	N: [
		[1, 0, 0, 0, 1],
		[1, 1, 0, 0, 1],
		[1, 0, 1, 0, 1],
		[1, 0, 0, 1, 1],
		[1, 0, 0, 0, 1],
	],
	O: [
		[0, 1, 0],
		[1, 0, 1],
		[1, 0, 1],
		[1, 0, 1],
		[0, 1, 0],
	],
	P: [
		[1, 1, 1],
		[1, 0, 1],
		[1, 1, 1],
		[1, 0, 0],
		[1, 0, 0],
	],
	R: [
		[1, 1, 1],
		[1, 0, 1],
		[1, 1, 0],
		[1, 0, 1],
		[1, 0, 1],
	],
	S: [
		[0, 1, 1],
		[1, 0, 0],
		[0, 1, 0],
		[0, 0, 1],
		[1, 1, 0],
	],
	T: [
		[1, 1, 1],
		[0, 1, 0],
		[0, 1, 0],
		[0, 1, 0],
		[0, 1, 0],
	],
	U: [
		[1, 0, 1],
		[1, 0, 1],
		[1, 0, 1],
		[1, 0, 1],
		[0, 1, 0],
	],
	V: [
		[1, 0, 1],
		[1, 0, 1],
		[1, 0, 1],
		[0, 1, 0],
		[0, 1, 0],
	],
	W: [
		[1, 0, 0, 0, 1],
		[1, 0, 0, 0, 1],
		[1, 0, 1, 0, 1],
		[1, 1, 0, 1, 1],
		[1, 0, 0, 0, 1],
	],
	X: [
		[1, 0, 0, 0, 1],
		[0, 1, 0, 1, 0],
		[0, 0, 1, 0, 0],
		[0, 1, 0, 1, 0],
		[1, 0, 0, 0, 1],
	],
	Y: [
		[1, 0, 1],
		[1, 0, 1],
		[0, 1, 0],
		[0, 1, 0],
		[0, 1, 0],
	],
	Z: [
		[1, 1, 1, 1],
		[0, 0, 0, 1],
		[0, 0, 1, 0],
		[0, 1, 0, 0],
		[1, 1, 1, 1],
	],
};

const MatrixComponent = ({ height, width, word }: Props) => {
	// Function to save character coordinates to local storage
	const saveCharCoordinatesToLocal = (char: string, coordinates: []) => {
		// Get existing data from local storage
		const existingData = localStorage.getItem('charCoordinates');

		// Parse existing data or initialize an empty object
		const charCoordinates = existingData ? JSON.parse(existingData) : {};

		// Save or update the coordinates for the given character
		charCoordinates[char] = coordinates;

		// Convert the updated data back to a string and save to local storage
		localStorage.setItem(
			'charCoordinates',
			JSON.stringify(charCoordinates)
		);
	};

	// Function to get character coordinates from local storage
	const getCharCoordinatesFromLocal = () => {
		// Get data from local storage
		const charCoordinates = localStorage.getItem('charCoordinates');

		// Parse the data or return an empty object if no data is found
		return charCoordinates ? JSON.parse(charCoordinates) : {};
	};

	useEffect(() => {
		Object.keys(charToCoordinates).forEach((key) => {
			saveCharCoordinatesToLocal(key, charToCoordinates[key]);
		});
	}, []);

	useEffect(() => {
		if (!localStorage.getItem('charCoordinates')) {
			updateMatrixFromText(word);
		}
	}, [word]);
	const [matrix, setMatrix] = useState(() => {
		const initialMatrix = Array.from({ length: height }, () =>
			Array(width).fill(false)
		);
		return initialMatrix;
	});

	const updateMatrixFromText = (inputText: String) => {
		const newMatrix = Array.from({ length: height }, () =>
			Array(width).fill(false)
		);

		let currentXPosition = 0;

		for (let i = 0; i < inputText.length; i++) {
			const char = inputText[i].toUpperCase();
			const coordinates = charToCoordinates[char];
			console.log(coordinates);

			if (coordinates) {
				for (let j = 0; j < coordinates.length; j++) {
					for (let k = 0; k < coordinates[j].length; k++) {
						newMatrix[j][k + currentXPosition] = coordinates[j][k];
					}
				}
			}

			currentXPosition += coordinates[0].length + 1;
		}

		setMatrix(newMatrix);
	};

	return (
		<div>
			{matrix.map((row, rowIndex) => (
				<div key={rowIndex}>
					{row.map((cell, colIndex) => (
						<span
							key={colIndex}
							style={{
								display: 'inline-block',
								width: '20px',
								height: '20px',
								border: '1px solid #000',
								background: cell ? 'black' : 'white',
							}}
						/>
					))}
				</div>
			))}
		</div>
	);
};

export default MatrixComponent;
