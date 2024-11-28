import React from "react";

const Cancellations = () => {
	return (
		<div className="ct-container">
			<h2 className="font-semibold text-5xl leading-[58px]">Cancellations</h2>

			<p className=" text-2xl font-medium leading-6 mt-8">
				<span className="text-[#000000] font-semibold">
					Order Cancellation Before Dispatch:&nbsp;
				</span>
				<span className="text-[#A8A8A8]">
					You can cancel your order anytime before the product is dispatched by
					contacting customer service. In case of prepaid orders, a full refund
					will be issued within 7-10 working days.
				</span>
			</p>

			<p className=" text-2xl font-medium leading-6 mt-8">
				<span className="text-[#000000] font-semibold">
					Order Cancellation After Dispatch:&nbsp;
				</span>
				<span className="text-[#A8A8A8]">
					If the order has already been dispatched, it cannot be canceled. You
					can, however, follow the return process outlined above once you
					receive the product.
				</span>
			</p>

			<p className=" text-2xl font-medium leading-6 mt-8">
				<span className="text-[#000000] font-semibold">
					Refund Completion :&nbsp;
				</span>
				<span className="text-[#A8A8A8]">
					Upon receiving and inspecting the product, the refund will be
					processed within 7-10 working days.
				</span>
			</p>
		</div>
	);
};

export default Cancellations;
