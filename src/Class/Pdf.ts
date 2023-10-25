import { jsPDF } from 'jspdf';

class PDFGenerator {
	pdf: jsPDF;
	currentCount: number;
	pageCount: number;
	constructor() {
		this.pdf = new jsPDF();
		this.currentCount = 10;
		this.pageCount = 0;
	}

	addPageWithTitle(title: string) {
		this.currentCount = 10;

		this.pdf.addPage();
		this.pageCount++;

		this.pdf.setFontSize(16);
		this.pdf.text(title, 10, 10);
		this.pageCount++;
	}

	addContent(content: string) {
		this.currentCount += 10;
		this.pdf.text(content, 10, this.currentCount);
	}

	generateAndDownload(filename = 'Musical') {
		const blob = this.pdf.output('blob');
		const link = document.createElement('a');
		link.href = URL.createObjectURL(blob);
		link.download = `${filename}.pdf`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
}

export default PDFGenerator;
