"use client";
import React, { useState } from "react";
import SectionHead from "../../../util/SectionHead";
import OrderSummery from "../order-details/OrderSummery";
import OrderItems from "../order-details/OrderItems";
import OrderListMobile from "./OrderListMobile";
import { useTranslations } from "next-intl";

const OrderHistoryMobile = ({
	handleViewOrderDetails,
	ViewOrderDetails,
	order,
}: any) => {
	// For multi-language
	const t = useTranslations("userDashboard");
	return (
		<div>
			{!ViewOrderDetails ? (
				<div>
					<SectionHead headingText={t("orderHistory.title")} />
					<OrderListMobile />
				</div>
			) : (
				<div>
					<OrderItems />
					<OrderSummery />
				</div>
			)}
		</div>
	);
};

export default OrderHistoryMobile;
