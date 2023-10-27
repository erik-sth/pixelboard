import { useEffect, useState } from 'react';
import { setAllCharToLocalStorage } from '../utils/charLocalStorage';
import charToCoordinates from '../data/char';
import { number_map } from '../data/numberToChar';
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
            setAllCharToLocalStorage(charToCoordinates);
        }
        localStorage.setItem('savedChar', 'true');
    }, []);

    const [matrix] = useState(() => new Matrix(width, height));
    const [matrixV, setMatrixV] = useState<number[][]>(
        createEmptyMatrix(width, length)
    );
    useEffect(() => {
        matrix.mapInputToMatrix(word);
        setMatrixV(matrix.getMatrix());
    }, [word]);

    useEffect(() => {
        matrix.updateWidth(width);
        setMatrixV(matrix.getMatrix());
    }, [width]);

    return (
        <div
            style={{ width: '60%', display: 'flex', justifyContent: 'center' }}
        >
            <div>
                <div style={{ paddingLeft: '13px' }}>
                    {matrixV[0]?.map((_column, index) => (
                        <span
                            className="white"
                            style={{
                                display: 'inline-block',
                                width: '22px', // width of pixel + 1px to replace border left and right
                                height: '20px',
                            }}
                        >
                            {number_map[index]}
                        </span>
                    ))}
                </div>
                {matrixV.map((row, rowIndex) => (
                    <div style={{ height: '20px' }} key={rowIndex}>
                        <span className="white">{rowIndex + 1}</span>
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
        </div>
    );
};

export default MatrixComponent;
