import DownloadPdfButton from './DownloadPdfButton';
import ExportCharSetButton from './ExportCharSetButton';

interface Props {
    width: number;
    allWords: string[];
}

export const Nav = ({ width, allWords }: Props) => {
    const formatWordsAsCode = () => {
        const codeOutput = `[${allWords
            .map((word) => `'${word}'`)
            .join(', ')}]`;

        const blob = new Blob([codeOutput], { type: 'text/plain' });

        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'words.txt';

        a.click();

        URL.revokeObjectURL(url);
    };

    return (
        <div className="navbar">
            <ExportCharSetButton />
            <DownloadPdfButton width={width} height={5} words={allWords} />
            <button className="btn" onClick={formatWordsAsCode}>
                Download Words as Code
            </button>
        </div>
    );
};
