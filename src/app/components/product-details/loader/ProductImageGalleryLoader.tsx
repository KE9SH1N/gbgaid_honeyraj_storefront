import React from "react";

const ProductImageGalleryLoader = () => {
	return (
		<div className="ct-flex-start w-full items-start gap-x-2">
			<div className="w-[80%] mx-auto cursor-pointer border border-borderLine animate-pulse">
				<div className="w-[324px] h-[324px] bg-gray-300"></div>
			</div>
			<div className="h-[305px]">
				<div className="ct-flex-center flex-col gap-y-2">
					{[...Array(3)].map((_, index) => (
						<div
							key={index}
							className="border border-borderLine rounded cursor-pointer animate-pulse"
						>
							<div className="w-[100px] h-[100px] bg-gray-300"></div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ProductImageGalleryLoader;
