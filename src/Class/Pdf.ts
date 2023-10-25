import { jsPDF } from 'jspdf';

class PDFGenerator {
	pdf: jsPDF;
	constructor() {
		this.pdf = new jsPDF();
	}

	addPageWithTitle(title: string) {
		this.pdf.addPage();
		this.pdf.setFontSize(16);
		this.pdf.text(title, 10, 10);
	}

	addContent(content: string) {
		this.pdf.text(content, 10, 20);
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
