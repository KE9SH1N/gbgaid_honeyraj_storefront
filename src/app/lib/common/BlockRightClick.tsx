import { useEffect } from "react";

export const blockRightClick = (event: MouseEvent) => {
	event.preventDefault();
};

export const useBlockRightClick = (ref: React.RefObject<HTMLElement>) => {
	useEffect(() => {
		const node = ref.current;
		if (node) {
			node.addEventListener("contextmenu", blockRightClick);
			return () => {
				node.removeEventListener("contextmenu", blockRightClick);
			};
		}
	}, [ref]);
};
