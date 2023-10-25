import { useEffect, useState } from 'react';
import { saveCharCoordinatesToLocal } from '../utils/charLocalStorage';
import charToCoordinates from '../data/char';

import Matrix from '../Class/Matrix';
import { createEmptyMatrix } from '../utils/matrix';

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

	const [matrix] = useState(() => new Matrix(width, height));
	const [matrixV, setMatrixV] = useState<boolean[][]>(
		createEmptyMatrix(width, length)
	);
	useEffect(() => {
		matrix.mapInputToMatrix(word);
		setMatrixV(matrix.getMatrix());
	}, [word]);

	return (
		<div>
			{matrixV.map((row, rowIndex) => (
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
