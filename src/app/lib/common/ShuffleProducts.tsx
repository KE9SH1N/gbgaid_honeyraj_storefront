export const shuffleProducts = (array: any[]) => {
	const shuffleProduct = array.slice(); // Create a shallow copy of the array
	// Fisher-Yates shuffle algorithm
	for (let i = shuffleProduct.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffleProduct[i], shuffleProduct[j]] = [
			shuffleProduct[j],
			shuffleProduct[i],
		];
	}
	return shuffleProduct;
};
