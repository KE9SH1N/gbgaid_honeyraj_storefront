import React from "react";

const FilteredProductCardLoader = () => {
	return (
		<div className="grid grid-cols-2 md:ct-grid-cols-3 lg:ct-grid-cols-3 xl:ct-grid-cols-4 gap-6 md:gap-4 my-6">
			{Array(10)
				.fill(null)
				.map((_, index) => (
					<div
						key={index}
						className="animate-pulse h-auto p-2 border border-gray-200 rounded shadow"
					>
						<div className="bg-gray-300 h-40 w-full rounded-md"></div>
						<div className="mt-4 space-y-2">
							<div className="bg-gray-300 h-4 w-3/4 rounded-md"></div>
							<div className="bg-gray-300 h-4 w-1/2 rounded-md"></div>
						</div>
						<div className="flex justify-between items-center py-2">
							<div className="bg-gray-300 h-4 w-1/4 rounded-md"></div>
							<div className="bg-gray-300 h-4 w-1/4 rounded-md"></div>
						</div>
						<div className="space-y-2">
							<div className="bg-gray-300 h-8 w-full rounded-md"></div>
						</div>
					</div>
				))}
		</div>
	);
};

export default FilteredProductCardLoader;
