"use client";
import { useRouter } from "next/navigation";
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import {
	resetCountryCodeState,
	selectedCountryPhoneCodeEn,
} from "../../redux/features/form/countryCodeSlice";
import { resetDeliveryCharge } from "../../redux/features/checkout/deliveryChargeSlice";
// import { resetState } from "../../features/shoppingcartSlice";
import { resetFormState } from "../../redux/features/form/formSlice";
import { resetPaymentMethodState } from "../../redux/features/checkout/paymentMethodSlice";
import { resetIsResidentState } from "../../redux/features/checkout/residentSlice";
import { resetFilterState } from "../../redux/features/product/filterSlice";
import { languageSelector } from "../../redux/features/intl/languageSlice";

interface OrderFailedProps {
	successMesg: string;
	closePopUp: () => void;
}

const OrderSuccess: React.FC<OrderFailedProps> = ({
	successMesg,
	closePopUp,
}) => {
	const router = useRouter();
	const dispatch = useDispatch();
	const selectedLanguage = useSelector(languageSelector);

	const resetAll = () => {
		dispatch(resetDeliveryCharge());
		// dispatch(resetState());
		dispatch(resetFormState());
		dispatch(resetPaymentMethodState());
		dispatch(resetIsResidentState());
		dispatch(resetFilterState());
		dispatch(resetCountryCodeState());
	};
	return (
		<div>
			{/* <div>
				<p>{successMesg}</p>
			</div> */}
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
				<div className="bg-white p-8 rounded shadow-md">
					<p className="text-lg mb-4">{successMesg}</p>
					<button
						className="bg-[#03a64a] text-white font-bold py-2 px-4 rounded"
						onClick={() => {
							closePopUp();
							router.push(`/order-confirm`);
							resetAll();
						}}
					>
						OK
					</button>
				</div>
			</div>
		</div>
	);
};

export default OrderSuccess;
