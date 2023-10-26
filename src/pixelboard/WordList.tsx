interface Props {
    allWords: string[];
    onClick: (currentString: string) => void;
}
const WordList = ({ allWords, onClick }: Props) => {
    return (
        <ul>
            {allWords.map((word, index) => (
                <li key={index}>
                    <button
                        className="btn"
                        style={{ width: '100%' }}
                        onClick={() => onClick(word)}
                    >
                        {word}
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default WordList;
