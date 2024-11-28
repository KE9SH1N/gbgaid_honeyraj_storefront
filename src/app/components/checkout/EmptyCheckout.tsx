import React from "react";
import CustomButton from "../util/CustomButton";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { languageSelector } from "../../redux/features/intl/languageSlice";

const EmptyCheckout = () => {
	const dispatch = useDispatch();
	const selectedLanguage = useSelector(languageSelector);
	// For multi-language
	const t = useTranslations("emptyCart");
	return (
		<div className="ct-container ct-flex-center flex-col lg:min-h-[72.3vh]">
			<div className="w-[50%] lg:w-full">
				<Image
					src="/image/empty-cart.svg"
					alt="Empty Cart"
					width={362}
					height={355}
					className="mx-auto"
					onDragStart={(e) => e.preventDefault()}
				/>
			</div>
			<div className="w-full py-10">
				<p className=" lg:text-4xl text-[#cecece] capitalize text-center">
					{t("empty-checkout")}
				</p>
			</div>
			<Link
				href={`/`}
				className=" capitalize bg-gbPrimaryColor py-4 rounded text-white shadow-md"
			>
				<div className=" w-52 text-center">
					<CustomButton buttonText={t("empty-button")} />
				</div>
			</Link>
		</div>
	);
};

export default EmptyCheckout;
