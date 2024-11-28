import React from "react";

const OrderPlacement = () => {
	return (
		<div className="ct-container">
			<h2 className="w-[70%] lg:w-full font-semibold text-[32px] lg:text-5xl leading-[38px] lg:leading-[58px]">
				Order Placement
			</h2>
			<p className="text-[#A8A8A8] text-xl lg:text-2xl font-medium leading-6 lg:leading-7 mt-8">
				Orders can be placed through our website by creating an account or as a
				guest.
			</p>
			<p className="text-[#A8A8A8] text-xl lg:text-2xl font-medium leading-6 lg:leading-7 mt-4">
				You will receive an email/SMS confirmation once the order is
				successfully placed.
			</p>
			<p className="text-[#A8A8A8] text-xl lg:text-2xl font-medium leading-6 lg:leading-7 mt-4">
				We reserve the right to accept, cancel, or refuse any order in case of
				incorrect pricing, stock issues, or other unforeseen circumstances.
			</p>
		</div>
	);
};

export default OrderPlacement;
