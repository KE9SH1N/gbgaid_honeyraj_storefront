import React from "react";

const CustomerResponsibilities = () => {
	return (
		<div className="ct-container">
			<h2 className="w-[70%] lg:w-full font-semibold text-[32px] lg:text-5xl leading-[38px] lg:leading-[58px]">
				Customer Responsibilities
			</h2>
			<p className="text-[#A8A8A8] text-xl lg:text-2xl font-medium leading-6 lg:leading-7 mt-8">
				Customers must provide accurate and complete information when placing
				orders, including delivery addresses and contact details.
			</p>
			<p className="text-[#A8A8A8] text-xl lg:text-2xl font-medium leading-6 lg:leading-7 mt-4">
				Once the order is placed, the customer should be available at the
				delivery address to receive it. If the customer is not available after
				multiple attempts, the order may be canceled or rescheduled.
			</p>
			<p className="text-[#A8A8A8] text-xl lg:text-2xl font-medium leading-6 lg:leading-7 mt-4">
				Customers are responsible for inspecting their products upon delivery to
				ensure they are in good condition.
			</p>
		</div>
	);
};

export default CustomerResponsibilities;
