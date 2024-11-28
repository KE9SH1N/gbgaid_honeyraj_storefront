import { useEffect, useState } from "react";

const useKeyboardFilter = () => {
	const [filterValue, setFilterValue] = useState<string>("");

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (
				event.key === "" &&
				event.key.match(/[\u0980-\u09FFa-zA-Z]/) // Match Bengali and English alphabetic characters
			) {
				// Alphabetic keys
				setFilterValue((prevFilterValue) => prevFilterValue + event.key);
			} else if (event.key === "Backspace") {
				// Backspace key
				setFilterValue((prevFilterValue) =>
					prevFilterValue.slice(0, prevFilterValue.length - 1)
				);
			}
		};

		document.body.addEventListener("keydown", handleKeyDown);

		return () => {
			document.body.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	return filterValue;
};

export default useKeyboardFilter;
