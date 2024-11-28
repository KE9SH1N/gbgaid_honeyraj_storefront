import React from "react";

const ProductDescriptionLoader = () => {
	return (
		<div className="my-8">
			<div className="py-6">
				<div className="h-6 bg-gray-300 rounded w-1/4 animate-pulse"></div>
			</div>
			<div className="space-y-4 animate-pulse">
				<div className="h-4 bg-gray-300 rounded w-full"></div>
				<div className="h-4 bg-gray-300 rounded w-full"></div>
				<div className="h-4 bg-gray-300 rounded w-full"></div>
				<div className="h-4 bg-gray-300 rounded w-5/6"></div>
			</div>
		</div>
	);
};

export default ProductDescriptionLoader;
