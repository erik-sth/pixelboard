import { getCharCoordinatesFromLocal } from '../utils/charLocalStorage';

const ExportCharSetButton = () => {
    const downloadCharSet = () => {
        const charCoordinates = getCharCoordinatesFromLocal();
        const charCoordinatesString = JSON.stringify(charCoordinates); // Adjust this based on the actual format of charCoordinates

        const blob = new Blob([charCoordinatesString], {
            type: 'application/json',
        });

        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'charSet.js';

        a.click();

        URL.revokeObjectURL(url);
    };

    return (
        <button className="btn" onClick={downloadCharSet}>
            ExportCharSetButton
        </button>
    );
};

export default ExportCharSetButton;
