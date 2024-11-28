"use client";
import React, { useRef, useState } from "react";
import CustomButton from "../util/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { closeSidebar } from "../../redux/features/util/sidebarSlice";
import { IoIosGlobe } from "react-icons/io";
import Link from "next/link";
import { RxCross2 } from "react-icons/rx";
import { BiSupport } from "react-icons/bi";
import { useTranslations } from "next-intl";
import useLanguageChange from "../../hooks/useLanguageChange";
import { languageSelector } from "../../redux/features/intl/languageSlice";
import UseOutsideClickAndEscape from "../../hooks/useDropdown";
import { handleLogout } from "../../lib/common/Logout";
import { useRouter } from "next/navigation";
import { selectUserDetailsData } from "../../redux/features/auth/userDetailsSlice";
import SideMenuProductCategory from "../category/SideMenuProductCategory";
import { IoCallOutline, IoCopyOutline } from "react-icons/io5";
import { MdMenuOpen } from "react-icons/md";

const MobileSidebar: React.FC = () => {
	const dispatch = useDispatch();
	const handleCloseSidebar = () => {
		dispatch(closeSidebar());
	};
	const router = useRouter();
	const handleLanguageChange = useLanguageChange();
	const selectedLanguage = useSelector(languageSelector);

	const [isDropdownopen, setDropdownopen] = useState<boolean>(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Custom hook for dropdown ref
	UseOutsideClickAndEscape(dropdownRef, setDropdownopen);

	// For multi-language
	const t = useTranslations("mobileMenu");
	const ts = useTranslations("navigationMenu");

	const token = localStorage.getItem("accessToken");

	const [buttonText, setButtonText] = useState("copy");
	const [telLink, setTelLink] = useState("tel:09642922922");
	const handleCopy = () => {
		const textToCopy = t("support.cs-number");
		navigator.clipboard
			.writeText(textToCopy)
			.then(() => {
				setButtonText("copied!");
				setTimeout(() => setButtonText("copy"), 5000);
			})
			.catch((err) => {
				console.error("Failed to copy text: ", err);
			});
	};

	const handleCallClick = () => {
		window.location.href = telLink;
		setTelLink("");
		setTimeout(() => {
			setTelLink("tel:09642922922");
		}, 1000);
	};

	return (
		<div className="lg:hidden relative">
			<div
				className={` w-full absolute ct-flex-start flex-col top-0 left-0 z-10 min-h-screen bg-white`}
			>
				{/* sidebar Component  */}
				<div className="w-full ct-flex-start flex-col">
					<div className="w-full py-3 border-b border-b-borderLine">
						<div className="w-full ct-flex-between capitalize px-4">
							<div className="ct-flex-between gap-x-5">
								<div className="ct-flex-start items-center gap-x-2">
									<IoIosGlobe className=" text-xl" />
									<h3 className=" text-lg font-medium w-20">
										{t("language.title")}
									</h3>
								</div>
								<div>
									<button
										className={`capitalize py-1 w-10 text-xs ${
											selectedLanguage === "en"
												? "bg-gbActiveColor text-white"
												: "bg-borderLine"
										}  rounded-l`}
										onClick={() => handleLanguageChange("en")}
									>
										{t("language.eng")}
									</button>
									<button
										className={`capitalize py-1 w-10 text-xs ${
											selectedLanguage === "bn"
												? "bg-gbActiveColor text-white"
												: "bg-borderLine"
										} rounded-r`}
										onClick={() => handleLanguageChange("bn")}
									>
										{t("language.bn")}
									</button>
								</div>
							</div>
							<button onClick={handleCloseSidebar}>
								<RxCross2 className="text-2xl" />
							</button>
						</div>
					</div>

					{/* Category Section  */}
					{/* <div className=" w-full ">
						<SideMenuProductCategory />
					</div> */}

					<div className="w-full px-4 py-4 border-b border-b-borderLine">
						<h3 className="ct-flex-start items-center gap-x-2 rounded px-1 py-2 bg-gbPrimaryColor text-white">
							<MdMenuOpen className="text-xl" />
							<span className="w-full text-sm font-medium uppercase">
								{ts("mobile-menu")}
							</span>
						</h3>
						<ul className="pt-2 flex flex-col gap-y-2 h-40 overflow-y-auto capitalize">
							<li className="w-full px-2 text-sm rounded py-1 bg-componentBg">
								<Link
									href={`/`}
									className="ct-flex-between"
									onClick={handleCloseSidebar}
								>
									<span>{ts("home")}</span>
								</Link>
							</li>
							<li className="w-full px-2 text-sm rounded py-1 bg-componentBg">
								<Link
									href={`/products`}
									onClick={handleCloseSidebar}
									className="ct-flex-between"
								>
									<span>{ts("shop")}</span>
								</Link>
							</li>

							<li className="w-full px-2 text-sm rounded py-1 bg-componentBg">
								<Link
									href={`/about`}
									onClick={handleCloseSidebar}
									className="ct-flex-between"
								>
									<span>{ts("about-us")}</span>
								</Link>
							</li>

							<li className="w-full px-2 text-sm rounded py-1 bg-componentBg">
								<Link
									href={`/contact`}
									onClick={handleCloseSidebar}
									className="ct-flex-between"
								>
									<span>{ts("contact-us")}</span>
								</Link>
							</li>
						</ul>
					</div>

					{/* support section  */}

					<div className="w-full py-2">
						<div className="p-4">
							<div className="ct-flex-start items-center gap-x-2 capitalize font-medium">
								<BiSupport className="text-2xl" />
								<span>{t("support.title")}</span>
								<span className="text-green-500">{t("support.24/7")}</span>
							</div>
							<div className="pt-2 ct-flex-start flex-col gap-y-2">
								<p className="text-sm">{t("support.support-email")}</p>
								<div className="ct-flex-start items-center flex-row gap-x-2">
									<span className=" bg-gbCustomScrollThumbColor text-sm w-fit rounded px-2 py-[2px]">
										{t("support.cs-number")}
									</span>
									<div className="ct-flex-start flex-row gap-x-3">
										<button
											onClick={handleCallClick}
											className="flex items-center gap-x-1 border border-gray-300 px-2 py-[2px] rounded text-green-500"
										>
											<IoCallOutline className="text-sm" />
											{selectedLanguage === "bn" ? (
												<span className="capitalize text-xs">কল</span>
											) : (
												<span className="capitalize text-xs">Call</span>
											)}
										</button>
										<button
											onClick={handleCopy}
											className={`ct-flex-center gap-x-1 border  ${
												buttonText === "copied!"
													? "border-gbActiveColor"
													: "border-gray-300"
											} px-2 py-[2px] rounded text-slate-400`}
										>
											<IoCopyOutline
												className={`text-sm ${
													buttonText === "copied!"
														? "text-gbActiveColor"
														: "text-slate-400"
												}`}
											/>

											<span
												className={`capitalize text-xs ${
													buttonText === "copied!"
														? "text-gbActiveColor"
														: "text-slate-400"
												}`}
											>
												{buttonText}
											</span>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* about us menu  */}
					{/* <div className="w-full">
						<ul className="w-[90%] xs:w-[80%] md:w-[60%] py-2 ct-flex-center gap-x-2 mx-auto">
							<li className="w-full px-2 text-sm rounded py-1 border border-gbPrimaryColor bg-componentBg">
								<Link
									href={`/about`}
									onClick={handleCloseSidebar}
									className="w-full ct-flex-center"
								>
									<span>{ts("about-us")}</span>
								</Link>
							</li>

							<li className="w-full px-2 text-sm rounded py-1 border border-gbPrimaryColor bg-componentBg">
								<Link
									href={`/contact`}
									onClick={handleCloseSidebar}
									className="w-full ct-flex-center"
								>
									<span className="text-center">{ts("contact-us")}</span>
								</Link>
							</li>
						</ul>
					</div> */}
				</div>

				{/* login button  */}
				<div className={`w-full flex-shrink-0`} ref={dropdownRef}>
					{token ? (
						// <div
						// 	className="relative"
						// 	onClick={() => setDropdownopen((prev) => !prev)}
						// >
						// 	<div className=" py-3 px-4 bg-gbPrimaryColor ct-flex-between z-50 relative">
						// 		<p className=" text-white text-sm capitalize">
						// 			{userData?.name}
						// 		</p>
						// 		<div>
						// 			{isDropdownopen ? (
						// 				<span>
						// 					<MdOutlineKeyboardArrowDown className=" text-2xl text-white" />
						// 				</span>
						// 			) : (
						// 				<span>
						// 					<MdOutlineKeyboardArrowUp className=" text-2xl text-white" />
						// 				</span>
						// 			)}
						// 		</div>
						// 	</div>
						// 	<ul
						// 		className={` w-full bg-[#fef0d6] flex flex-col items-start smooth-animation overflow-hidden z-40 capitalize ${
						// 			!isDropdownopen
						// 				? "translate-y-0 absolute -bottom-5 opacity-0 pointer-events-none left-0"
						// 				: "translate-y-full absolute bottom-[136px] opacity-100 left-0"
						// 		} `}
						// 	>
						// 		<li
						// 			className="w-full py-3 px-4 text-sm text-[#333333] "
						// 			onClick={() => {
						// 				router.push(`/auth/profile`);
						// 				handleCloseSidebar();
						// 			}}
						// 		>
						// 			Profile
						// 		</li>
						// 		<hr className="w-full border-t border-white" />
						// 		<li
						// 			className=" w-full py-3 px-4 text-sm text-[#333333]"
						// 			onClick={() => {
						// 				handleLogout();
						// 				handleCloseSidebar();
						// 				window.location.href = `/`;
						// 			}}
						// 		>
						// 			logout
						// 		</li>
						// 	</ul>
						// </div>
						<div
							onClick={() => {
								handleLogout();
								handleCloseSidebar();
								window.location.href = `/`;
							}}
							className="w-[40%] capitalize py-2 border border-gbPrimaryColor rounded text-center mx-auto"
						>
							<span className="text-gbPrimaryColor">logout</span>
						</div>
					) : (
						<div className="ct-flex-evenly py-2 pb-4">
							<button className="ct-flex-center w-[45%] inner-border inner-border-gbPrimaryColor py-2 rounded capitalize text-sm font-medium text-gbPrimaryColor">
								<CustomButton buttonText={t("button.create-accout")} />
							</button>
							<Link
								onClick={handleCloseSidebar}
								href={`/auth/login`}
								className="ct-flex-center w-[45%] text-sm bg-gbPrimaryColor py-2 rounded capitalize text-white"
							>
								<CustomButton buttonText={t("button.login")} />
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default MobileSidebar;
