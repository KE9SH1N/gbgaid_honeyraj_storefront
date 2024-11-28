import React from "react";

const Pricing = () => {
	return (
		<div className="ct-container">
			<h2 className="w-[70%] lg:w-full font-semibold text-[32px] lg:text-5xl leading-[38px] lg:leading-[58px]">
				Pricing
			</h2>
			<p className="text-[#A8A8A8] text-xl lg:text-2xl font-medium leading-6 lg:leading-7 mt-8">
				Prices displayed on the website are in Bangladeshi Taka (BDT) and
				include all applicable taxes.
			</p>
			<p className="text-[#A8A8A8] text-xl lg:text-2xl font-medium leading-6 lg:leading-7 mt-4">
				Prices are subject to change without prior notice, but changes will not
				affect confirmed orders.
			</p>
			<p className="text-[#A8A8A8] text-xl lg:text-2xl font-medium leading-6 lg:leading-7 mt-4">
				Any discounts, promotions, or offers will be clearly displayed and
				subject to specific terms and conditions.
			</p>
		</div>
	);
};

export default Pricing;
