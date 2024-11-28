import React from "react";
import FilterByCategory from "./FilterByCategory";
import FilterByStock from "./FilterByStock";
import FilterByPrice from "./FilterByPrice";
import { useTranslations } from "next-intl";

const FIlterProduct = () => {
	// For multi-language
	const t = useTranslations("sectionHead");
	return (
		<div className="ct-container hidden lg:flex md:flex-col w-full">
			<div className="rounded cursor-default">
				<h3 className="text-xl font-semibold capitalize">{t("filter")}</h3>
			</div>
			<div>
				{/* <FilterByCategory /> */}
				<FilterByPrice />
				<FilterByStock />
			</div>
		</div>
	);
};

export default FIlterProduct;
