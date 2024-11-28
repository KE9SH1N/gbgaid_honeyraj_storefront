import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
	paymentMethodSelector,
	setSelectedPaymentMethod,
} from "../../redux/features/checkout/paymentMethodSlice";
import { useTranslations } from "next-intl";
import { languageSelector } from "../../redux/features/intl/languageSlice";

const CheckoutPaymentMethod = () => {
	const dispatch = useDispatch();

	const selectedPaymentMethod = useSelector(paymentMethodSelector);

	const handleDeliveryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setSelectedPaymentMethod(event.target.value));
	};

	// For multi-language
	const t = useTranslations("checkout");

	return (
		<div className="relative w-full flex flex-col gap-y-2 ">
			<div className="text-center md:text-start">
				<h3 className=" text-2xl font-semibold uppercase pb-4">
					{t("paymentMethod.title")}
				</h3>
			</div>
			<div className="relative w-full ct-flex-start flex-col lg:flex-row gap-y-4 lg:gap-x-4">
				<label className="inline-flex items-center w-full border border-borderLine rounded py-3 pl-7 cursor-pointer">
					<input
						type="radio"
						className="form-radio h-4 w-4 cursor-pointer"
						name="radio-option"
						value={"Cash On Delivery"}
						checked={selectedPaymentMethod === "Cash On Delivery"}
						onChange={handleDeliveryChange}
					/>
					<span className="ml-2 capitalize">
						{t("paymentMethod.options.cod")}
					</span>
				</label>

				<label className="inline-flex items-center w-full border border-borderLine rounded pl-7 cursor-not-allowed blur-[2px]">
					<input
						type="radio"
						className="form-radio h-4 w-4 text-indigo-600 cursor-not-allowed"
						name="radio-option"
						value="bKash"
						onChange={handleDeliveryChange}
						disabled
					/>
					<p className="w-full ml-2 ct-flex-between pr-4">
						<span className="ml-2">{t("paymentMethod.options.bkash")}</span>
						<span>
							<Image
								src="/image/bKash-logo.svg"
								alt=""
								width={72}
								height={48}
							/>
						</span>
					</p>
				</label>

				<label className="inline-flex items-center w-full border border-borderLine rounded py-3 pl-7 cursor-not-allowed blur-[2px]">
					<input
						type="radio"
						className="form-radio h-4 w-4 text-indigo-600 cursor-not-allowed"
						name="radio-option"
						value="SSL Commerz"
						onChange={handleDeliveryChange}
						disabled
					/>
					<p className="w-full ml-2 ct-flex-between pr-4">
						<span>{t("paymentMethod.options.ssl")}</span>
						<span>
							<Image
								src="/image/sslcommerz-logo.svg"
								alt=""
								width={72}
								height={16}
							/>
						</span>
					</p>
				</label>
			</div>
		</div>
	);
};

export default CheckoutPaymentMethod;
