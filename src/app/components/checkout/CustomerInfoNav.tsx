"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	activeResident,
	setActiveResident,
} from "../../redux/features/checkout/residentSlice";
import { useTranslations } from "next-intl";

const CustomerInfoNav = () => {
	const dispatch = useDispatch();
	const activeTab = useSelector(activeResident);

	const handleResidentClick = (tabName: string) => {
		dispatch(setActiveResident(tabName));
	};
	// For multi-language
	const t = useTranslations("checkout");

	return (
		<div>
			<div>
				<ul className="w-full capitalize ct-flex-start py-4 text-center font-semibold">
					<li
						onClick={() => handleResidentClick("inBangladesh")}
						className={`w-full py-4 border-b-2 ${
							activeTab === "inBangladesh"
								? "border-gbPrimaryColor bg-[#FEF3E9]"
								: ""
						} cursor-pointer smooth-animation-mid`}
					>
						{t("bangladeshi.title")}
					</li>
					<li
						onClick={() => handleResidentClick("nonResident")}
						className={`w-full py-4 border-b-2 ${
							activeTab === "nonResident"
								? "border-gbPrimaryColor bg-[#FEF3E9]"
								: ""
						} cursor-pointer smooth-animation-mid`}
					>
						{t("nonBangladeshi.title")}
					</li>
				</ul>
			</div>
		</div>
	);
};

export default CustomerInfoNav;
