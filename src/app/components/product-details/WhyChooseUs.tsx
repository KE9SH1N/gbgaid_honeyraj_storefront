"use client";
import React from "react";
import Image from "next/image";
import SectionHead from "../util/SectionHead";
import { useTranslations } from "next-intl";

const WhyChooseUs = () => {
	// For multi-language
	const t = useTranslations("whyGhorerBazar");
	const ts = useTranslations("sectionHead");
	return (
		<div className="ct-container">
			<div>
				<SectionHead headingText={ts("why-choose-us")} />
			</div>
			<div className="ct-flex-center flex-col lg:flex-row md:ct-grid-cols-3 gap-4 my-4 border border-borderLine rounded lg:border-none">
				<div className="lg:border lg:border-borderLine px-4 pt-5 pb-9 lg:ct-flex-center lg:items-start text-justify flex-col md:gap-y-2 rounded-xl">
					<div className="md:mx-auto w-[64px] h-[64px] mb-5 md:mb-0 lg:w-[120px] lg:h-[120px]">
						<Image
							src="/image/product-details-image/money-back.svg"
							alt="choose us image 1"
							width={120}
							height={120}
							onDragStart={(e) => e.preventDefault()}
						></Image>
					</div>
					<div className="flex flex-col gap-y-2">
						<div className=" capitalize text-gbPrimaryColor font-semibold text-sm">
							<h4>{t("reasonOne.title")}</h4>
						</div>
						<div className=" capitalize text-xs xl:w-80 xl:h-20">
							<p>{t("reasonOne.des")}</p>
						</div>
					</div>
				</div>
				<div className="lg:border lg:border-borderLine px-4 pt-5 pb-9 lg:ct-flex-center lg:items-start text-justify flex-col md:gap-y-2 rounded-xl">
					<div className="md:mx-auto w-[64px] h-[64px] mb-5 md:mb-0 lg:w-[120px] lg:h-[120px]">
						<Image
							src="/image/product-details-image/free-shipping.svg"
							alt="choose us image 1"
							width={120}
							height={120}
							onDragStart={(e) => e.preventDefault()}
						></Image>
					</div>
					<div className="flex flex-col gap-y-2">
						<div className=" capitalize text-gbPrimaryColor font-semibold text-sm">
							<h4>{t("reasonTwo.title")}</h4>
						</div>
						<div className=" capitalize text-xs xl:w-80 xl:h-20">
							<p>{t("reasonTwo.des")}</p>
						</div>
					</div>
				</div>
				<div className="lg:border lg:border-borderLine px-4 pt-5 pb-9 lg:ct-flex-center lg:items-start text-justify flex-col md:gap-y-2 rounded-xl">
					<div className="md:mx-auto w-[64px] h-[64px] mb-5 md:mb-0 lg:w-[120px] lg:h-[120px]">
						<Image
							src="/image/product-details-image/happy-customer.svg"
							alt="choose us image 1"
							width={120}
							height={120}
							onDragStart={(e) => e.preventDefault()}
						></Image>
					</div>
					<div className="flex flex-col gap-y-2">
						<div className=" capitalize text-gbPrimaryColor font-semibold text-sm">
							<h4>{t("reasonThree.title")}</h4>
						</div>
						<div className=" capitalize text-xs xl:w-80 xl:h-20">
							<p>{t("reasonThree.des")}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WhyChooseUs;
