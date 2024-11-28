import React from "react";
import SectionHead from "./SectionHead";
import ShuffledProducts from "./ShuffledProducts";
import { useTranslations } from "next-intl";

const YouMayLike = () => {
	// For multi-language
	const t = useTranslations("sectionHead");
	return (
		<div>
			<div className="ct-container my-8">
				<div>
					<SectionHead headingText={t("you-may-like")} />
				</div>
				<div className="min-h-80">
					<ShuffledProducts />
				</div>
			</div>
		</div>
	);
};

export default YouMayLike;
