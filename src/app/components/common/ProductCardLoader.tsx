import React from "react";

const ProductCardLoader = () => {
	return (
		<div>
			<div>
				<div className="text-center md:text-start pt-6 animate-pulse">
					<div className="border-b border-borderLine">
						<div className="bg-gray-300 h-8 w-[20%] mx-auto md:mx-0 mb-4 rounded"></div>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-2 md:ct-grid-cols-3 lg:ct-grid-cols-4 xl:ct-grid-cols-5 gap-6 md:gap-4 my-6">
				{Array(30)
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
			<div className="w-full flex justify-center my-12 animate-pulse">
				<button className="bg-gray-300 py-2 w-[20%] rounded text-gray-300 cursor-not-allowed">
					<div className="w-full h-full flex justify-center items-center">
						<span className="text-sm"></span>
					</div>
				</button>
			</div>
		</div>
	);
};

export default ProductCardLoader;
