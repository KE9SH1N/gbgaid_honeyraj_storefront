export const disableCopy = () => {
	document.addEventListener("keydown", function (event) {
		if (event.ctrlKey && event.key === "c") {
			event.preventDefault();
		}
	});
};
