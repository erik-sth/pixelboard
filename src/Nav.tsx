import React from 'react'
import DownloadPdfButton from './pixelboard/DownloadPdf'

interface Props{
    width: number;
    allWords: string[];
}

export const Nav = ({width, allWords}: Props) => {

    const formatWordsAsCode = () => {
        const codeOutput = `Words: [${allWords
          .map((word) => `'${word}'`)
          .join(", ")}]`;
    
        const blob = new Blob([codeOutput], { type: "text/plain" });
    
        const url = URL.createObjectURL(blob);
    
        const a = document.createElement("a");
        a.href = url;
        a.download = "words.txt";
    
        a.click();
    
        URL.revokeObjectURL(url);
      };

  return (
    <div>
        <DownloadPdfButton width={width} height={5} words={allWords} />
        <button onClick={formatWordsAsCode}>Download Words as Code</button>
    </div>
  )
}
