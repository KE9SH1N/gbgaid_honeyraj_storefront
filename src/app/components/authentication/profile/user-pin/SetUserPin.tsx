"use client";
import React, { useState } from "react";
import CustomButton from "../../../util/CustomButton";

import { useDispatch, useSelector } from "react-redux";
import { RxEyeOpen } from "react-icons/rx";
import { GoEyeClosed } from "react-icons/go";
import { usePathname } from "next/navigation";
import {
	resetPinResetState,
	selectConfirmNewPin,
	selectConfirmPinErrorMesg,
	selectConfirmPinSuccessMesg,
	selectCurrentPin,
	selectCurrentPinErrorMesg,
	selectNewPinErrorMesg,
	selectNewPin,
	selectNewPinSuccessMesg,
	setConfirmNewPin,
	setConfirmPinErrorMesg,
	setConfirmPinSuccessMesg,
	setCurrentPin,
	setCurrentPinErrorMesg,
	setNewPin,
	setNewPinErrorMesg,
	setNewPinSuccessMesg,
} from "@/app/redux/features/auth/userPinResetSlice";
import { getBaseUrl } from "@/app/lib/helper/getBaseUrl";
import axios from "axios";
import {
	setMessage,
	setOpen,
} from "@/app/redux/features/notification/toasterSlice";
import { useTranslations } from "next-intl";

