"use client";
import React, { useEffect, useState } from "react";
import CustomButton from "../../util/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { getPhoneInputClassName } from "@/app/lib/common/PhoneNumberValidationStyle";
import {
	resetUserCreateAccountFormState,
	setUserCreateAccountConfirmPassword,
	setUserCreateAccountName,
	setUserCreateAccountPassword,
	setUserCreateAccountPhoneNumber,
} from "@/app/redux/features/auth/userCreateAccountSlice";
import axios from "axios";
import { getBaseUrl } from "@/app/lib/helper/getBaseUrl";
import { useRouter } from "next/navigation";
import Loader from "../common/Loader";
import { validateUserName } from "@/app/lib/validation/userNameValidation";
import { validatePhoneNumber } from "@/app/lib/validation/numberValidation";
import { setUserLoginPhoneNumber } from "@/app/redux/features/auth/userLoginSlice";
import { validatePassword } from "@/app/lib/validation/userPasswordValidation";
import {
	setUserFullName,
	setUserPhoneNumber,
} from "@/app/redux/features/auth/userProfileSlice";
import { RxEyeOpen } from "react-icons/rx";
import { GoEyeClosed } from "react-icons/go";

interface CreateAccountProps {
	handleCreateProfile?: () => void;
}

const CreateAccount: React.FC<CreateAccountProps> = ({
	handleCreateProfile,
}) => {
	const dispatch = useDispatch();
	const router = useRouter();

	const [errorMessage, setErrorMessage] = useState<string>("");
	const [successMessage, setSuccessMessage] = useState<string>("");
	const [createAccountErrorMesg, setCreateAccountErrorMesg] =
		useState<string>("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const selectedLanguage = useSelector(
		(state: any) => state.language.selectedLanguage
	);
	const token = localStorage.getItem("accessToken");

	const userCreateAaccountName = useSelector(
		(state: any) => state.usercreateaccountform.userCreateAccountName
	);

	const userCreateAccountPhoneNumber = useSelector(
		(state: any) => state.usercreateaccountform.userCreateAccountPhoneNumber
	);
	const userCreateAccountPassword = useSelector(
		(state: any) => state.usercreateaccountform.userCreateAccountPassword
	);
	const userCreateAccountConfirmPassword = useSelector(
		(state: any) => state.usercreateaccountform.userCreateAccountConfirmPassword
	);

	const inputClassName = getPhoneInputClassName(userCreateAccountPhoneNumber);

	// user Phone Number validation
	const handleUserAccountPhoneNumber = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = validatePhoneNumber(e.target.value);
		if (value !== null) {
			dispatch(setUserCreateAccountPhoneNumber(value));
			dispatch(setUserLoginPhoneNumber(value));
			dispatch(setUserPhoneNumber(value));
		}
	};

	// user Name validation
	const handleUserCreateAccountName = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = validateUserName(e.target.value);
		if (value !== null) {
			dispatch(setUserCreateAccountName(value));
			dispatch(setUserFullName(value));
		}
	};
	const handleUserCreateAccountPassword = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = validatePassword(e.target.value);
		if (value !== null) {
			dispatch(setUserCreateAccountPassword(value));
		}
	};

	const handleUserCreateAccountConfirmPassword = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = e.target.value;
		dispatch(setUserCreateAccountConfirmPassword(value));
		if (value == null) {
			setSuccessMessage("");
			setErrorMessage("");
		} else if (value === userCreateAccountPassword) {
			setSuccessMessage("Password Matched");
		} else if (value !== userCreateAccountPassword) {
			setErrorMessage("Password Unmatched");
		}
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};
	const toggleConfirmPasswordVisibility = () => {
		setShowConfirmPassword(!showConfirmPassword);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				`${getBaseUrl(true)}/auth/complete-registration`,
				{
					name: userCreateAaccountName,
					phoneNumber: userCreateAccountPhoneNumber,
					password: userCreateAccountPassword,
					confirmPassword: userCreateAccountConfirmPassword,
				}
			);
			if (response) {
				// Attempt to login the user
				const loginResponse = await fetch(`${getBaseUrl(true)}/auth/login`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						phoneNumber: userCreateAccountPhoneNumber,
						password: userCreateAccountPassword,
					}),
				});
				const data = await loginResponse.json();
				const token = data?.accessToken;
				if (token) {
					localStorage.setItem("accessToken", token);
					router.push(`/`);
					dispatch(resetUserCreateAccountFormState());
				} else {
					setCreateAccountErrorMesg(
						data.message || "Failed to login after account creation"
					);
				}
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
			<div className="ct-container ct-flex-center flex-col space-y-6 h-[71.3vh] text-center capitalize ">
				<h2 className=" text-5xl text-gbPrimaryColor font-bold">
					create account
				</h2>
				<p className="text-gbInactiveColor">{createAccountErrorMesg}</p>
				<div className="w-80 flex flex-col space-y-6">
					<form
						action="post"
						className="grid grid-cols-1 text-sm gap-y-4 "
						onSubmit={handleSubmit}
					>
						<div className=" w-full ct-flex-start flex-col gap-y-2 ">
							<label htmlFor="writeUserName" className=" capitalize text-xs">
								write your name
							</label>
							<input
								id="writeUserName"
								type="text"
								value={userCreateAaccountName}
								onChange={handleUserCreateAccountName}
								className={inputClassName}
								placeholder="Abir Rayhan"
								title="Enter Your Name (ex: Abir Rayhan)"
							/>
						</div>
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
						<div className="relative w-full ct-flex-start flex-col gap-y-2">
							<label
								htmlFor="userPassword"
								className="w-full capitalize text-xs ct-flex-between"
							>
								<span>Type your password</span>
							</label>
							<input
								id="userPassword"
								type={showPassword ? "text" : "password"}
								value={userCreateAccountPassword}
								onChange={handleUserCreateAccountPassword}
								className="w-full bg-[#F6F6F6] rounded px-3 py-2 border focus:border-gbPrimaryHoverColor focus:outline-none placeholder:capitalize"
								placeholder="confirm your password"
								title="Re-Type Your Password For Confirmation (eMtiaz123)"
							/>
							<div
								className=" absolute right-[5%] top-[58%] cursor-pointer"
								onClick={togglePasswordVisibility}
							>
								{showPassword ? (
									<RxEyeOpen />
								) : (
									<GoEyeClosed className=" opacity-60" />
								)}
							</div>
						</div>

						<div className="relative w-full ct-flex-start flex-col gap-y-2">
							<label
								htmlFor="confirmUserPassword"
								className="w-full capitalize text-xs ct-flex-between"
							>
								<span>confirm your password</span>
								{userCreateAccountPassword ===
								userCreateAccountConfirmPassword ? (
									<span className="text-gbSecondaryActiveColor">
										{successMessage}
									</span>
								) : (
									<span className="text-gbInactiveColor">{errorMessage}</span>
								)}
							</label>
							<input
								id="confirmUserPassword"
								type={showConfirmPassword ? "text" : "password"}
								value={userCreateAccountConfirmPassword}
								onChange={handleUserCreateAccountConfirmPassword}
								className="w-full bg-[#F6F6F6] rounded px-3 py-2 border focus:border-gbPrimaryHoverColor focus:outline-none placeholder:capitalize"
								placeholder="confirm your password"
								title="Re-Type Your Password For Confirmation (eMtiaz123)"
							/>
							<div
								className=" absolute right-[5%] top-[58%] cursor-pointer"
								onClick={toggleConfirmPasswordVisibility}
							>
								{showConfirmPassword ? (
									<RxEyeOpen />
								) : (
									<GoEyeClosed className=" opacity-60" />
								)}
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="bg-gbPrimaryColor py-3 text-sm w-full text-center rounded capitalize text-white cursor-pointer"
							>
								<CustomButton buttonText="create account" />
							</button>
						</div>
					</form>

					{/* <p className="text-xs">already have an account ?</p>
					<Link href={`/auth/login`}>
						<div className="w-full inner-border inner-border-[#F68821] py-3 rounded capitalize font-medium text-[#F68821] cursor-pointer">
							<CustomButton buttonText="login" />
						</div>
					</Link> */}
				</div>
			</div>
		</div>
	);
};

export default CreateAccount;
