import { useEffect } from "react";

const useEnterKey = (callback: any, inputId: any) => {
	useEffect(() => {
		const handleKeyPress = (event: any) => {
			if (event.key === "Enter") {
				callback();
			}
		};

		const inputField = document.getElementById(inputId);
		if (inputField) {
			inputField.addEventListener("keypress", handleKeyPress);
		}

		return () => {
			if (inputField) {
				inputField.removeEventListener("keypress", handleKeyPress);
			}
		};
	}, [callback, inputId]);
};

export default useEnterKey;
