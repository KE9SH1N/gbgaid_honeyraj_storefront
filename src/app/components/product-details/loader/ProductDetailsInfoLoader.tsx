import React from "react";

const ProductDetailsInfoLoader = () => {
	return (
		<div className="w-full md:my-0 my-2 animate-pulse">
			<div>
				<div className="font-semibold text-sm md:text-xl mb-4 h-10 md:h-14 lg:h-8 bg-gray-300 rounded"></div>
			</div>
			<div className="mt-0 md:mt-2">
				<div className="ct-flex-start lg:items-center md:flex-row flex-col-reverse gap-x-2">
					<div className="ct-flex-start flex-col items-center gap-4">
						<div className="py-2 font-semibold text-xl bg-gray-300 w-24 h-6 rounded"></div>
						<div className="py-2 font-semibold text-xl bg-gray-300 w-24 h-6 rounded"></div>
						<div className="py-2 font-semibold text-xl bg-gray-300 w-24 h-6 rounded"></div>
					</div>
					<div className="ct-flex-start flex-col items-center gap-4">
						<div className="py-2 font-semibold text-xl bg-gray-300 w-24 h-6 rounded"></div>
						<div className="py-2 font-semibold text-xl bg-gray-300 w-24 h-6 rounded"></div>
						<div className="py-2 px-3 bg-gray-300 w-16 h-6 rounded"></div>
					</div>
					<div className="flex flex-col items-end gap-4">
						<div className="py-2 px-3 bg-gray-300 w-16 h-6 rounded-full"></div>
						<div className="py-2 px-3 bg-gray-300 w-16 h-6 rounded-full"></div>
						<div className="py-2 px-3 bg-white w-16 h-6 rounded"></div>
					</div>
				</div>
			</div>

			<div className="hidden md:flex w-full my-4 ct-flex-center gap-x-4">
				<div className="w-full">
					<div className="ct-flex-center overflow-hidden flex-col gap-2">
						<div className="w-full cursor-pointer">
							<div className="bg-gray-300 py-6 text-sm w-full ct-flex-between px-1 md:px-2 rounded capitalize text-white"></div>
						</div>
					</div>
				</div>
				<div className="bg-gray-300 py-6 text-sm w-full text-center rounded capitalize text-white cursor-pointer"></div>
			</div>
		</div>
	);
};

export default ProductDetailsInfoLoader;
