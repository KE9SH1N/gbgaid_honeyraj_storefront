"use client";
import React, { useEffect, useState } from "react";
import CustomButton from "../util/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import axios from "axios";
import {
	resetContactUsState,
	selectContactUsEmail,
	selectContactUsFirstName,
	selectContactUsLastName,
	selectContactUsMessage,
	selectContactUsPhoneNumber,
	setContactUsEmail,
	setContactUsFirstName,
	setContactUsLastName,
	setContactUsMessage,
	setContactUsPhoneNumber,
} from "../../redux/features/util/contactUsSlice";
import { useRouter } from "next/navigation";
import { getBaseUrl } from "../../lib/helper/getBaseUrl";
import { ClipLoader } from "react-spinners";
import {
	isToasterOpen,
	setMessage,
	setOpen,
} from "../../redux/features/notification/toasterSlice";
import { BiError } from "react-icons/bi";
import { languageSelector } from "../../redux/features/intl/languageSlice";

const ContactUsForm = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	// For multi-language
	const t = useTranslations("contactUs");
	// Language selector
	const selectedLanguage = useSelector(languageSelector);

	//Local States
	const [Loader, setLoader] = useState<boolean>(false);
	const [errorMessages, setErrorMessages] = useState<string[]>([]);
	const [successAlert, setSuccessAlert] = useState<string>("");

	//State Selector
	const customerFirstName = useSelector(selectContactUsFirstName);
	const customerLastName = useSelector(selectContactUsLastName);
	const customerEmail = useSelector(selectContactUsEmail);
	const customerPhoneNumber = useSelector(selectContactUsPhoneNumber);
	const customerMessage = useSelector(selectContactUsMessage);
	const isToaster = useSelector(isToasterOpen);

	// Conditional Css for first name input field
	const CustomerFirstNameInputBorderColor =
		customerFirstName.length === 0
			? "focus:ring-gbPrimaryColor"
			: "focus:ring-gbActiveColor";

	const handleCustomerFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		const nameRegex = /^[A-Za-z\u0980-\u09FF\s]*$/;
		if (nameRegex.test(value)) {
			dispatch(setContactUsFirstName(value));
		}
	};

	// Conditional Css for last name input field
	const CustomerLastNameInputBorderColor =
		customerLastName.length === 0
			? "focus:ring-gbPrimaryColor"
			: "focus:ring-gbActiveColor";

	const handleCustomerLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		const nameRegex = /^[A-Za-z\u0980-\u09FF\s]*$/;
		if (nameRegex.test(value)) {
			dispatch(setContactUsLastName(value));
		}
	};

	// Conditional Css for phone number input field
	const phoneNumberInputBorderColor =
		customerPhoneNumber.length === 0
			? "focus:ring-gbPrimaryColor"
			: customerPhoneNumber.length < 11
			? "focus:ring-gbInactiveColorLight"
			: "focus:ring-gbActiveColor";

	// Email Validation
	const validateEmail = (customerEmail: string) => {
		// Regular expression for basic email validation
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (regex || null) {
			return regex.test(customerEmail);
		}
		return null;
	};

	// Conditional Css for email input field
	const emailInputBorderColor =
		customerEmail.length === 0
			? "focus:ring-gbPrimaryColor"
			: validateEmail(customerEmail)
			? "focus:ring-gbActiveColor"
			: "focus:ring-gbInactiveColorLight";

	const handleCustomerEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setContactUsEmail(e.target.value));
	};

	const handleCustomerPhoneNumber = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = e.target.value;
		if (/^[\d০১২৩৪৫৬৭৮৯]*$/.test(value) && value.length <= 11) {
			dispatch(setContactUsPhoneNumber(value));
		}
	};

	const handleCustomerMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		dispatch(setContactUsMessage(e.target.value));
	};

	const isConctactUsValid = () => {
		setErrorMessages([]);
		const errors: string[] = [];
		if (customerEmail && !validateEmail(customerEmail)) {
			errors.push(t("errorMessage.error.contactUs-customer-email"));
		} else if (!customerPhoneNumber) {
			errors.push(t("errorMessage.error.contactUs-customer-phoneNumber"));
		} else if (!customerMessage) {
			errors.push(t("errorMessage.error.contactUs-customer-message"));
		} else {
			setSuccessAlert(t("successMessage.success.mesg-submited"));
		}
		return errors;
	};

	useEffect(() => {
		if (errorMessages.length > 0) {
			const timeout = setTimeout(() => {
				setErrorMessages([]);
				setLoader(false);
			}, 4000);

			return () => clearTimeout(timeout);
		}
	}, [errorMessages]);

	const handleSubmit = async () => {
		setLoader(true);
		try {
			const validationResult = isConctactUsValid();
			if (validationResult.length > 0) {
				setLoader(false);
				setErrorMessages(validationResult);
				return;
			} else {
				let response;
				const requestContactUsData = {
					firstName: customerFirstName,
					lastName: customerLastName,
					email: customerEmail,
					phone: customerPhoneNumber,
					message: customerMessage,
				};
				response = await axios.post(
					`${getBaseUrl(true)}/contact-api`,
					requestContactUsData
				);
				if (response) {
					dispatch(resetContactUsState());
					dispatch(setOpen(true));
					dispatch(
						setMessage({
							message: t("successMessage.success.mesg-submited"),
							type: "success",
						})
					);
					setErrorMessages([]);
					setLoader(false);
				}
			}
		} catch (error: any) {
			dispatch(setOpen(true));
			setLoader(false);
			dispatch(
				setMessage({
					message: t("errorMessage.error.backend-errorMesg"),
					type: "failed",
				})
			);
		} finally {
			setLoader(false);
		}
	};

	return (
		<div>
			<div className=" bg-[#F5F5F5] p-6 rounded-2xl">
				<h1 className=" font-semibold text-2xl capitalize ">{t("title")}</h1>
				<p className=" text-xs font-light capitalize mb-1">{t("sub-title")}</p>

				<div
					className={`${
						errorMessages?.length > 0
							? "opacity-100 bg-gbInactiveColor"
							: "opacity-0 pointer-events-none"
					} smooth-animation-mid p-1 flex justify-center items-center rounded h-8`}
				>
					{errorMessages?.map((errorMesg: string, index: number) => (
						<div
							className=" text-white text-xs ct-flex-center gap-x-2"
							key={index}
						>
							<BiError className="text-base" />
							{errorMesg}
						</div>
					))}
				</div>

				<div>
					<form action="" className="my-1 ct-flex-start flex-col space-y-3">
						<div className="ct-grid-cols-2">
							<div className=" flex flex-col space-y-2">
								<label htmlFor="firstName" className=" capitalize text-xs">
									{t("formContent.first-name")}
								</label>
								<input
									type="text"
									id="firstName"
									value={customerFirstName}
									onChange={handleCustomerFirstName}
									placeholder={t("formContent.first-name-placeholder")}
									className={`appearance-none border rounded w-full py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none  focus:ring-1 placeholder:capitalize placeholder:text-xs ${CustomerFirstNameInputBorderColor}`}
								/>
							</div>
							<div className=" flex flex-col space-y-2">
								<label htmlFor="lastName" className=" capitalize text-xs">
									{t("formContent.last-name")}
								</label>
								<input
									type="text"
									id="lastName"
									value={customerLastName}
									onChange={handleCustomerLastName}
									placeholder={t("formContent.last-name-placeholder")}
									className={`appearance-none border rounded w-full py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none  focus:ring-1 focus:ring-gbPrimaryColor placeholder:capitalize placeholder:text-xs ${CustomerLastNameInputBorderColor}`}
								/>
							</div>
						</div>

						<div className="w-full flex flex-col space-y-2">
							<label htmlFor="contactEmail" className=" capitalize text-xs">
								{t("formContent.email")}
							</label>
							<input
								type="email"
								id="contactEmail"
								value={customerEmail}
								onChange={handleCustomerEmail}
								placeholder={t("formContent.email-placeholder")}
								className={`appearance-none border rounded w-full py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none focus:ring-1 placeholder:capitalize placeholder:text-xs ${emailInputBorderColor}`}
							/>
						</div>

						<div className="w-full flex flex-col space-y-2">
							<label
								htmlFor="contactPnoneNumber"
								className=" capitalize text-xs"
							>
								{t("formContent.phone-number")}
							</label>
							<input
								type="text"
								id="contactPnoneNumber"
								value={customerPhoneNumber}
								onChange={handleCustomerPhoneNumber}
								placeholder={t("formContent.phone-number-placeholder")}
								className={`appearance-none border rounded w-full py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none focus:ring-1 placeholder:capitalize placeholder:text-xs ${phoneNumberInputBorderColor}`}
							/>
						</div>

						<div className="w-full flex flex-col space-y-2">
							<label
								htmlFor="contactPnoneNumber"
								className=" capitalize text-xs"
							>
								{t("formContent.mesg")}
							</label>
							<textarea
								value={customerMessage}
								onChange={handleCustomerMessage}
								placeholder={t("formContent.mesg-placeholder")}
								className="appearance-none border rounded w-full py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none  focus:ring-1 focus:ring-gbPrimaryColor placeholder:capitalize placeholder:text-xs"
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
							{isToaster || Loader ? (
								<div className="ct-flex-center gap-x-2">
									{selectedLanguage === "bn" ? (
										<span>সেনডিং...</span>
									) : (
										<span>Sending...</span>
									)}

									<ClipLoader size={20} color={"#fff"} />
								</div>
							) : (
								<CustomButton buttonText={t("submit-btn")} />
							)}
						</button>
					</div>
					<div className="w-full py-2">
						<p className="w-[90%] mx-auto text-center text-[#00000066] text-xs">
							{t("privecy-policy-text.text")}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactUsForm;
