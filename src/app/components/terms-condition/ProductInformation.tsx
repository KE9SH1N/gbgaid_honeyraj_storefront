import React from "react";

const ProductInformation = () => {
	return (
		<div className="ct-container">
			<h2 className="w-full font-semibold text-[32px] lg:text-5xl leading-[38px] lg:leading-[58px]">
				Product Information
			</h2>
			<p className="text-[#A8A8A8] text-xl lg:text-2xl font-medium leading-6 lg:leading-7 mt-8">
				We ensure that all products sold by Ghorer Bazar are safe, natural, and
				sourced from trusted suppliers.
			</p>
			<p className="text-[#A8A8A8] text-xl lg:text-2xl font-medium leading-6 lg:leading-7 mt-4">
				All products are subject to availability. We reserve the right to cancel
				or refuse orders for out-of-stock items.
			</p>
			<p className="text-[#A8A8A8] text-xl lg:text-2xl font-medium leading-6 lg:leading-7 mt-4">
				Product descriptions, including images and details, are for
				informational purposes only. Actual product appearances may vary due to
				packaging changes or natural product variations.
			</p>
		</div>
	);
};

export default ProductInformation;
