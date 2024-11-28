import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import CustomButton from "./CustomButton";
import { useTranslations } from "next-intl";

const BackToHome = () => {
	// For multi-language
	const t = useTranslations("confirmOrder");
	return (
		<div>
			<div className="w-[70%] md:w-[40%] lg:w-1/4 my-12 cursor-pointer relative mx-auto">
				<Link href="/">
					<div className=" absolute left-[25%] top-[22%] sm:left-[20%]">
						<FaArrowLeft className="text-xl text-white" />
					</div>
					<div className="ct-flex-center bg-gbPrimaryColor hover:bg-gbPrimaryHoverColor py-2 text-[14px] w-full rounded capitalize text-white smooth-animation-mid">
						<CustomButton buttonText={t("button")} />
					</div>
				</Link>
			</div>
		</div>
	);
};

export default BackToHome;
