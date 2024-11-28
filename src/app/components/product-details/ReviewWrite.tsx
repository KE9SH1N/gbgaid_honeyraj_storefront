import React from "react";
import CustomButton from "../util/CustomButton";
import { useTranslations } from "next-intl";

const ReviewWrite = () => {
	// For multi-language
	const t = useTranslations("reviewRating");
	const ts = useTranslations("sectionHead");
	return (
		<div className="ct-container">
			<div>
				<h4 className=" text-[#0B0B0B] font-semibold text-xl mb-4 capitalize">
					{ts("write-review")}
				</h4>
				<textarea
					className="bg-gbBgSecondaryWhite w-full py-7 px-10 placeholder:capitalize"
					name=""
					id=""
					cols={30}
					rows={5}
					placeholder={t("review-placeholder")}
				></textarea>
				<div className="bg-gbPrimaryColor w-[80%] md:w-[25%] py-4 my-4 text-sm text-center rounded capitalize text-white cursor-pointer">
					<CustomButton buttonText={t("submit-reivew")} />
				</div>
			</div>
		</div>
	);
};

export default ReviewWrite;
