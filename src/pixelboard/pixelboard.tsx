import { useEffect, useState } from 'react';
import { setAllCharToLocalStorage } from '../utils/charLocalStorage';
import charToCoordinates from '../data/char';
import { number_map} from "../data/numberToChar";
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
        <div style={{ width: '60%' }}>
            matrix[0]?.map((column,index)=> <span>number_map[index]</span>)
            {matrixV.map((row, rowIndex) => (
                <div style={{ height: '20px' }} key={rowIndex}><span className="white">{rowIndex}</span>
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
