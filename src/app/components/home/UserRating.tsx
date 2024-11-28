import React from "react";
import StarRating from "../util/StarRating";
import Certificates from "../util/Certificates";
import ClientAvater from "../util/ClientAvater";
import { useTranslations } from "next-intl";

const UserRating = () => {
	// For multi-language
	const t = useTranslations("siteRating");
	return (
		<div className="bg-[#FFF9F3]">
			<div className="ct-container py-10">
				<div className="w-full text-center text-4xl">
					<div>
						<strong className="text-green-500">{t("raing-point")}</strong>
						<span className=" capitalize font-normal">&nbsp;{t("rating")}</span>
					</div>
				</div>
				<div className="my-2 text-2xl">
					<StarRating />
				</div>
				<div>
					<Certificates />
				</div>
				<div className="hidden lg:grid">
					<ClientAvater />
				</div>
			</div>
		</div>
	);
};

export default UserRating;
