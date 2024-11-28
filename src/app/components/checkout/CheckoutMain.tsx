"use client";
import React, { useEffect, useState } from "react";
import EmptyCheckout from "./EmptyCheckout";
import { useDispatch, useSelector } from "react-redux";
import {
	cartItemList,
	selectTotalQuantity,
} from "../../redux/features/checkout/shoppingcartSlice";
import CustomerInfoNav from "./CustomerInfoNav";
import CustomerInfo from "./CustomerInfo";
import CheckoutProductList from "./CheckoutProductList";
import CheckoutPaymentMethod from "./CheckoutPaymentMethod";
import CheckoutAmount from "./CheckoutAmount";
import CustomButton from "../util/CustomButton";
import { useTranslations } from "next-intl";
import axios from "axios";
import { selectedCountryPhoneCodeEn } from "../../redux/features/form/countryCodeSlice";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import { getBaseUrl } from "../../lib/helper/getBaseUrl";
import { languageSelector } from "../../redux/features/intl/languageSlice";
import { activeResident } from "../../redux/features/checkout/residentSlice";
import { cartItem } from "../../types/cartItemType";
import {
	clearBillerDistrict,
	clearBillerDivision,
	clearBillerThana,
	clearShippingDistrict,
	clearShippingDivision,
	clearShippingThana,
	resetBillerAdditionalPhoneNumber,
	resetBillerHomeAddress,
	resetBillerPhoneNumber,
	resetNonResidentWhatsAppNumber,
	resetShippingAdditionalPhoneNumber,
	resetShippingPhoneNumber,
	selectBillerAdditionalPhoneNumber,
	selectBillerDistrict,
	selectBillerDivision,
	selectBillerHomeAddress,
	selectBillerName,
	selectBillerPhoneNumber,
	selectBillerThana,
	selectBillingAddressCheck,
	selectGift,
	selectNonResidentRelationShip,
	selectNonResidentWhatsAppNumber,
	selectShippingAdditionalPhoneNumber,
	selectShippingDistrict,
	selectShippingDivision,
	selectShippingHomeAddress,
	selectShippingName,
	selectShippingPhoneNumber,
	selectShippingThana,
	setBillerAdditionalPhoneNumber,
	setBillerDistrict,
	setBillerDivision,
	setBillerHomeAddress,
	setBillerName,
	setBillerPhoneNumber,
	setBillerThana,
} from "../../redux/features/form/formSlice";
import { deliveryChargePrice } from "../../redux/features/checkout/deliveryChargeSlice";
import { paymentMethodSelector } from "../../redux/features/checkout/paymentMethodSlice";
import FailedAlertMessage from "../util/FailedAlertMessage";
import { getUserInfo } from "../../lib/common/AuthTokenDecoder";
import { selectUserDetailsData } from "../../redux/features/auth/userDetailsSlice";
import {
	isDistrictDisabled,
	isThanaDisabled,
	setDistrictDisabled,
	setThanaDisabled,
} from "../../redux/features/location/locationDisableSlice";

