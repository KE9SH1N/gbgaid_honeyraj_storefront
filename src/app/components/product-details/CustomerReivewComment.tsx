import React from "react";
import Image from "next/image";
import StarRating from "../util/StarRating";
import { useTranslations } from "next-intl";

const CustomerReivewComment = () => {
	// For multi-language
	const t = useTranslations("customerComment");
	return (
		<div className="ct-container py-6">
			<div className="border-b border-borderLine">
				<div className="ct-flex-start flex-row gap-x-2">
					<div>
						<Image src="/image/Review-user.svg" alt="" width={46} height={46} />
					</div>
					<div>
						<p className=" font-medium text-lg">{t("user-name")}</p>
						<div>
							<div className="ct-flex-start text-xs gap-x-2 items-center">
								<StarRating />
								<span>{t("rating")}</span>
								<span>/</span>
								<span>{t("time")}</span>
							</div>
						</div>
					</div>
				</div>
				<p className="text-justify py-4">{t("comment")}</p>
			</div>
		</div>
	);
};

export default CustomerReivewComment;
