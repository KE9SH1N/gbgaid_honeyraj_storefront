import { useTranslations } from "next-intl";
import React from "react";

const ComingSoon = () => {
	// For multi-language
	const t = useTranslations("comingSoon");
	return (
		<div>
			<div className="ct-container ct-flex-center flex-col space-y-6 h-[71.3vh] text-center capitalize">
				<h2 className=" text-6xl lg:text-9xl text-gbPrimaryColor font-bold">
					{t("coming-soon")}
				</h2>
				<p className="text-2xl lg:text-4xl font-medium">{t("sub-title")}</p>
				<p>{t("description")}</p>
			</div>
		</div>
	);
};

export default ComingSoon;
