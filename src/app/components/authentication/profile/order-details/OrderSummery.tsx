"use client";
import { selectOrderDetailsData } from "@/app/redux/features/auth/orderDetailsSlice";
import { useTranslations } from "next-intl";
import React from "react";
import { useSelector } from "react-redux";

const OrderSummery = ({ order }: any) => {
	const orderDetails = useSelector(selectOrderDetailsData);
	const orderDetailsData = orderDetails.data;

	const tt = useTranslations("singleOrderDetails");
	return (
		<div className="my-24 px-3">
			{orderDetailsData?.map((order: any) => (
				<div
					key={order?.id}
					className="w-full ct-flex-between space-y-5 flex-col lg:flex-row items-start my-4"
				>
					<div className=" ct-flex-start flex-col gap-y-2 w-full lg:w-[40%]">
						<h2 className=" capitalize text-md font-medium">
							{tt("orderSummary.shipping-address.title")}
						</h2>
						<div className="w-full ct-flex-start gap-x-10 text-sm text-[#646464] capitalize">
							<div className="ct-flex-start flex-col gap-y-3">
								<p>{tt("orderSummary.shipping-address.division")}:</p>
								<p>{tt("orderSummary.shipping-address.district")}:</p>
								<p>{tt("orderSummary.shipping-address.thana")}:</p>
								<p>{tt("orderSummary.shipping-address.local-address")}:</p>
							</div>
							<div className="ct-flex-start flex-col gap-y-3">
								<p>{order?.shippingAddressDivision}</p>
								<p>{order?.shippingAddressDistrict}</p>
								<p>{order?.shippingAddressThana}</p>
								<p>{order?.shippingAddressTextArea}</p>
							</div>
						</div>
					</div>

					<div className="w-full lg:w-[40%] ct-flex-between">
						<p className="text-[#646464] text-sm ct-flex-start flex-col gap-y-3">
							<span>{tt("orderSummary.shipping-address.subtotal")}</span>
							<span>{tt("orderSummary.shipping-address.payment-method")}</span>
							<span>{tt("orderSummary.shipping-address.delivery-charge")}</span>
							<span>
								{tt("orderSummary.shipping-address.advanced-payment-amount")}
							</span>
						</p>
						<p className="text-sm ct-flex-end flex-col font-semibold gap-y-3 items-end">
							<span>
								{order?.last_transaction?.totalPurchaseAmount}{" "}
								{tt("orderSummary.shipping-address.tk")}
							</span>
							<span>{order?.last_transaction?.paymentMethods}</span>
							<span>
								{order?.deliveryCharge} {tt("orderSummary.shipping-address.tk")}
							</span>
							{order?.last_transaction?.paidAmmount == null ? (
								<span>0 {tt("orderSummary.shipping-address.tk")}</span>
							) : (
								<span>
									{order?.last_transaction?.paidAmmount}
									{tt("orderSummary.shipping-address.tk")}
								</span>
							)}
						</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default OrderSummery;
