import { CharCoordinates } from '../types/Coordinates';

const saveCharCoordinatesToLocal = (char: string, coordinates: number[][]) => {
    const existingData = localStorage.getItem('charCoordinates');

    const charCoordinates = existingData ? JSON.parse(existingData) : {};

    charCoordinates[char] = coordinates;

    localStorage.setItem('charCoordinates', JSON.stringify(charCoordinates));
};

const getCharCoordinatesFromLocal = (): CharCoordinates => {
    const charCoordinates = localStorage.getItem('charCoordinates');
    return charCoordinates ? JSON.parse(charCoordinates) : {};
};

const setAllCharToLocalStorage = (charToCoordinates: CharCoordinates) => {
    Object.keys(charToCoordinates).forEach((key) => {
        saveCharCoordinatesToLocal(key, charToCoordinates[key]);
    });
};
const removeCharsFromLocalStorage = () => {
    localStorage.removeItem('charCoordinates');
};

export {
    getCharCoordinatesFromLocal,
    saveCharCoordinatesToLocal,
    setAllCharToLocalStorage,
    removeCharsFromLocalStorage,
};
