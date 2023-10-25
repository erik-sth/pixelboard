function createEmptyMatrix(width: number, height: number): boolean[][] {
	return Array.from({ length: height }, () => Array(width).fill(false));
}
export { createEmptyMatrix };
