export const generatePagination = (
	pageNumber: number,
	totalPageNumber: number
): (number | string)[] => {
	let pages: (number | string)[] = [];

	// Add the first page
	pages.push(1);

	// Handle cases where the total number of pages is 5 or less
	if (totalPageNumber <= 5) {
		for (let i = 2; i <= totalPageNumber; i++) {
			pages.push(i);
		}
	}

	// Handle pages near the beginning
	else if (pageNumber <= 4) {
		for (let i = 2; i <= 5; i++) {
			pages.push(i);
		}
		pages.push("...");
		pages.push(totalPageNumber);
	}

	// Handle pages in the middle range
	else if (pageNumber >= 5 && pageNumber <= totalPageNumber - 4) {
		pages.push("...");
		pages.push(pageNumber - 1);
		pages.push(pageNumber);
		pages.push(pageNumber + 1);
		pages.push("...");
		pages.push(totalPageNumber);
	}

	// Handle pages near the end
	else {
		pages.push("...");
		for (let i = totalPageNumber - 4; i < totalPageNumber; i++) {
			pages.push(i);
		}
		pages.push(totalPageNumber);
	}

	return pages;
};
