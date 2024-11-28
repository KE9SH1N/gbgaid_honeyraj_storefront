"use client";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import CustomButton from "../util/CustomButton";
import { useTranslations } from "next-intl";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
	resetReqStockState,
	selectReqStockCustomerName,
	selectReqStockMessage,
	selectReqStockNumber,
	setReqStockCustomerMessage,
	setReqStockCustomerName,
	setReqStockCustomerPhoneNumber,
} from "../../redux/features/product/requestStockSlice";
import axios from "axios";
import { getBaseUrl } from "../../lib/helper/getBaseUrl";
import { selectProductDetailsData } from "../../redux/features/product/productdetailsSlice";
import { BiError } from "react-icons/bi";
import {
	setMessage,
	setOpen,
} from "../../redux/features/notification/toasterSlice";
import { languageSelector } from "../../redux/features/intl/languageSlice";
import { selectUserDetailsData } from "../../redux/features/auth/userDetailsSlice";

interface overlayProps {
	toggleSuccessMesg: () => void;
	closeOverlay: () => void;
	requestProductId: number | null;
}

const RequestStock: React.FC<overlayProps> = ({
	closeOverlay,
	toggleSuccessMesg,
	requestProductId,
}) => {
	const dispatch = useDispatch();
	// For multi-language
	const t = useTranslations("stockOutProductRequest");
	const tm = useTranslations("requestStockToasterMesg");

	// selector from rtk
	const productDetailsData = useSelector(selectProductDetailsData);

	//Local States
	const [Loader, setLoader] = useState<boolean>(false);
	const [errorMessages, setErrorMessages] = useState<string[]>([]);

	//State Selector
	const customerFullName = useSelector(selectReqStockCustomerName);
	const customerPhoneNumber = useSelector(selectReqStockNumber);
	const customerMessage = useSelector(selectReqStockMessage);
	const selectedLanguage = useSelector(languageSelector);
	const userData = useSelector(selectUserDetailsData);

	// Conditional Css for first name input field
	const CustomerFullNameInputBorderColor =
		customerFullName?.length === 0
			? "focus:ring-gbPrimaryColor"
			: "focus:ring-gbActiveColor";

	const handleCustomerName = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		const nameRegex = /^[A-Za-z\u0980-\u09FF\s]*$/;
		if (nameRegex.test(value)) {
			dispatch(setReqStockCustomerName(value));
		}
	};

	// Conditional Css for phone number input field
	const phoneNumberInputBorderColor =
		customerPhoneNumber?.length === 0
			? "focus:ring-gbPrimaryColor"
			: customerPhoneNumber?.length < 11
			? "focus:ring-gbInactiveColorLight"
			: "focus:ring-gbActiveColor";

	const handleCustomerPhoneNumber = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = e.target.value;
		if (/^[\d০১২৩৪৫৬৭৮৯]*$/.test(value) && value.length <= 11) {
			dispatch(setReqStockCustomerPhoneNumber(value));
		}
	};

	const handleCustomerMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		dispatch(setReqStockCustomerMessage(e.target.value));
	};

	const isReqStockValid = () => {
		setErrorMessages([]);
		const errors: string[] = [];

		if (!customerFullName) {
			errors.push(tm("validation-mesg.name-field"));
		} else if (!customerPhoneNumber) {
			errors.push(tm("validation-mesg.phoneNumber-field"));
		}
		return errors;
	};

	const handleSubmit = async () => {
		setLoader(true);
		try {
			const validationResult = isReqStockValid();
			if (validationResult?.length > 0) {
				setErrorMessages(validationResult);
				setLoader(false);
				return;
			} else {
				let response;
				const requestReqStockFormData = {
					name: customerFullName,
					phone: customerPhoneNumber,
					message: customerMessage,
					productId: productDetailsData?.id || requestProductId,
				};
				response = await axios.post(
					`${getBaseUrl(true)}/request-for-stock`,
					requestReqStockFormData
				);
				if (response) {
					dispatch(resetReqStockState());
					toggleSuccessMesg();
					closeOverlay();
					dispatch(setOpen(true));
					dispatch(
						setMessage({ message: tm("success-mesg"), type: "success" })
					);
				}
			}
		} catch (error: any) {
			setErrorMessages(error);
			dispatch(setMessage({ message: tm("failed-mesg"), type: "failed" }));
		} finally {
			setLoader(true);
		}
	};

	useEffect(() => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			dispatch(setReqStockCustomerName(userData?.name));
			dispatch(setReqStockCustomerPhoneNumber(userData?.phoneNumber));
		}
	}, [dispatch, userData]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setErrorMessages([]);
			setLoader(false);
		}, 4000);

		return () => clearTimeout(timer);
	}, [errorMessages]);

	return (
		<div className="bg-white z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-96 w-full rounded py-8 px-6">
			<div
				className=" absolute top-[15px] right-[15px] cursor-pointer"
				onClick={closeOverlay}
			>
				<IoClose className=" text-2xl" />
			</div>
			<h2 className=" font-bold text-center text-[32px] my-1">
				{t("requestStockForm.title")}
			</h2>

			<div
				className={`${
					errorMessages?.length > 0
						? "opacity-100 bg-gbInactiveColor "
						: "opacity-0 pointer-events-none"
				} smooth-animation-mid flex justify-center items-center rounded h-8`}
			>
				{errorMessages?.map((errorMesg: string, index: number) => (
					<div
						className=" text-white text-sm ct-flex-center gap-x-2 p-1"
						key={index}
					>
						<BiError className="text-base" />
						{errorMesg}
					</div>
				))}
			</div>

			<form action="" className=" w-full ct-flex-start flex-col space-y-4 my-3">
				<div className="w-full flex flex-col space-y-2">
					<label htmlFor="firstName" className=" capitalize text-sm">
						{t("requestStockForm.your-name")}{" "}
						<span className=" text-red-700">*</span>
					</label>
					<input
						type="text"
						id="firstName"
						value={customerFullName}
						onChange={handleCustomerName}
						placeholder={t("requestStockForm.your-name-placeholder")}
						className={`appearance-none border rounded w-full py-2 px-3 text-sm text-gray-700 bg-[#E6E6E6] leading-tight focus:outline-none  focus:ring-1 placeholder:capitalize placeholder:text-xs ${CustomerFullNameInputBorderColor}`}
					/>
				</div>
				<div className="w-full flex flex-col space-y-2">
					<label htmlFor="contactPnoneNumber" className=" capitalize text-sm">
						{t("requestStockForm.your-phone-number")}{" "}
						<span className=" text-red-700">*</span>
					</label>
					<input
						type="text"
						id="contactPnoneNumber"
						value={customerPhoneNumber}
						onChange={handleCustomerPhoneNumber}
						placeholder={t("requestStockForm.your-phone-number-placeholder")}
						className={`appearance-none border rounded w-full py-2 px-3 text-sm text-gray-700 bg-[#E6E6E6] leading-tight focus:outline-none focus:ring-1 placeholder:capitalize placeholder:text-xs ${phoneNumberInputBorderColor}`}
					/>
				</div>
				<div className="w-full flex flex-col space-y-2">
					<label htmlFor="contactPnoneNumber" className=" capitalize text-sm">
						{t("requestStockForm.your-address")}
					</label>
					<textarea
						value={customerMessage}
						onChange={handleCustomerMessage}
						placeholder={t("requestStockForm.your-address-placeholder")}
						className="appearance-none border rounded w-full py-2 px-3 text-sm text-gray-700 bg-[#E6E6E6] leading-tight focus:outline-none  focus:ring-1 focus:ring-gbPrimaryColor placeholder:capitalize placeholder:text-xs"
						rows={5}
					/>
				</div>
			</form>
			<div className="w-full">
				<button
					onClick={handleSubmit}
					disabled={Loader}
					className="w-full mx-auto ct-flex-center bg-gbPrimaryColor py-2 rounded capitalize cursor-pointer text-sm text-white"
				>
					{Loader ? (
						<div className="ct-flex-center gap-x-2">
							{selectedLanguage === "bn" ? (
								<span>সেনডিং...</span>
							) : (
								<span>Sending...</span>
							)}

							<ClipLoader size={20} color={"#fff"} />
						</div>
					) : (
						<CustomButton buttonText={t("requestStockForm.submit")} />
					)}
				</button>
			</div>
		</div>
	);
};

export default RequestStock;
