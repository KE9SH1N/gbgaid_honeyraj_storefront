"use client";
import React, { useState } from "react";
import CustomButton from "../../util/CustomButton";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getPhoneInputClassName } from "@/app/lib/common/PhoneNumberValidationStyle";
import OtpForm from "../registration/OtpForm";
import {
	selectCustomerPhoneNumber,
	setCustomerPhoneNumber,
} from "@/app/redux/features/auth/forgetPassSlice";
import { validatePhoneNumber } from "@/app/lib/validation/numberValidation";
import { getBaseUrl } from "@/app/lib/helper/getBaseUrl";
import {
	setMessage,
	setOpen,
} from "@/app/redux/features/notification/toasterSlice";
import { setOtpDuration } from "@/app/redux/features/auth/otpCodeSlice";
import ForgetPassOtpForm from "./ForgetPassOtpForm";
import NewPassForm from "./NewPassForm";

const RequestPasswordChange = () => {
	const dispatch = useDispatch();
	const [verifyOtp, setVerifyOtp] = useState<boolean>(false);
	const [changePass, setChangePass] = useState<boolean>(false);
	const [otpTime, setOtpTime] = useState<string>("");
	const selectedLanguage = useSelector(
		(state: any) => state.language.selectedLanguage
	);

	const customerPhoneNumber = useSelector(selectCustomerPhoneNumber);
	const inputClassName = getPhoneInputClassName(customerPhoneNumber);

	const handleCustomerPhoneNumber = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = validatePhoneNumber(e.target.value);
		if (value != null) {
			dispatch(setCustomerPhoneNumber(value == "" ? null : value));
		}
	};

	const handleChangePass = () => {
		setChangePass(true);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			if (customerPhoneNumber) {
				const response = await fetch(
					`${getBaseUrl(true)}/auth/forgot-password/request-otp`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							phoneNumber: customerPhoneNumber,
						}),
					}
				);
				const data = await response.json();
				const duration = data?.verificationCodeExpires;

				if (response.ok) {
					setVerifyOtp(true);
					setOtpTime(duration);
					dispatch(setOtpDuration(duration));
					setChangePass(false);
					dispatch(setOpen(true));
					dispatch(
						setMessage({
							message: "An Otp code will send to your phone number",
							type: "success",
						})
					);
				} else {
					const errorMesg = data.message;
					dispatch(setOpen(true));
					dispatch(
						setMessage({
							message: errorMesg || "Please type correct phone number",
							type: "failed",
						})
					);
				}
			} else {
				dispatch(setOpen(true));
				dispatch(
					setMessage({
						message: "Please Type Your Phone Number",
						type: "failed",
					})
				);
			}
		} catch (error: any) {
			// setCreateAccountErrorMesg(error?.response?.data?.message);
			// dispatch(setOpen(true));
			// dispatch(
			// 	setMessage({
			// 		message: error || "Please type correct phone number",
			// 		type: "failed",
			// 	})
			// );
		}
	};

	return (
		<div className="ct-container w-full">
			{!verifyOtp ? (
				<div className="ct-flex-center flex-col space-y-6 text-center capitalize ">
					<h2 className=" text-4xl text-gbPrimaryColor font-bold">
						Forget Password
					</h2>
					{/* <p className="text-gbInactiveColor">{createAccountErrorMesg}</p> */}
					{/* <p className="text-gbInactiveColor">error mesg</p> */}
					<div className="w-80 flex flex-col space-y-6">
						<form
							action="post"
							className="grid grid-cols-1 text-sm gap-y-4"
							onSubmit={handleSubmit}
						>
							<div className=" w-full ct-flex-start flex-col gap-y-2 ">
								<label
									htmlFor="CustomerPhoneNumber"
									className=" capitalize text-xs"
								>
									write your phone number
								</label>
								<input
									id="CustomerPhoneNumber"
									type="text"
									value={customerPhoneNumber ?? ""}
									onChange={handleCustomerPhoneNumber}
									className={inputClassName}
									placeholder="+880 1777777777"
									title="Enter Your Phone Number (ex: 017XXXXXXXX)"
								/>
							</div>
							<div>
								<button
									type="submit"
									className="bg-gbPrimaryColor py-2 text-sm w-full text-center rounded capitalize text-white cursor-pointer"
								>
									<CustomButton buttonText="submit" />
								</button>
							</div>
						</form>

						<p className="text-xs">
							already have an account or create a new one ?
						</p>
						<div className="w-full ct-flex-center gap-x-5">
							<Link href={`/auth/login`} className="w-[45%]">
								<div className="w-full bg-gbPrimaryColor px-2 py-2 rounded capitalize font-medium text-sm text-white cursor-pointer">
									<CustomButton buttonText="login" />
								</div>
							</Link>
							<Link href={`/auth/registration`} className="w-[45%]">
								<div className="w-full inner-border inner-border-gbPrimaryHoverColor px-2 py-2 rounded capitalize font-medium text-sm text-gbPrimaryColor cursor-pointer">
									<CustomButton buttonText="create account" />
								</div>
							</Link>
						</div>
					</div>
				</div>
			) : (
				<div className="w-full">
					{changePass ? (
						<NewPassForm />
					) : (
						// <div>otp form</div>
						<ForgetPassOtpForm
							otpDuration={otpTime}
							handleSubmit={handleSubmit}
							handleChangePass={handleChangePass}
						/>
					)}
				</div>
			)}
		</div>
	);
};

export default RequestPasswordChange;
