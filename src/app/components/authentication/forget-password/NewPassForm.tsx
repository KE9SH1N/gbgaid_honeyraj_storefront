"use client";
import {
	selectConfirmNewPin,
	selectConfirmPinErrorMesg,
	selectConfirmPinSuccessMesg,
	selectCurrentPin,
	selectCurrentPinErrorMesg,
	selectNewPin,
	selectNewPinErrorMesg,
	selectNewPinSuccessMesg,
	setConfirmNewPin,
	setConfirmPinErrorMesg,
	setConfirmPinSuccessMesg,
	setNewPin,
	setNewPinSuccessMesg,
} from "@/app/redux/features/auth/userPinResetSlice";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { GoEyeClosed } from "react-icons/go";
import { RxEyeOpen } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../util/CustomButton";
import { selectCustomerPhoneNumber } from "@/app/redux/features/auth/forgetPassSlice";
import { getBaseUrl } from "@/app/lib/helper/getBaseUrl";
import {
	setMessage,
	setOpen,
} from "@/app/redux/features/notification/toasterSlice";

const NewPassForm = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	// For multi-language
	const t = useTranslations("userDashboard");

	const [currentPinCode, setCurrentPinCode] = useState(false);
	const [newPinCode, setNewPinCode] = useState(false);
	const [confirmNewPinCode, setConfirmNewPinCode] = useState(false);
	const [successToast, setSuccessToast] = useState(false);
	const togglePasswordVisibility = (pin: string) => {
		if (pin === "current-pin") {
			setCurrentPinCode(!currentPinCode);
		} else if (pin === "new-pin") {
			setNewPinCode(!newPinCode);
		} else if (pin === "confirm-pin") {
			setConfirmNewPinCode(!confirmNewPinCode);
		}
		return;
	};

	const selectedLanguage = useSelector(
		(state: any) => state.language.selectedLanguage
	);
	// rtk selectors
	const customerPhoneNumber = useSelector(selectCustomerPhoneNumber);
	const userNewPin = useSelector(selectNewPin);
	const userConfirmPin = useSelector(selectConfirmNewPin);
	const userNewPinErrorMesg = useSelector(selectNewPinErrorMesg);
	const userNewPinSuccessMesg = useSelector(selectNewPinSuccessMesg);
	const confirmPinSuccessMesg = useSelector(selectConfirmPinSuccessMesg);
	const confirmPinErrorMesg = useSelector(selectConfirmPinErrorMesg);

	const handleNewPin = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.trim();
		dispatch(setNewPin(value));
	};

	const handleConfrimPin = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.trim();
		dispatch(setConfirmNewPin(value));
		if (value == null) {
			dispatch(setConfirmPinErrorMesg(""));
			dispatch(setConfirmPinSuccessMesg(""));
		} else if (value === userNewPin) {
			dispatch(setConfirmPinSuccessMesg("New Pin Matched"));
			dispatch(setConfirmPinErrorMesg(""));
			dispatch(setConfirmNewPin(value));
		} else if (value !== userNewPin) {
			dispatch(setConfirmPinSuccessMesg(""));
			dispatch(setConfirmPinErrorMesg("Pin doesn't matched"));
		}
	};
	const handleChangePassword = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			if (customerPhoneNumber) {
				const response = await fetch(
					`${getBaseUrl(true)}/auth/forgot-password/reset-password`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							phoneNumber: customerPhoneNumber,
							newPassword: userNewPin,
							confirmPassword: userConfirmPin,
						}),
					}
				);
				const data = await response.json();

				if (response.ok) {
					dispatch(setOpen(true));
					dispatch(
						setMessage({
							message: "Password updated successfully.",
							type: "success",
						})
					);
					dispatch(setNewPin(""));
					dispatch(setConfirmNewPin(""));
					router.push(`/auth/login`);
				} else {
					const errorMesg = data.message;
					dispatch(setOpen(true));
					dispatch(
						setMessage({
							message: errorMesg || "Please try with new password",
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
		} catch (error: any) {}
	};
	return (
		<div className="w-full">
			<div className="w-full mx-auto my-10">
				<h2 className=" text-4xl text-center text-gbPrimaryColor font-bold">
					Set New Password
				</h2>
			</div>
			<form
				action="post"
				className="w-[30%] mx-auto grid grid-cols-1 text-sm gap-y-4 "
				// onSubmit={handleChangePassword}
			>
				<div className=" w-full ct-flex-start flex-col gap-y-2">
					<div className="w-full ct-flex-between">
						<label htmlFor="writeUserPassword" className=" capitalize text-xs">
							{t("setUserPin.form.label.create-new-pin")}
							<span className="text-gbInactiveColor">*</span>
						</label>
						{(userNewPinErrorMesg || userNewPinSuccessMesg) && (
							<p
								className={`capitalize text-xs ${
									userNewPinErrorMesg && "text-gbInactiveColor"
								} ${userNewPinSuccessMesg && "text-gbSecondaryActiveColor"}`}
							>
								{userNewPinErrorMesg || userNewPinSuccessMesg}
							</p>
						)}
					</div>
					<div className="w-full relative">
						<input
							id="writeUserPassword"
							type={newPinCode ? "text" : "password"}
							className="w-full bg-[#F6F6F6] rounded px-3 py-2 border focus:border-gbPrimaryHoverColor focus:outline-none placeholder:capitalize"
							placeholder={t("setUserPin.form.placeholder.create-new-pin")}
							title="Write Your New Password Here, Only Numbers and Alphabets (ex: sakIb321)"
							value={userNewPin ?? ""}
							onChange={handleNewPin}
						/>
						<div
							className=" absolute right-[5%] top-[30%] cursor-pointer"
							onClickCapture={() => togglePasswordVisibility("new-pin")}
						>
							{newPinCode ? (
								<RxEyeOpen />
							) : (
								<GoEyeClosed className=" opacity-60" />
							)}
						</div>
					</div>
				</div>

				<div className=" w-full ct-flex-start flex-col gap-y-2">
					<div className="w-full ct-flex-between">
						<label htmlFor="confirmUserPassword" className="capitalize text-xs">
							{t("setUserPin.form.label.confirm-pin")}
							<span className="text-gbPrimaryColor">*</span>
						</label>
						{(confirmPinErrorMesg || confirmPinSuccessMesg) && (
							<p
								className={`capitalize text-xs ${
									confirmPinErrorMesg && "text-gbInactiveColor"
								} ${confirmPinSuccessMesg && "text-gbSecondaryActiveColor"}`}
							>
								{confirmPinErrorMesg || confirmPinSuccessMesg}
							</p>
						)}
					</div>
					<div className="w-full relative">
						<input
							id="confirmUserPassword"
							type={confirmNewPinCode ? "text" : "password"}
							value={userConfirmPin ?? ""}
							onChange={handleConfrimPin}
							className="w-full bg-[#F6F6F6] rounded px-3 py-2 border focus:border-gbPrimaryHoverColor focus:outline-none placeholder:capitalize "
							placeholder={t("setUserPin.form.placeholder.confirm-pin")}
							title="Re-Type Your New Password For Confirmation (sakIb321)"
						/>
						<div
							className=" absolute right-[5%] top-[30%] cursor-pointer"
							onClickCapture={() => togglePasswordVisibility("confirm-pin")}
						>
							{confirmNewPinCode ? (
								<RxEyeOpen />
							) : (
								<GoEyeClosed className=" opacity-60" />
							)}
						</div>
					</div>
				</div>

				<div>
					<button
						onClick={handleChangePassword}
						className="bg-gbPrimaryColor py-2 text-sm w-full text-center rounded  text-white cursor-pointer capitalize"
					>
						{/* <CustomButton buttonText={t("setUserPin.submit")} /> */}
						<CustomButton buttonText="save" />
					</button>
				</div>
			</form>
		</div>
	);
};

export default NewPassForm;
