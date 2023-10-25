function createEmptyMatrix(width: number, height: number): number[][] {
	return Array.from({ length: height }, () => Array(width).fill(false));
}
export { createEmptyMatrix };
