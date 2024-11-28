"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { MdOutlineEmail } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import CategoryDropdown from "./CategoryDropdown";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { languageSelector } from "../../redux/features/intl/languageSlice";

const NavMenu: React.FC = () => {
	const pathname = usePathname();

	const selectedLanguage = useSelector(languageSelector);

	// For multi-language
	const t = useTranslations("navigationMenu");

	return (
		<nav className="bg-componentBg font-Roboto font-light text-sm hidden lg:block my-5">
			<div className="ct-container ct-flex-between xl:ct-grid-cols3-span2 ">
				<div className="xl:col-span-2 ct-flex-start">
					<CategoryDropdown />
					<ul className="ct-flex-start capitalize font-medium gap-4 py-3">
						<li>
							<Link
								href={`/`}
								className={`link ${
									pathname === `/`
										? "border-gbPrimaryColor"
										: "md:border-transparent"
								} py-[14px] px-2 border-b-2 rounded-md md:rounded-none md:border-solid hover:border-gbPrimaryColor smooth-animation-mid`}
							>
								{t("home")}
							</Link>
						</li>
						<li>
							<Link
								href={`/products`}
								className={`link ${
									pathname === `/products`
										? "border-gbPrimaryColor"
										: "md:border-transparent"
								} py-[14px] px-2 border-b-2 rounded-md md:rounded-none md:border-solid hover:border-gbPrimaryColor smooth-animation-mid`}
							>
								{t("shop")}
							</Link>
						</li>
						<li>
							<Link
								href={`/about`}
								className={`link ${
									pathname === `/about`
										? "border-gbPrimaryColor"
										: "md:border-transparent"
								} py-[14px] px-2 border-b-2 rounded-md md:rounded-none md:border-solid hover:border-gbPrimaryColor smooth-animation-mid`}
							>
								{t("about-us")}
							</Link>
						</li>
						<li>
							<Link
								href={`/contact`}
								className={`link ${
									pathname === `/contact`
										? "border-gbPrimaryColor"
										: "md:border-transparent"
								} py-[14px] px-2 border-b-2 rounded-md md:rounded-none md:border-solid hover:border-gbPrimaryColor smooth-animation-mid`}
							>
								{t("contact-us")}
							</Link>
						</li>
					</ul>
				</div>

				<div>
					<ul className="ct-flex-between overflow-hidden py-3">
						<li>
							<div className="flex flex-row gap-x-2">
								<span className="flex items-center font-medium">
									contact@ghorerbazar.com
								</span>
								<MdOutlineEmail className="text-2xl" />
							</div>
						</li>

						<li className="">
							<div className="flex flex-row items-center gap-x-2">
								<span className=" font-medium">
									{t("customer-support-number")}
								</span>
								<IoCallOutline className="text-2xl" />
							</div>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default NavMenu;
