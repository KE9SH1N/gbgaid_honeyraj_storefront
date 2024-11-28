import React from "react";
import { FaCartArrowDown } from "react-icons/fa";
import Link from "next/link";
import CustomButton from "../util/CustomButton";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { closeCart } from "../../redux/features/checkout/cartSlice";
import { languageSelector } from "../../redux/features/intl/languageSlice";

const EmptyCart = () => {
	const dispatch = useDispatch();
	// For multi-language
	const t = useTranslations("emptyCart");

	const selectedLanguage = useSelector(languageSelector);

	const handleCloseCart = () => {
		dispatch(closeCart());
	};
	return (
		<div className="relative">
			<div className="ct-flex-center w-full flex-col gap-y-4 absolute top-0 left-0 translate-y-[70%] lg:translate-y-full z-10">
				<div>
					<FaCartArrowDown className=" text-6xl text-gbPrimaryColor" />
				</div>
				<strong className="capitalize">{t("empty")}</strong>
				<Link
					href={`/`}
					onClick={handleCloseCart}
					className=" capitalize bg-gbPrimaryColor py-4 rounded text-white shadow-md"
				>
					<div className=" w-52 text-center">
						<CustomButton buttonText={t("empty-button")} />
					</div>
				</Link>
			</div>
		</div>
	);
};

export default EmptyCart;
