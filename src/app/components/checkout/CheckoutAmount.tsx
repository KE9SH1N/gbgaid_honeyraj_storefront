"use client";
import { useTranslations } from "next-intl";
import { fetchDeliveryChargeData } from "../../api/locationApiService";
import {
	deliveryChargePrice,
	selectDeliveryCharge,
	setShippingThanaPrice,
} from "../../redux/features/checkout/deliveryChargeSlice";
import { selectSubtotal } from "../../redux/features/checkout/shoppingcartSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	selectBillerThana,
	selectGift,
	selectShippingThana,
} from "../../redux/features/form/formSlice";
import { paymentMethodSelector } from "../../redux/features/checkout/paymentMethodSlice";
import { languageSelector } from "../../redux/features/intl/languageSlice";
import { activeResident } from "../../redux/features/checkout/residentSlice";

const CheckoutAmount = () => {
	const dispatch = useDispatch();

	//Data Selector From RTk
	const subtotal = useSelector(selectSubtotal);
	const deliveryChargeValue = useSelector(selectDeliveryCharge);
	const billerThana = useSelector(selectBillerThana);
	const shippingThana = useSelector(selectShippingThana);
	const deliveryCharge = useSelector(deliveryChargePrice);
	const selectedPaymentMethod = useSelector(paymentMethodSelector);
	const selectedLanguage = useSelector(languageSelector);
	const isGift = useSelector(selectGift);
	const activeTab = useSelector(activeResident);

	// For multi-language
	const t = useTranslations("checkout");

	useEffect(() => {
		let shippingThanaPrice = 0;
		if (activeTab === "inBangladesh" && !isGift) {
			const findDeliveryCharge = () => {
				if (deliveryChargeValue && billerThana) {
					const charge = deliveryChargeValue.find(
						(item) => item.thana_id === billerThana.id
					);

					return charge ? charge.prices : 0;
				}
				return 0;
			};
			const shippingThanaPrice = findDeliveryCharge();
			dispatch(setShippingThanaPrice(shippingThanaPrice));
		} else if (activeTab === "inBangladesh" && isGift) {
			const findDeliveryCharge = () => {
				if (deliveryChargeValue && shippingThana) {
					const charge = deliveryChargeValue.find(
						(item) => item.thana_id === shippingThana.id
					);
					return charge ? charge.prices : 0;
				}
				return 0;
			};
			const shippingThanaPrice = findDeliveryCharge();
			dispatch(setShippingThanaPrice(shippingThanaPrice));
		} else if (activeTab === "nonResident") {
			const findDeliveryCharge = () => {
				if (deliveryChargeValue && shippingThana) {
					const charge = deliveryChargeValue.find(
						(item) => item.thana_id === shippingThana.id
					);
					return charge ? charge.prices : 0;
				}
				return 0;
			};
			const shippingThanaPrice = findDeliveryCharge();
			dispatch(setShippingThanaPrice(shippingThanaPrice));
		}
	}, [
		deliveryChargeValue,
		billerThana,
		shippingThana,
		isGift,
		activeTab,
		dispatch,
	]);
	const totalAmount = subtotal + deliveryCharge;

	// For Data Fetch
	useEffect(() => {
		dispatch(fetchDeliveryChargeData() as any);
	}, [dispatch]);

	return (
		<div className="ct-flex-between lg:flex-row flex-col items-start space-y-5 lg:space-y-0 lg:space-x-5">
			<div className="p-6 flex w-full lg:w-[40%] flex-col gap-y-2  bg-componentBg">
				<ul className="pb-6">
					<li className="ct-flex-between">
						<strong className="text-[#A0A0A0]">{t("delivery")}</strong>
						<p>
							<span className="text-sm font-semibold">
								({selectedPaymentMethod})
							</span>
						</p>
					</li>
				</ul>
				<p className="bg-gbPrimaryColor w-fit px-2 text-xs">
					{selectedPaymentMethod === "Cash On Delivery"
						? "ক্যাশ অন ডেলিভারি (COD)- পণ্য হাতে পাবার পরে মূল্য"
						: ""}
					{selectedPaymentMethod === "bKash"
						? "বিকাশ পেমেন্ট অপশন ব্যবহার করে মূল্য পরিশোধ করুন "
						: ""}

					{selectedPaymentMethod === "SSL Commerz"
						? "এক ক্লিকেই পেমেন্ট করুন"
						: ""}
				</p>
				<p className="bg-gbPrimaryColor w-fit px-2 text-xs">
					{selectedPaymentMethod === "Cash On Delivery" ? "পরিশোধ করুন" : ""}
				</p>
			</div>
			<div className="p-6 flex w-full lg:w-[60%] flex-col gap-y-2 bg-componentBg">
				<ul className=" capitalize flex flex-col gap-y-2 pb-2 border-b border-borderLine">
					<li className="ct-flex-between">
						<strong className="text-[#A0A0A0]">{t("ammount.subtotal")}</strong>
						<p>
							৳&nbsp;<span>{subtotal.toFixed(2)}</span>
						</p>
					</li>
					<li className="ct-flex-between">
						<strong className="text-[#A0A0A0]">
							{t("ammount.delivery-charge")}
						</strong>
						{deliveryCharge === 0 ? (
							<p className="w-[60%] text-end">
								{selectedLanguage === "en" ? (
									<span className=" text-xs font-medium capitalize bg-gbPrimaryColor p-1">
										( select division, district & thana )
									</span>
								) : (
									<span className=" text-xs font-medium capitalize bg-gbPrimaryColor p-1">
										( বিভাগ,জেলা এবং থানা সিলেক্ট করুন )
									</span>
								)}
							</p>
						) : (
							<p>
								৳&nbsp;<span>{deliveryCharge.toFixed(2)}</span>
							</p>
						)}
					</li>
				</ul>

				<div className="capitalize ct-flex-between">
					<strong className="text-gbActiveColor">{t("ammount.total")}</strong>
					<p>
						৳&nbsp;<strong>{totalAmount.toFixed(2)}</strong>
					</p>
				</div>
			</div>
		</div>
	);
};

export default CheckoutAmount;
