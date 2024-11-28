"use client";
import React from "react";
import CustomButton from "../util/CustomButton";
import { FaArrowUp } from "react-icons/fa6";
import { useTranslations } from "next-intl";

const BacktotopButton: React.FC = () => {
	const scrollTop = () => {
		const scrollStep = window.scrollY / 25;
		const scrollInterval = setInterval(() => {
			if (window.scrollY !== 0) {
				window.scrollBy(0, -scrollStep);
			} else {
				clearInterval(scrollInterval);
			}
		}, 15);
	};

	// For multi-language
	const t = useTranslations("footerButtons");

	return (
		<div className="ct-container  my-6 cursor-pointer relative md:hidden">
			<div className=" absolute left-[25%] top-[25%] sm:left-[30%]">
				<FaArrowUp className="text-xl text-white" />
			</div>
			<div
				onClick={scrollTop}
				className="ct-flex-center bg-gbPrimaryColor py-2 text-[14px] w-full rounded capitalize text-white"
			>
				<CustomButton buttonText={t("back-to-top")} />
			</div>
		</div>
	);
};

export default BacktotopButton;
