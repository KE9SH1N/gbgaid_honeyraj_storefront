"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import CustomButton from "../util/CustomButton";
import { HiMiniArrowUpRight } from "react-icons/hi2";
import { useBlockRightClick } from "../../lib/common/BlockRightClick";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { languageSelector } from "../../redux/features/intl/languageSlice";

const HeroBannar: React.FC = () => {
	// For multi-language
	const t = useTranslations("heroBannarButtons");

	const selectedLanguage = useSelector(languageSelector);
	// Block Right Click
	const imageRef = useRef<HTMLDivElement>(null);
	useBlockRightClick(imageRef);
	return (
		<div className="hidden w-full lg:block hover:cursor-pointer overflow-hidden relative">
			<Link href={`/products/mango-himsargor-10kg`}>
				<div ref={imageRef}>
					<Image
						src="/image/hero_slider/mango-bannar.webp"
						alt=""
						width={526}
						height={750}
						onDragStart={(e) => e.preventDefault()}
					/>
				</div>
			</Link>
			<div className="w-[40%] absolute top-[75%] left-[30%]">
				<Link href={`/products`}>
					<div className="bg-gbPrimaryColor py-2 w-full ct-flex-center gap-x-2 rounded capitalize text-white relative">
						<CustomButton buttonText={t("view-all")} />
						<HiMiniArrowUpRight className="text-xl" />
					</div>
				</Link>
			</div>
		</div>
	);
};

export default HeroBannar;
