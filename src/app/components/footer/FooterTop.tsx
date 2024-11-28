"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import LanguageDropdown from "../util/LanguageDropdown";
import { useBlockRightClick } from "../../lib/common/BlockRightClick";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { languageSelector } from "../../redux/features/intl/languageSlice";

const FooterTop: React.FC = () => {
	const dispatch = useDispatch();
	// Block Right Click
	const imageRef = useRef<HTMLDivElement>(null);
	useBlockRightClick(imageRef);
	const selectedLanguage = useSelector(languageSelector);

	// For multi-language
	const t = useTranslations("footerTop");
	return (
		<div className="bg-blackBg lg:mb-0">
			<div className="ct-container border-b border-footerMainBorderTop">
				<div className="ct-flex-between pt-6">
					<Link href={`/`}>
						<div ref={imageRef}>
							<Image
								src="/image/brand/honeyraj.png"
								alt="Footer Brand Logo"
								width={120}
								height={40}
								priority={true}
								onDragStart={(e) => e.preventDefault()}
							/>
						</div>
					</Link>
					<div className="">
						<LanguageDropdown
							textColor="white"
							borderColor="white"
							bgColor="black"
							dropdownopenColor="white"
						/>
					</div>
				</div>
				<div className="w-full md:ct-flex-between md:gap-x-32 lg:gap-x-36 xl:gap-x-72">
					<div className="md:w-[60%] xl:placeholder:w-[80%] text-footerMainText my-6 text-justify">
						<p>{t("short-desc-about-ghorerbazar")}</p>
					</div>
					<div className="hidden md:w-[40%] md:flex text-footerMainText capitalize md:ct-flex-between md:items-start">
						<div>
							<h3 className=" font-semibold capitalize mb-6">
								{t("customerSupport.customer-support-title")}
							</h3>
							<ul className=" font-light text-sm capitalize flex flex-col gap-y-3">
								<Link href={`/contact`}>
									<li>{t("customerSupport.contact")}</li>
								</Link>
								<Link href={`/faq`}>
									<li>{t("customerSupport.faq")}</li>
								</Link>
							</ul>
						</div>
						<div>
							<h3 className=" font-semibold capitalize mb-6">
								{t("aboutUs.about-us")}
							</h3>
							<ul className=" font-light text-sm capitalize flex gap-y-3">
								<Link href={`/about`}>
									<li>{t("aboutUs.about-us")}</li>
								</Link>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FooterTop;
