"use client";
import { useTranslations } from "next-intl";
import { selectGift, toggleGift } from "../../redux/features/form/formSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeResident } from "../../redux/features/checkout/residentSlice";

const CustomerInfoHeading = ({}) => {
	const isGift = useSelector(selectGift);
	const dispatch = useDispatch();
	const handleGiftCheck = () => {
		dispatch(toggleGift());
	};
	const activeTab = useSelector(activeResident);
	const t = useTranslations("checkout");

	return (
		<div>
			<div className=" capitalize ct-flex-between">
				<h3 className="font-semibold text-xl capitalize">
					{activeTab === "inBangladesh"
						? t("bangladeshi.billingAddress.title")
						: t("nonBangladeshi.billingAddress.title")}
				</h3>
				{activeTab === "inBangladesh" ? (
					<label className="inline-flex items-center cursor-pointer">
						<input
							id="link-checkbox"
							type="checkbox"
							checked={isGift}
							className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer"
							onChange={handleGiftCheck}
						/>

						<span className="ml-2 capitalize text-sm">
							{t("bangladeshi.checkMark.gift")}
						</span>
					</label>
				) : null}
			</div>
		</div>
	);
};

export default CustomerInfoHeading;
