import React from "react";

const Loader = () => {
	return (
		<div>
			<div className="flex items-center justify-center min-h-[70vh]">
				<div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-16 w-16"></div>
			</div>
		</div>
	);
};

export default Loader;
