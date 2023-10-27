import Matrix from '../Class/Matrix';
import PDFGenerator from '../Class/Pdf';
import { number_map } from '../data/numberToChar';

interface Props {
    words: string[];
    height: number;
    width: number;
}
const DownloadPdfButton = ({ width, height, words }: Props) => {
    const saved: number[][][] = [];
    const wordSaved: string[] = [];

    function calc() {}
    words.forEach((word) => {
        wordSaved.push(word);
        const newMatrix = new Matrix(width, height);
        newMatrix.mapInputToMatrix(word);
        saved.push(newMatrix.getMatrix());
    });
    function createDoc() {
        const pdf = new PDFGenerator();
        calc();
        for (let k = 0; k < saved[0].length; k++) {
            for (let j = 0; j < saved[0][0].length; j++) {
                const position: string = number_map[j] + (k + 1);
                if (j == 0 && k == 0) {
                    pdf.addTitel(position);
                } else {
                    pdf.addPageWithTitle(position);
                }
                for (let i = 0; i < words.length; i++) {
                    pdf.addContent(
                        `${wordSaved[i]}: ${saved[i][k][j] ? 'X' : 'O'}`
                    );
                }
            }
        }
        return pdf.generateAndDownload();
    }

    return (
        <button
            className="btn"
            onClick={() => {
                createDoc();
            }}
        >
            DownloadPdfButton
        </button>
    );
};

export default DownloadPdfButton;
