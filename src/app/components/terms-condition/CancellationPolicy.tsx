import React from "react";

const CancellationPolicy = () => {
	return (
		<div className="ct-container">
			<h2 className="w-full font-semibold text-[32px] lg:text-5xl leading-[38px] lg:leading-[58px]">
				Cancellation Policy
			</h2>
			<p className="text-[#A8A8A8] text-xl lg:text-2xl font-medium leading-6 lg:leading-7 mt-8">
				Orders can be canceled if the cancellation request is made before the
				product is shipped. Once an order is dispatched, it cannot be canceled.
			</p>
			<p className="text-[#A8A8A8] text-xl lg:text-2xl font-medium leading-6 lg:leading-7 mt-4">
				In case of cancellations, any prepaid amount will be refunded within
				7-10 business days.
			</p>
		</div>
	);
};

export default CancellationPolicy;
