import React from "react";

const ConditionsForReturns = () => {
	return (
		<div className="ct-container">
			<h2 className="font-semibold text-5xl leading-[58px]">
				Conditions for Returns
			</h2>
			<p className="text-[#A8A8A8] text-2xl font-medium leading-7 mt-8">
				You can request a return or refund under the following conditions
			</p>

			<p className=" text-2xl font-medium leading-6 mt-8">
				<span className="text-[#000000] font-semibold">
					Damaged or Defective Products:&nbsp;
				</span>
				<span className="text-[#A8A8A8]">
					If you receive a product that is damaged or defective due to delivery,
					you may be eligible for a return or replacement.
				</span>
			</p>

			<p className=" text-2xl font-medium leading-6 mt-8">
				<span className="text-[#000000] font-semibold">
					Incorrect Product Received:&nbsp;
				</span>
				<span className="text-[#A8A8A8]">
					If you receive a product that does not match your order (wrong item,
					quantity, or variant), you are eligible for a return.
				</span>
			</p>

			<p className=" text-2xl font-medium leading-6 mt-8">
				<span className="text-[#000000] font-semibold">
					Expired Product:&nbsp;
				</span>
				<span className="text-[#A8A8A8]">
					If a product is delivered to you beyond its expiry date, it is
					eligible for return.
				</span>
			</p>
		</div>
	);
};

export default ConditionsForReturns;
