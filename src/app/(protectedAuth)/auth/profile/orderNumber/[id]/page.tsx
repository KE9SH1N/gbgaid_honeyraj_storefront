"use client";
import { fetchOrderDetailsById } from "@/app/api/orderDetailsApiService";
import Loader from "@/app/components/authentication/common/Loader";
import OrderItems from "@/app/components/authentication/profile/order-details/OrderItems";
import OrderSummery from "@/app/components/authentication/profile/order-details/OrderSummery";
import GlobalLayout from "@/app/global-layout/GlobalLayout";
import {
	getOrderFailure,
	getOrderStart,
	getOrderSuccess,
	selectOrderDetailsLoading,
	setOrderData,
} from "@/app/redux/features/auth/orderDetailsSlice";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FooterMain from "@/app/components/footer/FooterMain";

const OrderDetails = () => {
	const dispatch = useDispatch();
	const errorMessage = "Error";
	const params = useParams();
	const orderNumber = params?.id;

	// Access loading and order data from the Redux store
	const isLoading = useSelector(selectOrderDetailsLoading);

	useEffect(() => {
		const fetchOrderDetails = async () => {
			dispatch(getOrderStart());
			try {
				const orderDetailsData = await fetchOrderDetailsById(orderNumber);
				dispatch(getOrderSuccess(orderDetailsData));
				dispatch(setOrderData(orderDetailsData));
			} catch (error) {
				dispatch(getOrderFailure(errorMessage));
			}
		};
		fetchOrderDetails();

		return () => {};
	}, [dispatch, orderNumber]);

	if (isLoading) {
		return (
			<div>
				<Loader />
			</div>
		);
	}

	return (
		<div>
			<GlobalLayout>
				<div className="ct-container">
					<OrderItems />
					<OrderSummery />
				</div>
				<FooterMain />
			</GlobalLayout>
		</div>
	);
};

export default OrderDetails;
