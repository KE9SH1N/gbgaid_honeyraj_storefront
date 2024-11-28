export const disableContextMenu = () => {
	document.addEventListener("contextmenu", function (e) {
		e.preventDefault();
		if (document.queryCommandSupported("copy")) {
			document.execCommand("copy", false, undefined);
		}
	});
};
