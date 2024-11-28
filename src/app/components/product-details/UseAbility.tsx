import { useTranslations } from "next-intl";
import React from "react";
import { useSelector } from "react-redux";
import { selectProductDetailsData } from "../../redux/features/product/productdetailsSlice";
import { languageSelector } from "../../redux/features/intl/languageSlice";

const UseAbility = () => {
	// Product details Selector
	const productDetailsData = useSelector(selectProductDetailsData);

	// Language selector
	const selectedLanguage = useSelector(languageSelector);
	return (
		<div className="w-full">
			<div
				className="ql-editor text-sm lg:text-base"
				dangerouslySetInnerHTML={{
					__html: productDetailsData?.useability_en,
				}}
			/>
		</div>
	);
};

export default UseAbility;
