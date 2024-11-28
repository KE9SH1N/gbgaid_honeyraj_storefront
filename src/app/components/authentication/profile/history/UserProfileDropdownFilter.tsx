"use client";
import React from "react";
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import FilterDropdown from "./FilterDropdown";
import { setActiveUserTabMobile } from "@/app/redux/features/auth/userDashboardSlice";

const UserProfileDropdownFilter = () => {
	const dispatch = useDispatch();
	const activeUserDashboardTabMobile = useSelector(
		(state: any) => state.userdashboardtab.activeUserDashboardTabMobile
	);

	const handleBack = () => {
		dispatch(setActiveUserTabMobile(""));
	};

	return (
		<div className="ct-flex-between w-full sm:px-3">
			<div className="" onClick={handleBack}>
				<p className=" capitalize text-xs px-3 py-1 rounded text-gbPrimaryColor border border-gray-400 cursor-pointer">
					back
				</p>
			</div>
			<div></div>
			{/* {activeUserDashboardTabMobile === "history" ? <FilterDropdown /> : ""} */}
		</div>
	);
};

export default UserProfileDropdownFilter;
