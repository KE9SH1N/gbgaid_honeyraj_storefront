import React from "react";
import { IoLocationSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { languageSelector } from "../../redux/features/intl/languageSlice";
import { useTranslations } from "next-intl";

const DeliveryOption = () => {
	const selectedLanguage = useSelector(languageSelector);
	// For multi-language
	const t = useTranslations("deliveryOption");
	return (
		<div className="w-full ct-flex-between flex-col lg:flex-row gap-y-3 lg:gap-y-0 items-start my-4">
			<div className="w-full">
				<div className="relative">
					<h3 className="font-bold capitalize">{t("deliveryInfo.title")}</h3>
					<div className="absolute inset-x-0 -bottom-1 h-[1px] bg-gradient-to-r from-gray-600 to-transparent"></div>
				</div>
				<div className="w-full text-sm font-light capitalize my-2">
					<p className="text-sm font-medium capitalize">
						{t("deliveryInfo.expectedDelivery.title")}:
						<span className="font-normal">
							&nbsp;{t("deliveryInfo.expectedDelivery.description")}
						</span>
					</p>
					<p className="text-sm font-medium capitalize">
						{t("deliveryInfo.paymentMethod.title")}:
						<span className=" capitalize text-sm">
							&nbsp;{t("deliveryInfo.paymentMethod.description")}
						</span>
					</p>
				</div>
			</div>
			<div className="w-full">
				<div className="relative">
					<h3 className=" font-bold capitalize">{t("deliveryArea.title")}</h3>
					<div className="absolute inset-x-0 -bottom-1 h-[1px] bg-gradient-to-r from-gray-600 to-transparent"></div>
				</div>
				<p className="flex gap-x-2 items-center text-sm font-medium capitalize my-2">
					<IoLocationSharp className="text-base text-blue-600" />
					<p>
						<span>{t("deliveryArea.availableArea.title")}:</span>
						<span className="font-normal">
							&nbsp;{t("deliveryArea.availableArea.description")}
						</span>
					</p>
				</p>
			</div>
		</div>
	);
};

export default DeliveryOption;