const SetUserPin = () => {
	const dispatch = useDispatch();

	const param = usePathname();

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

	// rtk selectors

	const selectedLanguage = useSelector(
		(state: any) => state.language.selectedLanguage
	);
	const userCurrentPin = useSelector(selectCurrentPin);
	const userNewPin = useSelector(selectNewPin);
	const userConfirmPin = useSelector(selectConfirmNewPin);
	const userConfirmPinErrorMesg = useSelector(selectCurrentPinErrorMesg);
	const userNewPinErrorMesg = useSelector(selectNewPinErrorMesg);
	const userNewPinSuccessMesg = useSelector(selectNewPinSuccessMesg);
	const confirmPinSuccessMesg = useSelector(selectConfirmPinSuccessMesg);
	const confirmPinErrorMesg = useSelector(selectConfirmPinErrorMesg);

	const handleCurrentPin = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		dispatch(setCurrentPin(value));
	};

	const handleNewPin = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.trim();
		dispatch(setNewPin(value));

		if (value == null) {
			dispatch(setNewPinSuccessMesg(""));
		} else {
			if (value === userCurrentPin) {
				dispatch(setNewPinSuccessMesg(""));
				dispatch(setNewPinErrorMesg("New Pin is not same as current Pin"));
			} else {
				dispatch(setNewPinErrorMesg(""));
				dispatch(setNewPinSuccessMesg("Unique Pin"));
				dispatch(setNewPin(value));
			}
		}
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

	// access token
	const token = localStorage.getItem("accessToken");

	const handleSavePin = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			// input field error mesg handle
			if (userCurrentPin === null) {
				dispatch(setCurrentPinErrorMesg("Plz Type your current pin"));

				setTimeout(() => {
					dispatch(setCurrentPinErrorMesg(""));
				}, 4000);
			} else {
				dispatch(setCurrentPinErrorMesg(""));
			}

			if (userNewPin === null) {
				dispatch(setNewPinErrorMesg("Plz Type your new pin"));

				setTimeout(() => {
					dispatch(setNewPinErrorMesg(""));
				}, 4000);
			} else {
				dispatch(setNewPinErrorMesg(""));
			}

			if (userConfirmPin === null) {
				dispatch(setConfirmPinErrorMesg("Plz type to confirm new pin"));

				setTimeout(() => {
					dispatch(setConfirmPinErrorMesg(""));
				}, 4000);
			} else {
				dispatch(setConfirmPinErrorMesg(""));
			}

			if (
				userCurrentPin !== userNewPin &&
				userNewPin === userConfirmPin &&
				userNewPin !== ""
			) {
				const requestNewPin = {
					oldPassword: userCurrentPin,
					newPassword: userNewPin,
					confirmNewPassword: userConfirmPin,
				};

				const response = await axios.post(
					`${getBaseUrl(true)}/auth/change-password/`,
					requestNewPin,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				if (response) {
					dispatch(resetPinResetState());
					dispatch(setOpen(true));
					dispatch(
						setMessage({
							message: "You Successfully Reset Your Pin",
							type: "success",
						})
					);

					// window.location.href = `/auth/profile`;
				}
			}
		} catch (error: any) {
			dispatch(resetPinResetState());
			const backendMesg = error?.response?.data?.message;
			dispatch(setOpen(true));
			dispatch(setMessage({ message: backendMesg, type: "failed" }));
		} finally {
		}
	};

	// For multi-language
	const t = useTranslations("userDashboard");
	return (
		<div className="relative w-full">
			<div className="ct-container w-full flex-col space-y-6 text-center my-6 mb-24">
				{param === `/auth/profile` ? (
					<div className="w-full ct-flex-center">
						<h2 className=" text-3xl text-start text-[#F68821] font-bold capitalize">
							{t("setUserPin.title")}
							{/* change your pin */}
						</h2>
					</div>
				) : (
					<div className="w-full ct-flex-center ">
						<h2 className=" text-5xl text-[#F68821] font-bold capitalize">
							{t("setUserPin.title")}
						</h2>
					</div>
				)}
				<div
					className={`${
						param === `/auth/profile` ? "w-full" : "w-full"
					} flex items-center justify-center flex-col space-y-6`}
				>
					<form
						action=""
						className="w-full lg:w-[70%] grid grid-cols-1 text-sm gap-y-4 "
					>
						<div className=" w-full ct-flex-start flex-col gap-y-2">
							<div className="w-full ct-flex-between">
								<label
									htmlFor="writeUserPhoneNumber"
									className=" capitalize text-xs"
								>
									{t("setUserPin.form.label.current-pin-number")}
									<span className="text-red-500">*</span>
								</label>
								{userConfirmPinErrorMesg && (
									<p
										className={`capitalize text-xs ${
											userConfirmPinErrorMesg && "text-gbInactiveColor"
										}`}
									>
										{userConfirmPinErrorMesg}
									</p>
								)}
							</div>
							<div className=" relative w-full">
								<input
									id="writeUserPhoneNumber"
									type={currentPinCode ? "text" : "password"}
									className="w-full bg-[#F6F6F6] rounded px-3 py-2 border focus:border-[#F68821] focus:outline-none placeholder:capitalize"
									placeholder={t(
										"setUserPin.form.placeholder.current-pin-number"
									)}
									title="Enter Old Password (ex: sakIb321)"
									value={userCurrentPin ?? ""}
									onChange={handleCurrentPin}
								/>
								<div
									className=" absolute right-[5%] top-[30%] cursor-pointer"
									onClickCapture={() => togglePasswordVisibility("current-pin")}
								>
									{currentPinCode ? (
										<RxEyeOpen />
									) : (
										<GoEyeClosed className=" opacity-60" />
									)}
								</div>
							</div>
						</div>
						<div className=" w-full ct-flex-start flex-col gap-y-2">
							<div className="w-full ct-flex-between">
								<label
									htmlFor="writeUserPassword"
									className=" capitalize text-xs"
								>
									{t("setUserPin.form.label.create-new-pin")}
									<span className="text-red-500">*</span>
								</label>
								{(userNewPinErrorMesg || userNewPinSuccessMesg) && (
									<p
										className={`capitalize text-xs ${
											userNewPinErrorMesg && "text-gbInactiveColor"
										} ${userNewPinSuccessMesg && "text-gbActiveColor"}`}
									>
										{userNewPinErrorMesg || userNewPinSuccessMesg}
									</p>
								)}
							</div>
							<div className="w-full relative">
								<input
									id="writeUserPassword"
									type={newPinCode ? "text" : "password"}
									className="w-full bg-[#F6F6F6] rounded px-3 py-2 border focus:border-[#F68821] focus:outline-none placeholder:capitalize"
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
								<label
									htmlFor="confirmUserPassword"
									className="capitalize text-xs"
								>
									{t("setUserPin.form.label.confirm-pin")}
									<span className="text-red-500">*</span>
								</label>
								{(confirmPinErrorMesg || confirmPinSuccessMesg) && (
									<p
										className={`capitalize text-xs ${
											confirmPinErrorMesg && "text-gbInactiveColor"
										} ${confirmPinSuccessMesg && "text-gbActiveColor"}`}
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
									className="w-full bg-[#F6F6F6] rounded px-3 py-2 border focus:border-[#F68821] focus:outline-none placeholder:capitalize "
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
								onClick={handleSavePin}
								className="bg-[#F68821] py-2 text-sm w-full text-center rounded  text-white cursor-pointer capitalize"
							>
								<CustomButton buttonText={t("setUserPin.submit")} />
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SetUserPin;
