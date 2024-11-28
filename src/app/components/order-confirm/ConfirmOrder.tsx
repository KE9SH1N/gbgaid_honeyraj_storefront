"use client";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { resetDeliveryCharge } from "../../redux/features/checkout/deliveryChargeSlice";
import { resetshoppingCartState } from "../../redux/features/checkout/shoppingcartSlice";
import { resetFormState } from "../../redux/features/form/formSlice";
import { resetPaymentMethodState } from "../../redux/features/checkout/paymentMethodSlice";
import { resetIsResidentState } from "../../redux/features/checkout/residentSlice";
import { resetFilterState } from "../../redux/features/product/filterSlice";
import { resetCountryCodeState } from "../../redux/features/form/countryCodeSlice";
import { useParams } from "next/navigation";
import OrderLoader from "./OrderLoader";
import Link from "next/link";
import { languageSelector } from "../../redux/features/intl/languageSlice";
import { PiMapPinLineFill } from "react-icons/pi";

const ConfirmOrder = () => {
	// For multi-language
	const t = useTranslations("confirmOrder");
	const dispatch = useDispatch();
	const orderNumber = useParams();

	const [loader, setLoader] = useState(true);

	const selectedLanguage = useSelector(languageSelector);

	useEffect(() => {
		const resetStates = async () => {
			dispatch(resetDeliveryCharge());
			dispatch(resetshoppingCartState());
			dispatch(resetFormState());
			dispatch(resetPaymentMethodState());
			dispatch(resetIsResidentState());
			dispatch(resetFilterState());
			dispatch(resetCountryCodeState());
			setLoader(false);
		};

		resetStates();
	}, [dispatch]);

	if (loader) {
		return (
			<div>
				<OrderLoader />
			</div>
		);
	}

	return (
		<div className="ct-container my-3">
			<div className="ct-flex-center flex-col">
				<div>
					<FaRegCheckCircle className="text-9xl text-gbActiveColor" />
				</div>
				<div className="w-full text-center space-y-6 my-4">
					<p className="w-full font-medium text-2xl lg:text-4xl capitalize">
						{t("success")}
					</p>
					<p className="font-bold lg:font-semibold text-2xl lg:text-3xl capitalize">
						{t("order-no.text")}
						<span className="text-gbPrimaryColor">
							&nbsp;&nbsp;{orderNumber.id}
						</span>
					</p>
				</div>
			</div>
			<div className="flex justify-center mt-6">
				<Link
					href={`/auth/profile/orderNumber/${orderNumber.id}`}
					className="ct-flex-center flex-row space-x-3 px-5 py-2 rounded text-center text-white bg-gbActiveColor capitalize"
				>
					<span>
						<PiMapPinLineFill className="text-xl font-bold" />
					</span>
					<span>Track Your Order</span>
				</Link>
			</div>
		</div>
	);
};

export default ConfirmOrder;
