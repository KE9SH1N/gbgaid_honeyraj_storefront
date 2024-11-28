import React from "react";

const CategoryListLoader = () => {
	return (
		<div className="ct-container my-4 xl:my-12">
			<div className="ct-grid-cols-5 xl:ct-grid-cols-10">
				{Array.from({ length: 10 }, (_, index) => (
					<div
						key={index}
						className="border border-transparent smooth-animation-mid rounded animate-pulse"
					>
						<div className="my-2 justify-center flex">
							<div className="bg-gray-300 rounded w-12 h-12"></div>
						</div>
						<div className="overflow-hidden">
							<div className="h-5 bg-gray-300 rounded w-4/5 mx-auto"></div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default CategoryListLoader;
