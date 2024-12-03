"use client";
import React, { useEffect, useState } from "react";
import CustomButton from "../../util/CustomButton";
import { GoEyeClosed } from "react-icons/go";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RxEyeOpen } from "react-icons/rx";
import {
	resetUserLoginFormState,
	setUserLoginPassword,
	setUserLoginPhoneNumber,
} from "@/app/redux/features/auth/userLoginSlice";
import { getPhoneInputClassName } from "@/app/lib/common/PhoneNumberValidationStyle";
import { getBaseUrl } from "@/app/lib/helper/getBaseUrl";
import { useRouter } from "next/navigation";
import Loader from "../common/Loader";
import { ClipLoader } from "react-spinners";
import {
	setMessage,
	setOpen,
} from "@/app/redux/features/notification/toasterSlice";
import { handlePhoneNumber } from "@/app/lib/common/UserPhoneNumberValidation";
import { setCookie } from "cookie-handler-pro";

const UserLogin = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const selectedLanguage = useSelector(
		(state: any) => state.language.selectedLanguage
	);
	const token = localStorage.getItem("accessToken");

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const userLoginPhoneNumber = useSelector(
		(state: any) => state.userloginform.userLoginPhoneNumber
	);
	const userLoginPassword = useSelector(
		(state: any) => state.userloginform.userLoginPassword
	);

	const handleUserLoginPhoneNumber = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		handlePhoneNumber(e, dispatch, setUserLoginPhoneNumber);
	};

	const handleUserLoginPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		dispatch(setUserLoginPassword(value));
	};
	const inputClassName = getPhoneInputClassName(userLoginPhoneNumber);

	const handleSetCookie = (token: string) => {
		setCookie("accessToken", token, {
			expires: "20d",
			path: "/",
			domain: window.location.hostname,
			secure: process.env.NODE_ENV === "production",
			sameSite: "Lax",
		});
	};

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const response = await fetch(`${getBaseUrl(true)}/auth/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					phoneNumber: userLoginPhoneNumber,
					password: userLoginPassword,
				}),
			});

			const data = await response.json();
			const token = data?.accessToken;

			if (token) {
				setIsLoading(true);
				localStorage.setItem("accessToken", token);
				handleSetCookie(token);
				router.push(`/`);
				dispatch(resetUserLoginFormState());
				dispatch(setOpen(true));
				dispatch(
					setMessage({
						message: "Welcome back! You’ve successfully logged in",
						type: "success",
					})
				);
			} else {
				setIsLoading(false);
				setErrorMessage(data.message || "Failed to login");
			}
		} catch (error) {
			setErrorMessage("An error occurred. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	const [isLoadToken, setIsLoadToken] = useState(true);

	useEffect(() => {
		if (token) {
			setIsLoadToken(true);
			router.push(`/`);
		} else {
			setIsLoadToken(false);
		}
	}, [token, router, selectedLanguage]);

	if (isLoadToken) {
		return (
			<div>
				<Loader />
			</div>
		);
	}

	return (
		<div>
			<div className="ct-container ct-flex-center flex-col h-[71.3vh] text-center capitalize ">
				<h2 className=" text-5xl text-gbPrimaryColor font-bold">User Login</h2>
				<div className="w-80 flex flex-col gap-y-3">
					<p className=" text-gbInactiveColor">{errorMessage}</p>
					<form
						action="post"
						onSubmit={handleLogin}
						className="grid grid-cols-1 text-sm gap-y-4 "
					>
						<div className=" w-full ct-flex-start flex-col gap-y-2 ">
							<label
								htmlFor="userLoginPhoneNumber"
								className=" capitalize text-xs"
							>
								your Phone number*
							</label>
							<input
								id="userLoginPhoneNumber"
								type="text"
								value={userLoginPhoneNumber}
								onChange={handleUserLoginPhoneNumber}
								className={inputClassName}
								placeholder="01777777777"
								title="Enter Your Phone Number (ex: 017XXXXXXXX)"
							/>
						</div>
						<div className=" w-full ct-flex-start flex-col gap-y-2">
							<label
								htmlFor="userLoginPassword"
								className=" capitalize text-xs"
							>
								enter your password*
							</label>
							<div className="w-full relative">
								<input
									id="userLoginPassword"
									type={showPassword ? "text" : "password"}
									value={userLoginPassword}
									onChange={handleUserLoginPassword}
									className="w-full bg-[#F6F6F6] rounded px-3 py-2 border focus:border-[#F68821] focus:outline-none placeholder:capitalize"
									placeholder="Enter your account password"
									title="Write Your Account Password (ex: eMtiaz123)"
								/>
								<div
									className=" absolute right-[5%] top-[30%] cursor-pointer"
									onClick={togglePasswordVisibility}
								>
									{showPassword ? (
										<RxEyeOpen />
									) : (
										<GoEyeClosed className=" opacity-60" />
									)}
								</div>
							</div>
						</div>
						<div className="w-full py-4">
							<button
								type="submit"
								disabled={isLoading}
								className="w-full mx-auto ct-flex-center bg-gbPrimaryColor py-3 rounded capitalize cursor-pointer text-white"
							>
								{isLoading ? (
									<ClipLoader size={20} color={"#fff"} />
								) : (
									<CustomButton buttonText="login" />
								)}
							</button>
						</div>
					</form>
					<div className="text-sm font-medium">
						<p>Can’t remember your password?</p>
						<Link href={`/auth/forgetpin`} className="text-blue-400">
							Reset your password
						</Link>
					</div>
					<p className="text-xs">
						If you have no account, please create an account first
					</p>
					<Link href={`/auth/registration`}>
						<div className="w-full inner-border inner-border-gbPrimaryColor py-3 rounded capitalize font-medium text-gbPrimaryColor cursor-pointer">
							<CustomButton buttonText="create account" />
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default UserLogin;
