import { getCharCoordinatesFromLocal } from '../utils/charLocalStorage';
import { createEmptyMatrix } from '../utils/matrix';

class Matrix {
	matrix: boolean[][];
	width: number;
	height: number;

	constructor(width: number, height: number) {
		this.matrix = createEmptyMatrix(width, height);
		this.width = width;
		this.height = height;
	}

	getMatrix() {
		return this.matrix;
	}

	mapInputToMatrix(word: string): Matrix {
		this.matrix = createEmptyMatrix(this.width, this.height);

		let currentXPosition = 0;

		for (let i = 0; i < word.length; i++) {
			const char = word[i].toUpperCase();
			const coordinates = getCharCoordinatesFromLocal()[char];

			if (coordinates) {
				for (let j = 0; j < coordinates.length; j++) {
					for (let k = 0; k < coordinates[j].length; k++) {
						this.matrix[j][k + currentXPosition] =
							coordinates[j][k];
					}
				}
			}

			currentXPosition += coordinates[0].length + 1;
		}

		return this;
	}
}

export default Matrix;