const CheckoutMain = () => {
	const dispatch = useDispatch();
	const totalQuantity = useSelector(selectTotalQuantity);
	const router = useRouter();

	const selectedLanguage = useSelector(languageSelector);

	// For multi-language
	const t = useTranslations("checkout");

	//Country code selector for non resident order
	const countryPhoneCodeEn = useSelector(selectedCountryPhoneCodeEn);

	//Biller or Buyer order information
	const billerName = useSelector(selectBillerName);
	const billerPhoneNumber = useSelector(selectBillerPhoneNumber);
	const billerAdditionalPhoneNumber = useSelector(
		selectBillerAdditionalPhoneNumber
	);
	const billerDivision = useSelector(selectBillerDivision);
	const billerDistrict = useSelector(selectBillerDistrict);
	const billerThana = useSelector(selectBillerThana);
	const billerHomeAddress = useSelector(selectBillerHomeAddress);

	//Shipping Order information
	const shippingName = useSelector(selectShippingName);
	const shippingPhoneNumber = useSelector(selectShippingPhoneNumber);
	const shippingAdditionalPhoneNumber = useSelector(
		selectShippingAdditionalPhoneNumber
	);
	const shippingDivision = useSelector(selectShippingDivision);
	const shippingDistrict = useSelector(selectShippingDistrict);
	const shippingThana = useSelector(selectShippingThana);
	const shippingHomeAddress = useSelector(selectShippingHomeAddress);
	const nonResidentWhatsAppNumber =
		useSelector(selectNonResidentWhatsAppNumber) ?? "";
	const nonResidentRelationShip = useSelector(selectNonResidentRelationShip);
	const isGift = useSelector(selectGift);
	const BillingAddressCheck = useSelector(selectBillingAddressCheck);
	const userData = useSelector(selectUserDetailsData);

	//Delivery Charge Selector
	const deliveryCharge = useSelector(deliveryChargePrice);

	//Payment Method Selector
	const selectedPaymentMethod = useSelector(paymentMethodSelector);

	const cartItems = useSelector(cartItemList);
	const activeTab = useSelector(activeResident);
	const [errorMessages, setErrorMessages] = useState<string[]>([]);
	const [Loader, setLoader] = useState(false);
	const [isButtonEnabled, setIsButtonEnabled] = useState(true);

	const districtDisabled = useSelector(isDistrictDisabled);
	const thanaDisabled = useSelector(isThanaDisabled);

	const decoded = getUserInfo() as any;

	const countrywisePhoneNumber = `(${countryPhoneCodeEn})${nonResidentWhatsAppNumber}`;

	let customerPhoneNumber: string | null;
	if (activeTab === "inBangladesh") {
		customerPhoneNumber = billerPhoneNumber;
	} else {
		customerPhoneNumber = nonResidentWhatsAppNumber;
	}

	const orderDetails = cartItems.map((cartItem: cartItem) => {
		const individualSubtotal =
			cartItem.discount_amount > 0
				? cartItem.current_prices
				: cartItem.regular_prices;
		return {
			productId: cartItem.id,
			productCode: cartItem.product_code,
			productNameEn: cartItem.product_title_en,
			singleProductPrices:
				cartItem.discount_amount > 0
					? cartItem.current_prices
					: cartItem.regular_prices,
			productQuantity: cartItem.quantity,
			subTotal: individualSubtotal * cartItem.quantity,
			orderFrom: "Website",
		};
	});

	useEffect(() => {
		if (activeTab === "inBangladesh" && !isGift) {
			dispatch(resetShippingPhoneNumber());
			dispatch(resetShippingAdditionalPhoneNumber());
			dispatch(resetNonResidentWhatsAppNumber());
			dispatch(
				clearShippingDivision({
					id: 0,
					nameBn: null,
					nameEn: null,
				})
			);
			dispatch(
				clearShippingDistrict({
					id: 0,
					nameBn: null,
					nameEn: null,
				})
			);
			dispatch(
				clearShippingThana({
					id: 0,
					nameBn: null,
					nameEn: null,
				})
			);
		} else if (activeTab === "nonResident") {
			dispatch(resetBillerPhoneNumber());
			dispatch(resetBillerAdditionalPhoneNumber());
			dispatch(resetBillerHomeAddress());
			dispatch(
				clearBillerDivision({
					id: 0,
					nameBn: null,
					nameEn: null,
				})
			);
			dispatch(
				clearBillerDistrict({
					id: 0,
					nameBn: null,
					nameEn: null,
				})
			);

			dispatch(
				clearBillerThana({
					id: null,
					nameBn: null,
					nameEn: null,
				})
			);
		}
		if (customerPhoneNumber?.length === 11 && !isGift) {
			setIsButtonEnabled(true);
		} else if (shippingPhoneNumber?.length === 11 && isGift) {
			setIsButtonEnabled(true);
		} else if (
			nonResidentWhatsAppNumber?.length >= 5 &&
			shippingPhoneNumber?.length === 11
		) {
			setIsButtonEnabled(true);
		} else {
			setIsButtonEnabled(false);
		}
	}, [
		customerPhoneNumber,
		isGift,
		shippingPhoneNumber,
		nonResidentWhatsAppNumber,
		activeTab,
		dispatch,
	]);

	const isCheckoutFieldValid = () => {
		setErrorMessages([]);
		const errors: string[] = [];

		if (activeTab === "inBangladesh" && !isGift) {
			if (!customerPhoneNumber) {
				errors.push(t("ErrorMessage.Error.customer-phoneNumber"));
			} else if (customerPhoneNumber.length !== 11) {
				errors.push(t("ErrorMessage.Error.customer-phoneNumber-digit"));
			}
		} else if (activeTab === "inBangladesh" && isGift) {
			if (!customerPhoneNumber) {
				errors.push(t("ErrorMessage.Error.customer-phoneNumber"));
			} else if (!shippingPhoneNumber) {
				errors.push(t("ErrorMessage.Error.shipping-phoneNumber"));
			} else if (shippingPhoneNumber.length !== 11) {
				errors.push(t("ErrorMessage.Error.shipping-phoneNumber-digit"));
			}
		} else if (!nonResidentWhatsAppNumber) {
			errors.push(t("ErrorMessage.Error.whapsApp-number-incorrect"));
		} else if (nonResidentWhatsAppNumber.length < 5) {
			errors.push(t("ErrorMessage.Error.whapsApp-number-digit"));
		} else if (!shippingPhoneNumber) {
			errors.push(t("ErrorMessage.Error.shipping-phoneNumber"));
		} else if (shippingPhoneNumber.length !== 11) {
			errors.push(t("ErrorMessage.Error.shipping-phoneNumber-digit"));
		}
		return errors;
	};

	const handleClosePopup = () => {
		setErrorMessages([]);
		setLoader(false);
	};

	useEffect(() => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			dispatch(setBillerName(userData?.name));
			dispatch(setBillerPhoneNumber(userData?.phoneNumber));
			dispatch(setBillerAdditionalPhoneNumber(userData?.AdditionalPhoneNumber));
			dispatch(
				setBillerDivision({
					id: userData?.id,
					nameBn: userData?.division,
					nameEn: userData?.division,
				})
			);
			// Disable district and thana by default
			dispatch(setDistrictDisabled(true));
			dispatch(setThanaDisabled(true));

			// Set biller district and thana only if they are valid
			if (userData?.district) {
				dispatch(
					setBillerDistrict({
						id: userData?.id,
						nameBn: userData?.district,
						nameEn: userData?.district,
					})
				);
				dispatch(setDistrictDisabled(false));
			}
			if (userData?.thana) {
				dispatch(
					setBillerThana({
						id: userData?.id,
						nameBn: userData?.thana,
						nameEn: userData?.thana,
					})
				);
				dispatch(setThanaDisabled(false));
			}

			dispatch(setBillerHomeAddress(userData?.buildingAddress));
		}
	}, [dispatch, userData]);

	const handleSubmit = async () => {
		setLoader(true);

		try {
			const token = localStorage.getItem("accessToken");
			const validationResult = isCheckoutFieldValid();
			if (validationResult.length > 0) {
				setErrorMessages(validationResult);
				setLoader(false);
				return;
			} else {
				let response;
				let requestCheckoutData;
				if (activeTab === "inBangladesh") {
					if (!isGift) {
						requestCheckoutData = {
							customerId: token ? decoded?.id : null,
							customerName: billerName,
							customerPhoneNumber: billerPhoneNumber,
							customerAdditionalPhoneNumber: billerAdditionalPhoneNumber,
							billingAddressDivision: billerDivision.nameEn,
							billingAddressDistrict: billerDistrict.nameEn,
							billingAddressThana: billerThana.nameEn,
							billingAddressTextArea: billerHomeAddress,
							receiverName: billerName,
							receiverPhoneNumber: billerPhoneNumber,
							receiverAdditionalPhoneNumber: billerAdditionalPhoneNumber,
							shippingAddressDivision: billerDivision.nameEn,
							shippingAddressDistrict: billerDistrict.nameEn,
							shippingAddressThana: billerThana.nameEn,
							shippingAddressTextArea: billerHomeAddress,
							isGift: isGift,
							isBangladesh: true,
							deliveryCharge: deliveryCharge,
							paymentMethods: selectedPaymentMethod,
							orderDetails: orderDetails,
							orderFrom: "Website",
						};
					} else {
						requestCheckoutData = {
							customerId: token ? decoded?.id : null,
							customerName: billerName,
							customerPhoneNumber: billerPhoneNumber,
							customerAdditionalPhoneNumber: billerAdditionalPhoneNumber,
							billingAddressDivision: billerDivision.nameEn,
							billingAddressDistrict: billerDistrict.nameEn,
							billingAddressThana: billerThana.nameEn,
							billingAddressTextArea: billerHomeAddress,
							receiverName: shippingName,
							receiverPhoneNumber: shippingPhoneNumber,
							receiverAdditionalPhoneNumber: shippingAdditionalPhoneNumber,
							shippingAddressDivision: shippingDivision.nameEn,
							shippingAddressDistrict: shippingDistrict.nameEn,
							shippingAddressThana: shippingThana.nameEn,
							shippingAddressTextArea: shippingHomeAddress,
							relationshipStatusWithReceiver: nonResidentRelationShip,
							isGift: isGift,
							isBangladesh: true,
							isSameAsBillingAddress: BillingAddressCheck,
							deliveryCharge: deliveryCharge,
							paymentMethods: selectedPaymentMethod,
							orderDetails: orderDetails,
							orderFrom: "Website",
						};
					}
				} else {
					requestCheckoutData = {
						customerId: token ? decoded?.id : null,
						customerName: billerName,
						customerPhoneNumber: countrywisePhoneNumber,
						receiverName: shippingName,
						receiverPhoneNumber: shippingPhoneNumber,
						receiverAdditionalPhoneNumber: shippingAdditionalPhoneNumber,
						shippingAddressDivision: shippingDivision.nameEn,
						shippingAddressDistrict: shippingDistrict.nameEn,
						shippingAddressThana: shippingThana.nameEn,
						shippingAddressTextArea: shippingHomeAddress,
						relationshipStatusWithReceiver: nonResidentRelationShip,
						deliveryCharge: deliveryCharge,
						paymentMethods: selectedPaymentMethod,
						orderDetails: orderDetails,
						isBangladesh: false,
						orderFrom: "Website",
					};
				}

				response = await axios.post(
					`${getBaseUrl(true)}/order`,
					requestCheckoutData
				);

				router.push(`/order-confirm/${response?.data?.order?.orderNumber}`);
			}
		} catch (error: any) {
			setErrorMessages(error);
		} finally {
			setLoader(true);
		}
	};

	return (
		<div>
			{totalQuantity > 0 ? (
				<div>
					<div className="ct-container flex relative">
						<div className="w-full mb-12">
							<div className="text-center md:text-start pt-6">
								<h3 className=" text-2xl font-semibold  uppercase pb-4">
									{t("title")}
								</h3>
							</div>
							<div>
								<CustomerInfoNav />

								<CustomerInfo />
								<CheckoutPaymentMethod />
								<div className="w-full lg:w-[90%] mx-auto py-4 lg:pt-6">
									<CheckoutAmount />
								</div>
								<div className=" hidden md:flex">
									{isButtonEnabled ? (
										<div className="w-full py-4">
											<button
												onClick={handleSubmit}
												disabled={Loader}
												className="w-full lg:w-[40%] mx-auto ct-flex-center bg-gbPrimaryColor hover:bg-gbPrimaryHoverColor py-3 rounded capitalize cursor-pointer text-white smooth-animation-mid"
											>
												{Loader ? (
													<ClipLoader size={24} color={"#fff"} />
												) : (
													<CustomButton buttonText={t("button")} />
												)}
											</button>
										</div>
									) : (
										<div className="w-full py-4">
											<button className="w-full lg:w-[40%] mx-auto ct-flex-center bg-borderLine py-3 rounded capitalize cursor-not-allowed text-white">
												<CustomButton buttonText={t("button")} />
											</button>
										</div>
									)}
								</div>
								<div className="w-full z-20 fixed bottom-[5%] left-0 right-0 md:hidden">
									<div className="">
										{isButtonEnabled ? (
											<div className="w-full py-4">
												<button
													onClick={handleSubmit}
													disabled={Loader}
													className="w-full lg:w-[40%] mx-auto ct-flex-center bg-gbPrimaryColor hover:bg-gbPrimaryHoverColor py-3 capitalize cursor-pointer text-white smooth-animation-mid"
												>
													{Loader ? (
														<ClipLoader size={24} color={"#fff"} />
													) : (
														<CustomButton buttonText={t("button")} />
													)}
												</button>
											</div>
										) : (
											<div className="w-full py-4">
												<button className="w-full lg:w-[40%] mx-auto ct-flex-center bg-borderLine py-3 capitalize cursor-not-allowed text-white">
													<CustomButton buttonText={t("button")} />
												</button>
											</div>
										)}
									</div>
								</div>
								<CheckoutProductList />
							</div>
						</div>
						<div className=" absolute">
							{errorMessages.length > 0 ? (
								<FailedAlertMessage
									errorMesg={errorMessages}
									closePopUp={handleClosePopup}
								/>
							) : (
								""
							)}
						</div>
					</div>
				</div>
			) : (
				<div>
					<EmptyCheckout />
				</div>
			)}
		</div>
	);
};

export default CheckoutMain;
