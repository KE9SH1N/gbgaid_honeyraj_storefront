import { useEffect } from "react";

//Feature: Custom Dropdown Handle Hook
// Dropdown menu open
// Dropdown menu close
// Dropdown menu close when user click outside of the component
// Dropdown menu close when user pressing pressing esc button

const UseOutsideClickAndEscape = (
	ref: React.RefObject<HTMLElement>,
	setOpen: (open: boolean) => void
) => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setOpen(false);
			}
		};

		const handleEscapeKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("keydown", handleEscapeKey);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleEscapeKey);
		};
	}, [ref, setOpen]);
};

export default UseOutsideClickAndEscape;
