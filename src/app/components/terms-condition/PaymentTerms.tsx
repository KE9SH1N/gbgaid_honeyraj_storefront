import React from "react";

const PaymentTerms = () => {
	return (
		<div className="ct-container">
			<h2 className="w-[70%] lg:w-full font-semibold text-[32px] lg:text-5xl leading-[38px] lg:leading-[58px]">
				Payment Terms
			</h2>

			<p className="text-[#A8A8A8] text-xl lg:text-2xl font-medium leading-6 lg:leading-7 mt-4">
				We offer two types of payment options:
			</p>
			<p className="mt-4 text-xl lg:text-2xl font-semibold leading-6 lg:leading-7">
				<span>Cash on Delivery (COD) : </span>
				<span className="text-[#A8A8A8]">
					Pay in cash when the order is delivered to you.
				</span>
			</p>
			<p className="mt-4 text-xl lg:text-2xl font-semibold leading-6 lg:leading-7">
				<span>Prepaid Orders : </span>
				<span className="text-[#A8A8A8]">
					Full payment is made during the order placement through available
					online payment methods. In the case of prepaid orders, payment must be
					completed successfully to confirm your order.
				</span>
			</p>
		</div>
	);
};

export default PaymentTerms;
