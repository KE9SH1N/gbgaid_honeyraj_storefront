"use client";
import React, { useEffect, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import DistrictDropDown from "./util/DistrictDropDown";
import DivisionDropDown from "./util/DivisionDropDown";
import ThanaDropDown from "./util/ThanaDropDown";
import { validatePhoneNumber } from "@/app/lib/validation/numberValidation";
import { useDispatch, useSelector } from "react-redux";
import {
	selectUserAditionalPhoneNumber,
	selectUserDistrict,
	selectUserDivision,
	selectUserDp,
	selectUserEmail,
	selectUserFullName,
	selectUserLocalAddress,
	selectUserPhoneNumber,
	selectUserThana,
	setUserAditionalPhoneNumber,
	setUserDistrict,
	setUserDivision,
	setUserDp,
	setUserEmail,
	setUserFullName,
	setUserLocalAddress,
	setUserThana,
} from "@/app/redux/features/auth/userProfileSlice";
import { validateUserName } from "@/app/lib/validation/userNameValidation";
import Image from "next/image";
import { languageSelector } from "@/app/redux/features/intl/languageSlice";
import { getBaseUrl } from "@/app/lib/helper/getBaseUrl";
import { getUserInfo } from "@/app/lib/common/AuthTokenDecoder";
import { selectUserDetailsData } from "@/app/redux/features/auth/userDetailsSlice";
import { MdAddPhotoAlternate } from "react-icons/md";

const UserProfileEdit = ({ handleUserProfileEdit }: any) => {
	const dispatch = useDispatch();

	const [errorMessages, setErrorMessages] = useState<string[]>([]);
	const [Loader, setLoader] = useState(false);

	// access token
	const token = localStorage.getItem("accessToken");
	// rtk selectores
	const selectedLanguage = useSelector(languageSelector);
	const selectProfileFullName = useSelector(selectUserFullName);
	const selectProfilePhoneNumber = useSelector(selectUserPhoneNumber);
	const selectProfileAditionalPhoneNumber = useSelector(
		selectUserAditionalPhoneNumber
	);
	const selectProfileEmail = useSelector(selectUserEmail);
	const selectProfileLocalAddress = useSelector(selectUserLocalAddress);
	const userDp = useSelector(selectUserDp);
	const selectProfileDivision = useSelector(selectUserDivision);
	const selectProfileDistrict = useSelector(selectUserDistrict);
	const selectProfileThana = useSelector(selectUserThana);

	const userData = useSelector(selectUserDetailsData);

	// token decode
	const decoded = getUserInfo() as any;
	const userId = decoded?.id;

	const [imagePreview, setImagePreview] = useState<string | null>(null);

	useEffect(() => {
		if (userDp) {
			// Create a URL for the File object
			setImagePreview(URL.createObjectURL(userDp));
		} else {
			setImagePreview(null);
		}

		// Clean up URL object when component unmounts or userDp changes
		return () => {
			if (imagePreview) {
				URL.revokeObjectURL(imagePreview);
			}
		};
	}, [userDp]);

	useEffect(() => {
		dispatch(setUserFullName(userData?.name));
		dispatch(setUserAditionalPhoneNumber(userData?.AdditionalPhoneNumber));
		dispatch(setUserEmail(userData?.email));
		dispatch(
			setUserDivision({
				id: "",
				nameBn: userData?.division,
				nameEn: userData?.division,
			})
		);
		dispatch(
			setUserDistrict({
				id: "",
				nameBn: userData?.district,
				nameEn: userData?.district,
			})
		);
		dispatch(
			setUserThana({
				id: "",
				nameBn: userData?.thana,
				nameEn: userData?.thana,
			})
		);

		dispatch(setUserLocalAddress(userData?.buildingAddress));
	}, []);

	// user Name validation and dispatch
	const handleProfileFullName = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = validateUserName(e.target.value);
		if (value !== null) {
			dispatch(setUserFullName(value));
		}
	};

	// user aditional Phone Number validation and dispatch
	const handleAditionalProfilePhoneNumber = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = validatePhoneNumber(e.target.value);
		if (value !== null) {
			dispatch(setUserAditionalPhoneNumber(value));
		}
	};

	// user email validation and dispatch
	const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		dispatch(setUserEmail(value));
	};

	// user local address value dispatch
	const handleLocalAddress = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const value = e.target.value;
		dispatch(setUserLocalAddress(value));
	};

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;
		if (file) {
			dispatch(setUserDp(file));
		}
	};

	const isCheckoutFieldValid = () => {
		setErrorMessages([]);
		const errors: string[] = [];

		if (!selectProfileFullName) {
			errors.push("name can't be empty");
		}
		return errors;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Append user profile data
		const formData = new FormData();
		formData.append("name", selectProfileFullName ?? "");
		formData.append(
			"AdditionalPhoneNumber",
			selectProfileAditionalPhoneNumber ?? ""
		);
		formData.append("email", selectProfileEmail ?? "");
		if (selectedLanguage === "bn") {
			formData.append("division", selectProfileDivision?.nameBn ?? "");
			formData.append("district", selectProfileDistrict?.nameBn ?? "");
			formData.append("thana", selectProfileThana?.nameBn ?? "");
		} else {
			formData.append("division", selectProfileDivision?.nameEn ?? "");
			formData.append("district", selectProfileDistrict?.nameEn ?? "");
			formData.append("thana", selectProfileThana?.nameEn ?? "");
		}
		formData.append("buildingAddress", selectProfileLocalAddress ?? "");

		if (userDp) {
			formData.append("profilePicture", userDp);
		}

		try {
			const validationResult = isCheckoutFieldValid();
			if (validationResult.length > 0) {
				setErrorMessages(validationResult);
				setLoader(false);
				return;
			} else {
				const response = await fetch(
					`${getBaseUrl(true)}/auth/update-profile/`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
						method: "PATCH",
						body: formData,
					}
				);
				if (response) {
					window.location.href = `/auth/profile`;
				}
			}
		} catch (error: any) {
			setErrorMessages(error);
			setLoader(false);
		} finally {
			setLoader(true);
		}
	};

	return (
		<div className="w-full mb-24 lg:mb-0 px-3">
			<h3>Edit Profile</h3>

			<div className="w-full ct-flex-start flex-col gap-y-4 mb-6">
				<div className="ct-flex-center flex-col w-full h-full mb-8">
					<div className="relative flex flex-col gap-y-3 items-center justify-center w-32 h-32 rounded-xl cursor-pointer bg-[#D9D9D9]">
						{imagePreview ? (
							<Image
								src={imagePreview}
								width={100}
								height={100}
								alt="Profile avatar"
								className="w-32 h-32 object-cover rounded-xl border border-gbPrimaryColor"
							/>
						) : (
							<div className="ct-flex-center flex-col">
								{/* <div className="relative">
									<Image
										src={`${getBaseUrl(true)}/${userData?.profilePicture}`}
										alt=""
										width={100}
										height={100}
										className="w-36 h-28 object-cover rounded-full blur-[1px]"
									/>
								</div> */}
							</div>
						)}

						<input
							type="file"
							className="absolute top-0 left-0 w-full h-full z-20 opacity-0 cursor-pointer"
							onChange={handleFileUpload}
						/>
						<div className=" absolute bottom-2 right-0 z-10 cursor-pointer">
							<MdAddPhotoAlternate className="text-2xl" />
						</div>
					</div>

					<div className=" relative w-full ml-12 text-center cursor-pointer mt-4">
						<input
							type="file"
							onChange={handleFileUpload}
							className="text-[10px]"
						/>
					</div>
				</div>
				<div className=" w-full">
					<div className="w-full grid grid-cols-2 gap-4">
						<div className=" w-full ct-flex-start flex-col gap-y-2 ">
							<label
								htmlFor="userProfilePhoneNumber"
								className="w-full capitalize text-xs ct-flex-between"
							>
								<p>full name</p>
								<p className=" text-gbInactiveColor">{errorMessages}</p>
							</label>
							<input
								id="userProfilePhoneNumber"
								type="text"
								value={selectProfileFullName ?? ""}
								onChange={handleProfileFullName}
								className="w-full text-sm placeholder:text-xs bg-[#F6F6F6] rounded px-3 py-2 border focus:border-[#F68821] focus:outline-none placeholder:capitalize"
								placeholder="Md. Akib"
								title="Enter Your Phone Number (ex: Md. Akib)"
							/>
						</div>

						<div className=" w-full ct-flex-start flex-col gap-y-2 ">
							<label
								htmlFor="userAditionalPhoneNumber"
								className=" capitalize text-xs"
							>
								Aditional Phone Number
							</label>
							<input
								id="userAditionalPhoneNumber"
								type="text"
								value={selectProfileAditionalPhoneNumber ?? ""}
								onChange={handleAditionalProfilePhoneNumber}
								className="w-full text-sm placeholder:text-xs bg-[#F6F6F6] rounded px-3 py-2 border focus:border-[#F68821] focus:outline-none placeholder:capitalize"
								placeholder="01x00000000"
								title="Enter Your Phone Number (ex: 01315302640)"
							/>
						</div>

						<div className=" w-full ct-flex-start flex-col gap-y-2 col-span-2">
							<label htmlFor="userProfileEmail" className=" capitalize text-xs">
								Email
							</label>
							<input
								id="userProfileEmail"
								type="email"
								value={selectProfileEmail ?? ""}
								onChange={handleEmail}
								className="w-full text-sm placeholder:text-xs bg-[#F6F6F6] rounded px-3 py-2 border focus:border-[#F68821] focus:outline-none "
								placeholder="abc@gmail.com"
								title="Enter Your Phone Number (ex: abc@gmail.com)"
							/>
						</div>
					</div>
				</div>
				<div className="w-full lg:ct-grid-cols-3">
					<DivisionDropDown />
					<DistrictDropDown />
					<ThanaDropDown />
				</div>
				<div className=" w-full ct-flex-start flex-col gap-y-2 ">
					<label
						htmlFor="userProfileLocalAddress"
						className=" capitalize text-xs"
					>
						Local Address
					</label>
					<textarea
						id="userProfileLocalAddress"
						rows={3}
						cols={1}
						value={selectProfileLocalAddress ?? ""}
						onChange={handleLocalAddress}
						className="w-full text-sm placeholder:text-xs bg-[#F6F6F6] rounded px-3 py-2 border focus:border-[#F68821] focus:outline-none placeholder:capitalize"
						placeholder="House: 14, Road: 12, Baridhara, DOHS"
						title="Enter Your Phone Number (ex: House: 14, Road: 12, Baridhara, DOHS)"
					/>
				</div>
			</div>

			<div className=" ct-flex-start gap-x-5">
				<button
					onClick={handleSubmit}
					className=" capitalize text-sm text-white py-2 px-6 bg-gbPrimaryColor rounded-md cursor-pointer hover:text-black hover:bg-white hover:inner-border hover:inner-border-gbPrimaryColor smooth-animation-high"
				>
					save
				</button>
				<button
					onClick={handleUserProfileEdit}
					className="capitalize text-sm py-2 px-6 inner-border inner-border-gbPrimaryColor rounded-md cursor-pointer hover:text-white hover:bg-gbPrimaryColor smooth-animation-high"
				>
					cancel
				</button>
			</div>
		</div>
	);
};

export default UserProfileEdit;
