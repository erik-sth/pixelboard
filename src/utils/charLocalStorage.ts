const saveCharCoordinatesToLocal = (char: string, coordinates: []) => {
  const existingData = localStorage.getItem("charCoordinates");

  const charCoordinates = existingData ? JSON.parse(existingData) : {};

  charCoordinates[char] = coordinates;

  localStorage.setItem("charCoordinates", JSON.stringify(charCoordinates));

};

const getCharCoordinatesFromLocal = (): object => {
  const charCoordinates = localStorage.getItem("charCoordinates");

  return charCoordinates ? JSON.parse(charCoordinates) : {};
};

export { getCharCoordinatesFromLocal, saveCharCoordinatesToLocal };
