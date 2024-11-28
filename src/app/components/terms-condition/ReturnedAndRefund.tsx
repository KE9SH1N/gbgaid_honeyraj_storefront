import React from "react";

const ReturnedAndRefund = () => {
	return (
		<div className="ct-container">
			<h2 className="w-[70%] lg:w-full font-semibold text-[32px] lg:text-5xl leading-[38px] lg:leading-[58px]">
				Damaged or Lost Shipments
			</h2>
			<p className="text-[#A8A8A8] text-xl lg:text-2xl font-medium leading-6 lg:leading-7 mt-8">
				Damaged Products: In case any product is damaged during delivery, please
				notify us immediately with a photo of the damaged product within 24
				hours of receiving the order. We will review the issue and offer either
				a replacement or a refund, depending on the severity of the damage.
			</p>
			<p className="text-[#A8A8A8] text-xl lg:text-2xl font-medium leading-6 lg:leading-7 mt-4">
				Lost Orders: If an order is not delivered or is lost in transit, we will
				either issue a full refund or resend the order at no extra charge.
			</p>
			<p className="text-[#A8A8A8] text-xl lg:text-2xl font-medium leading-6 lg:leading-7 mt-4">
				Ghorer Bazar is not liable for delays, damages, or losses caused by the
				delivery service providers. However, we will work with our delivery
				partners to ensure that the issue is resolved as quickly as possible.
			</p>
		</div>
	);
};

export default ReturnedAndRefund;
