import { useDispatch, useSelector } from "react-redux";
import React, { useState, useRef } from "react";
import CountDown from "../common/CountDown";
import {
	selectOtpFour,
	selectOtpOne,
	selectOtpThree,
	selectOtpTwo,
	setOtpFour,
	setOtpOne,
	setOtpThree,
	setOtpTwo,
} from "@/app/redux/features/auth/otpCodeSlice";
import { getBaseUrl } from "@/app/lib/helper/getBaseUrl";
import {
	setMessage,
	setOpen,
} from "@/app/redux/features/notification/toasterSlice";
import { useRouter } from "next/navigation";

interface OtpProps {
	otpDuration: string;
	handleSubmit: (e: React.FormEvent) => void;
	handleCreateProfile?: () => void;
	handleChangePass?: () => void;
}

const OtpForm: React.FC<OtpProps> = ({
	otpDuration,
	handleSubmit,
	handleCreateProfile,
	handleChangePass,
}) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const [expired, setExpired] = useState(false);
	const otpOneValue = useSelector(selectOtpOne) ?? "";
	const otpTwoValue = useSelector(selectOtpTwo) ?? "";
	const otpThreeValue = useSelector(selectOtpThree) ?? "";
	const otpFourValue = useSelector(selectOtpFour) ?? "";
	const otpValue = otpOneValue + otpTwoValue + otpThreeValue + otpFourValue;

	const selectedLanguage = useSelector(
		(state: any) => state.language.selectedLanguage
	);

	const userCreateAccountPhoneNumber = useSelector(
		(state: any) => state.usercreateaccountform.userCreateAccountPhoneNumber
	);

	// Refs for OTP input fields
	const otpOneRef = useRef<HTMLInputElement>(null);
	const otpTwoRef = useRef<HTMLInputElement>(null);
	const otpThreeRef = useRef<HTMLInputElement>(null);
	const otpFourRef = useRef<HTMLInputElement>(null);

	const handleOtpOne = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (/^\d$/.test(value) || value === null) {
			dispatch(setOtpOne(value));
			// Focus next input field if the value is entered
			if (value && otpTwoRef.current) {
				otpTwoRef.current.focus();
			}
		}
	};

	const handleOtpTwo = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (/^\d$/.test(value) || value === null) {
			dispatch(setOtpTwo(value));
			// Focus next input field if the value is entered
			if (value && otpThreeRef.current) {
				otpThreeRef.current.focus();
			}
		}
	};

	const handleOtpThree = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (/^\d$/.test(value) || value === null) {
			dispatch(setOtpThree(value));
			// Focus next input field if the value is entered
			if (value && otpFourRef.current) {
				otpFourRef.current.focus();
			}
		}
	};

	const handleOtpFour = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (/^\d$/.test(value) || value === null) {
			dispatch(setOtpFour(value));
		}
	};

	// Handle backspace: move focus to previous field if the input is empty
	const handleBackspace = (
		e: React.KeyboardEvent<HTMLInputElement>,
		currentRef: React.RefObject<HTMLInputElement>,
		prevRef: React.RefObject<HTMLInputElement>
	) => {
		if (
			e.key === "Backspace" &&
			currentRef.current &&
			currentRef.current.value === null
		) {
			prevRef.current?.focus();
		}
	};

	const handleExpire = (): void => {
		setExpired(true);
	};

	const handleSubmitOtp = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			if (otpValue) {
				const response = await fetch(`${getBaseUrl(true)}/auth/verify-otp`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						phoneNumber: userCreateAccountPhoneNumber,
						otp: otpValue,
					}),
				});

				if (response.ok) {
					handleCreateProfile?.();
					handleChangePass?.();
					dispatch(setOpen(true));
					dispatch(
						setMessage({
							message: "Otp Accepted",
							type: "success",
						})
					);
					dispatch(setOtpOne(null));
					dispatch(setOtpTwo(null));
					dispatch(setOtpThree(null));
					dispatch(setOtpFour(null));
				} else {
					dispatch(setOpen(true));
					dispatch(
						setMessage({
							message: "Otp Denied.Please type valid otp code.",
							type: "failed",
						})
					);
				}
			} else {
				dispatch(setOpen(true));
				dispatch(
					setMessage({
						message: "Please type valid otp code.",
						type: "failed",
					})
				);
			}
		} catch (error: any) {
			dispatch(setOpen(true));
			dispatch(
				setMessage({
					message: error?.response?.data?.message,
					type: "failed",
				})
			);
		}
	};

	return (
		<div className="ct-flex-center flex-col min-h-[70vh]">
			<div className="w-full max-w-xs p-6 bg-white rounded shadow-md">
				<h2 className="text-3xl font-bold text-center text-orange-500 mb-6">
					OTP Verification
				</h2>
				<p className="text-center text-sm text-gray-600 mb-4">
					Enter the 4-digit code sent to your phone number
				</p>
				<div className="ct-flex-center gap-2 mb-4 w-full">
					<input
						type="text"
						maxLength={1}
						inputMode="numeric"
						value={otpOneValue}
						onChange={handleOtpOne}
						onKeyDown={(e) => handleBackspace(e, otpOneRef, otpOneRef)}
						ref={otpOneRef}
						className="w-12 h-12 border border-gray-300 text-center text-lg font-semibold rounded focus:outline-none focus:ring-1 focus:ring-gbPrimaryColor"
					/>
					<input
						type="text"
						maxLength={1}
						inputMode="numeric"
						value={otpTwoValue}
						onChange={handleOtpTwo}
						onKeyDown={(e) => handleBackspace(e, otpTwoRef, otpOneRef)}
						ref={otpTwoRef}
						className="w-12 h-12 border border-gray-300 text-center text-lg font-semibold rounded focus:outline-none focus:ring-1 focus:ring-gbPrimaryColor"
					/>
					<input
						type="text"
						maxLength={1}
						inputMode="numeric"
						value={otpThreeValue}
						onChange={handleOtpThree}
						onKeyDown={(e) => handleBackspace(e, otpThreeRef, otpTwoRef)}
						ref={otpThreeRef}
						className="w-12 h-12 border border-gray-300 text-center text-lg font-semibold rounded focus:outline-none focus:ring-1 focus:ring-gbPrimaryColor"
					/>
					<input
						type="text"
						maxLength={1}
						inputMode="numeric"
						value={otpFourValue}
						onChange={handleOtpFour}
						onKeyDown={(e) => handleBackspace(e, otpFourRef, otpThreeRef)}
						ref={otpFourRef}
						className="w-12 h-12 border border-gray-300 text-center text-lg font-semibold rounded focus:outline-none focus:ring-1 focus:ring-gbPrimaryColor"
					/>
				</div>
				<div>
					<p className="text-center text-gray-500 mb-6">
						{expired ? (
							<span className="font-semibold text-red-500">Expired</span>
						) : (
							<div>
								<span>This code will expire in:</span>
								<CountDown targetDate={otpDuration} onExpire={handleExpire} />
							</div>
						)}
					</p>
				</div>
				<div className="w-full ct-flex-center">
					<button
						onClick={handleSubmitOtp}
						className="w-[50%] py-2 bg-gbPrimaryColor text-white text-sm rounded-sm focus:outline-none smooth-animation-mid"
					>
						Verify OTP
					</button>
				</div>
				{expired && (
					<p className="mt-4 text-center text-gray-600 text-sm">
						Didn’t receive the code?
						<span
							onClick={(e: any) => {
								handleSubmit(e);
								setExpired(!expired);
							}}
							className="text-gbPrimaryColor font-semibold ml-2 cursor-pointer"
						>
							Resend
						</span>
					</p>
				)}
			</div>
		</div>
	);
};

export default OtpForm;
