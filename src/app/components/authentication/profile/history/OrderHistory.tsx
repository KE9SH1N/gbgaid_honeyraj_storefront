"use client";
import React, { useState } from "react";
import SectionHead from "../../../util/SectionHead";
import OrderListTable from "./OrderListTable";
import OrderSummery from "../order-details/OrderSummery";
import OrderItems from "../order-details/OrderItems";
import { useTranslations } from "next-intl";

const OrderHistory = () => {
	const [ViewOrderDetails, setViewOrderDetails] = useState<boolean>(false);
	const [selectedOrder, setSelectedOrder] = useState<any>(null);

	const handleViewOrderDetails = (order: any) => {
		setSelectedOrder(order);
		setViewOrderDetails(!ViewOrderDetails);
	};

	// For multi-language
	const t = useTranslations("userDashboard");
	return (
		<div className="lg:px-0 px-4">
			{!ViewOrderDetails ? (
				<div>
					<SectionHead headingText={t("orderHistory.title")} />
					<OrderListTable />
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

export default OrderHistory;
