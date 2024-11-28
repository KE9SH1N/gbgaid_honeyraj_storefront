import React from "react";
import StarRating from "./StarRating";
import { useTranslations } from "next-intl";

const AvgRating = () => {
	// For multi-language
	const t = useTranslations("avgRating");
	return (
		<div className="my-2">
			<p>{t("title")}</p>
			<div className="ct-flex-start flex-col md:flex-row gap-x-4 mt-2">
				<div className="ct-flex-start gap-2">
					<span className=" font-semibold text-xl">{t("rating-point")}</span>
					<div className="text-2xl">
						<StarRating />
					</div>
				</div>
				<p className=" font-medium text-xs text-[#CCCCCC] pt-1">
					{t("rating-text")}
				</p>
			</div>
		</div>
	);
};

export default AvgRating;
