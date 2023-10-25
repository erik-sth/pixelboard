import { useEffect, useState } from 'react';
import {
	getCharCoordinatesFromLocal,
	saveCharCoordinatesToLocal,
} from '../utils/charLocalStorage';
import charToCoordinates from '../data/char';

interface Props {
	height: number;
	width: number;
	word: string;
}

const MatrixComponent = ({ height, width, word }: Props) => {
	useEffect(() => {
		if (localStorage.getItem('savedChar') !== 'true') {
			Object.keys(charToCoordinates).forEach((key) => {
				saveCharCoordinatesToLocal(key, charToCoordinates[key]);
			});
		}
		localStorage.setItem('savedChar', 'true');
	}, []);
	useEffect(() => {
		updateMatrixFromText(word);
	}, [word]);
	const [matrix, setMatrix] = useState(() => {
		const initialMatrix = Array.from({ length: height }, () =>
			Array(width).fill(false)
		);
		return initialMatrix;
	});

	const updateMatrixFromText = (inputText: string) => {
		const newMatrix = Array.from({ length: height }, () =>
			Array(width).fill(false)
		);

		let currentXPosition = 0;

		for (let i = 0; i < inputText.length; i++) {
			const char = inputText[i].toUpperCase();
			const coordinates = getCharCoordinatesFromLocal()[char];

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
