"use client";
import React, { useRef, useState } from "react";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import { useTranslations } from "next-intl";
import UseOutsideClickAndEscape from "../../hooks/useDropdown";
import { languageSelector } from "../../redux/features/intl/languageSlice";
import Image from "next/image";
import { handleLogout } from "../../lib/common/Logout";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { selectUserDetailsData } from "../../redux/features/auth/userDetailsSlice";
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";

const UserAccountDropdown = () => {
	const dispatch = useDispatch();
	const [isDropdownopen, setDropdownopen] = useState<boolean>(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const selectedLanguage = useSelector(languageSelector);
	const token = localStorage.getItem("accessToken");

	// Custom hook for dropdown ref
	UseOutsideClickAndEscape(dropdownRef, setDropdownopen);

	const toggleDropdownCategory = () => {
		setDropdownopen(!isDropdownopen);
	};

	// For multi-language
	const t = useTranslations("allCategory");
	const userData = useSelector(selectUserDetailsData);

	const maxLength = 6;
	const truncateName = (name: string, maxLength: number) => {
		if (name?.length > maxLength) {
			return name.slice(0, maxLength) + "...";
		}
		return name;
	};

	return (
		<div>
			<div className="gap-4 py-3" ref={dropdownRef}>
				<div className=" cursor-pointer" onClick={toggleDropdownCategory}>
					{token ? (
						<div className="ct-flex-between text-gbPrimaryColor">
							<p className="capitalize">
								{truncateName(userData?.name, maxLength)}
							</p>
							<div>
								<span>
									<MdOutlineKeyboardArrowDown
										className={`${
											isDropdownopen ? "" : " rotate-180"
										} smooth-animation-mid text-2xl text-gbPrimaryColor`}
									/>
								</span>
							</div>
						</div>
					) : (
						<div>
							<FaRegCircleUser className="text-2xl text-gbSecondaryActiveColor" />
						</div>
						// <Image
						// 	src="/image/User Profile.svg"
						// 	alt="User Icon"
						// 	width={36}
						// 	height={36}
						// />
					)}
				</div>
				<div className="w-full relative">
					{token ? (
						<ul
							className={` w-28 absolute bg-white top-2 xl:left-0 lg:left-0 flex flex-col items-start rounded z-40 smooth-animation-mid overflow-hidden border border-gbPrimaryColor capitalize ${
								isDropdownopen
									? "  opacity-100"
									: " pointer-events-none opacity-0"
							} `}
						>
							<Link
								onClick={() => setDropdownopen(false)}
								href={`/auth/profile`}
								className="w-full p-2 text-xs hover:text-[#ffffff] hover:bg-gbPrimaryColor hover:opacity-90 smooth-animation-mid "
							>
								<li>Profile</li>
							</Link>
							<div
								onClick={() => {
									window.location.href = "/";
									setDropdownopen(false);
									handleLogout();
								}}
								className="w-full p-2 text-xs hover:text-[#ffffff] hover:bg-gbPrimaryColor hover:opacity-90 smooth-animation-mid cursor-pointer"
							>
								<li>
									{selectedLanguage === "bn" ? (
										<span>লগআউট</span>
									) : (
										<span>logout</span>
									)}
								</li>
							</div>
						</ul>
					) : (
						<ul
							className={` w-28 absolute bg-white top-2 xl:left-0 lg:left-0 flex flex-col items-start rounded z-40 smooth-animation overflow-hidden border border-gbPrimaryColor capitalize ${
								isDropdownopen ? "  opacity-100" : "hidden opacity-0"
							} `}
						>
							<Link
								onClick={() => setDropdownopen(false)}
								href={`/auth/login`}
								className="w-full p-2 text-xs hover:text-black hover:bg-gbPrimaryColor hover:opacity-90 smooth-animation-mid "
							>
								<li>
									{selectedLanguage === "bn" ? <li>লগইন</li> : <li>Login</li>}
								</li>
							</Link>

							<Link
								onClick={() => setDropdownopen(false)}
								href={`/auth/registration`}
								className="w-full p-2 text-xs hover:text-black hover:bg-gbPrimaryColor hover:opacity-90 smooth-animation-mid "
							>
								<li>
									{selectedLanguage === "bn" ? (
										<li>রেজিস্টার</li>
									) : (
										<li>register</li>
									)}
								</li>
							</Link>
						</ul>
					)}
				</div>
			</div>
		</div>
	);
};

export default UserAccountDropdown;
