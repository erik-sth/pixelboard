import React, { useEffect, useState } from 'react';
import {
    getCharCoordinatesFromLocal,
    saveCharCoordinatesToLocal,
} from '../utils/charLocalStorage';
import { createEmptyMatrix } from '../utils/matrix';

interface Props {
    input: string;
}

const Char: React.FC<Props> = ({ input }) => {
    const initialMatrix: number[][] = getCharCoordinatesFromLocal()[input];

    const [matrix, setMatrix] = useState<number[][]>(initialMatrix);
    const [width, setWidth] = useState<number>(5);

    function createNewMatrix() {
        const newMatrix = createEmptyMatrix(width, 5);
        setMatrix(newMatrix);
    }

    const toggleCell = (row: number, col: number): void => {
        const newMatrix = [...matrix];
        newMatrix[row][col] = newMatrix[row][col] == 1 ? 0 : 1;
        setMatrix(newMatrix);
        saveCharCoordinatesToLocal(input, newMatrix);
    };
    useEffect(() => {
        if (initialMatrix) {
            setMatrix(getCharCoordinatesFromLocal()[input]);
        } else {
            createNewMatrix();
        }
    }, [input]);

    useEffect(() => {
        createNewMatrix();
    }, [width]);

    if (!matrix) {
        return <div>Matrix not found</div>;
    }

    return (
        <div>
            {matrix.map((row, rowIndex) => (
                <div key={rowIndex}>
                    {row.map((cell, colIndex) => (
                        <span
                            key={colIndex}
                            onClick={() => toggleCell(rowIndex, colIndex)}
                            style={{
                                display: 'inline-block',
                                width: '20px',
                                height: '20px',
                                border: '1px solid #000',
                                background: cell ? 'black' : 'white',
                                cursor: 'pointer',
                            }}
                        />
                    ))}
                </div>
            ))}
            <div className="container">
                <input
                    type="range"
                    min="3"
                    max="6"
                    value={width}
                    onChange={(e) => setWidth(parseInt(e.target.value))}
                ></input>{' '}
                <div className="white">{width}</div>
            </div>
        </div>
    );
};

export default Char;
