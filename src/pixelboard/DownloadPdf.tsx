import Matrix from '../Class/Matrix';
import PDFGenerator from '../Class/Pdf';

interface Props {
	words: string[];
	height: number;
	width: number;
}
const DownloadPdfButton = ({ width, height, words }: Props) => {
	const saved: boolean[][][] = [];
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
				pdf.addPageWithTitle(`y: ${k} + x: ${j}`);
				for (let i = 0; i < words.length; i++) {
					pdf.addContent(`${wordSaved[i]}: ${saved[i][k][j]}`);
				}
			}
		}
		return pdf.generateAndDownload();
	}

	return (
		<button
			onClick={() => {
				createDoc();
			}}
		>
			DownloadPdfButton
		</button>
	);
};

export default DownloadPdfButton;
