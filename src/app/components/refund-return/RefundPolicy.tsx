import React from "react";

const RefundPolicy = () => {
	return (
		<div className="ct-container">
			<h2 className="font-semibold text-5xl leading-[58px]">Refund Policy</h2>
			<p className="text-[#A8A8A8] text-2xl font-medium leading-7 mt-8">
				Once the returned product is received and inspected, we will notify you
				of the approval or rejection of your refund
			</p>

			<p className=" text-2xl font-medium leading-6 mt-8">
				<span className="text-[#000000] font-semibold">
					Approved Refunds:&nbsp;
				</span>
				<span className="text-[#A8A8A8]">
					Refunds will be processed within 7-10 working days. The refund will be
					issued to the original method of payment (bank transfer, mobile
					wallet, or credit/debit card). If you opted for Cash on Delivery
					(COD), the refund will be transferred to your bank account or mobile
					wallet
				</span>
			</p>

			<p className=" text-2xl font-medium leading-6 mt-8">
				<span className="text-[#000000] font-semibold">
					Partial Refunds: &nbsp;
				</span>
				<span className="text-[#A8A8A8]">
					In certain cases, only partial refunds may be granted (e.g., when the
					product is used or returned in an incomplete state).
				</span>
			</p>

			<p className=" text-2xl font-medium leading-6 mt-8">
				<span className="text-[#000000] font-semibold">Note:&nbsp;</span>
				<span className="text-[#A8A8A8]">
					Delivery charges will only be refunded if the product is damaged,
					defective, or incorrect due to our or our delivery partner&apos;s
					fault. Otherwise, delivery fees will be deducted from the refund
				</span>
			</p>
		</div>
	);
};

export default RefundPolicy;
