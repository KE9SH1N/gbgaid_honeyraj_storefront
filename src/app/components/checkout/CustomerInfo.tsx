"use client";
import React from "react";
import CustomerInfoForm from "./CustomerInfoForm";
import RecieverInfoForm from "./RecieverInfoForm";
import { closeGift, selectGift } from "../../redux/features/form/formSlice";
import { useDispatch, useSelector } from "react-redux";
import { activeResident } from "../../redux/features/checkout/residentSlice";

const CustomerInfo = () => {
	const dispatch = useDispatch();
	const isGift = useSelector(selectGift);
	const activeTab = useSelector(activeResident);
	if (activeTab === "nonResident") {
		dispatch(closeGift());
	}
	return (
		<div>
			<div>
				<div
					className={`${
						isGift || activeTab === "nonResident"
							? "w-full ct-flex-between flex-col lg:flex-row items-start gap-x-10"
							: ""
					}  w-full`}
				>
					<CustomerInfoForm />
					<RecieverInfoForm />
				</div>
			</div>
		</div>
	);
};

export default CustomerInfo;
