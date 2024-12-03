"use client";
import React, { useEffect, useState } from "react";
import CustomButton from "../../util/CustomButton";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getPhoneInputClassName } from "@/app/lib/common/PhoneNumberValidationStyle";
import { setUserCreateAccountPhoneNumber } from "@/app/redux/features/auth/userCreateAccountSlice";

import { getBaseUrl } from "@/app/lib/helper/getBaseUrl";
import { useRouter } from "next/navigation";
import Loader from "../common/Loader";
import { validatePhoneNumber } from "@/app/lib/validation/numberValidation";

import { setOtpDuration } from "@/app/redux/features/auth/otpCodeSlice";
import OtpForm from "./OtpForm";
import {
	setMessage,
	setOpen,
} from "@/app/redux/features/notification/toasterSlice";
import CreateAccount from "./CreateAccount";

const RegistrationAccount = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const [createAccountErrorMesg, setCreateAccountErrorMesg] =
		useState<string>("");
	const [verifyOtp, setVerifyOtp] = useState<boolean>(false);
	const [otpTime, setOtpTime] = useState<string>("");
	const [createProfile, setCreateProfile] = useState<boolean>(false);

	const selectedLanguage = useSelector(
		(state: any) => state.language.selectedLanguage
	);
	const token = localStorage.getItem("accessToken");

	const userCreateAccountPhoneNumber = useSelector(
		(state: any) => state.usercreateaccountform.userCreateAccountPhoneNumber
	);

	const inputClassName = getPhoneInputClassName(userCreateAccountPhoneNumber);

	// user Phone Number validation
	const handleUserAccountPhoneNumber = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = validatePhoneNumber(e.target.value);
		if (value !== null) {
			dispatch(setUserCreateAccountPhoneNumber(value));
		}
	};

	const handleCreateProfile = () => {
		setCreateProfile(true);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			if (userCreateAccountPhoneNumber) {
				const response = await fetch(`${getBaseUrl(true)}/auth/register`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						phoneNumber: userCreateAccountPhoneNumber,
					}),
				});
				const data = await response.json();
				const duration = data?.verificationCodeExpires;

				if (response.ok) {
					setVerifyOtp(true);
					setOtpTime(duration);
					dispatch(setOtpDuration(duration));
					setCreateProfile(false);
					dispatch(setOpen(true));
					dispatch(
						setMessage({
							message: "Otp code send to your phone number",
							type: "success",
						})
					);
				} else {
					dispatch(setOpen(true));
					dispatch(
						setMessage({
							message: "User already exist or type correct phone number",
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
			setCreateAccountErrorMesg(error?.response?.data?.message);
		}
	};

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (token) {
			setIsLoading(true);
			router.push(`/`);
		} else {
			setIsLoading(false);
		}
	}, [token, router, selectedLanguage]);

	if (isLoading) {
		return (
			<div>
				<Loader />
			</div>
		);
	}
	return (
		<div>
			<div className="ct-container ">
				{!verifyOtp ? (
					<div className="ct-flex-center flex-col space-y-6 h-[71.3vh] text-center capitalize ">
						<h2 className=" text-5xl text-gbPrimaryColor font-bold">
							Registration
						</h2>
						<p className="text-gbInactiveColor">{createAccountErrorMesg}</p>
						<div className="w-80 flex flex-col space-y-6">
							<form
								action="post"
								className="grid grid-cols-1 text-sm gap-y-4 "
								onSubmit={handleSubmit}
							>
								<div className=" w-full ct-flex-start flex-col gap-y-2 ">
									<label
										htmlFor="writeUserPhoneNumber"
										className=" capitalize text-xs"
									>
										write your phone number
									</label>
									<input
										id="writeUserPhoneNumber"
										type="text"
										value={userCreateAccountPhoneNumber}
										onChange={handleUserAccountPhoneNumber}
										className={inputClassName}
										placeholder="+880 1777777777"
										title="Enter Your Phone Number (ex: 017XXXXXXXX)"
									/>
								</div>
								<div>
									<button
										type="submit"
										className="bg-gbPrimaryColor py-3 text-sm w-full text-center rounded capitalize text-white cursor-pointer"
									>
										<CustomButton buttonText="submit" />
									</button>
								</div>
							</form>

							<p className="text-xs">already have an account ?</p>
							<Link href={`/auth/login`}>
								<div className="w-full inner-border inner-border-gbPrimaryHoverColor py-3 rounded capitalize font-medium text-gbPrimaryColor cursor-pointer">
									<CustomButton buttonText="login" />
								</div>
							</Link>
						</div>
					</div>
				) : (
					<div>
						{createProfile ? (
							<CreateAccount />
						) : (
							<OtpForm
								otpDuration={otpTime}
								handleSubmit={handleSubmit}
								handleCreateProfile={handleCreateProfile}
							/>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default RegistrationAccount;
