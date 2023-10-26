import { getCharCoordinatesFromLocal } from '../utils/charLocalStorage';
import { createEmptyMatrix } from '../utils/matrix';

class Matrix {
    matrix: number[][];
    width: number;
    height: number;
    failed: boolean;
    constructor(width: number, height: number) {
        this.matrix = createEmptyMatrix(width, height);
        this.width = width;
        this.height = height;
        this.failed = false;
    }
    isFailed() {
        return this.failed;
    }
    getMatrix() {
        return this.matrix;
    }
    updateWidth(width: number) {
        this.width = width;
        this.matrix = createEmptyMatrix(width, this.height);
    }

    mapInputToMatrix(word: string): Matrix {
        this.matrix = createEmptyMatrix(this.width, this.height);

        let currentXPosition = 0;
        for (let i = 0; i < word.length; i++) {
            const char = word[i].toUpperCase();
            const coordinates = getCharCoordinatesFromLocal()[char];

            if (currentXPosition + coordinates[0].length > this.width) {
                this.failed = true;
                break;
            }
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
