"use client";
import React from "react";
import SectionHead from "./SectionHead";
import { useTranslations } from "next-intl";
import ShuffledProducts from "./ShuffledProducts";

const RelatedProduct = () => {
	// For multi-language
	const t = useTranslations("sectionHead");
	return (
		<div className="ct-container">
			<div>
				<div>
					<SectionHead headingText={t("related-products")} />
				</div>
				<div className="min-h-80">
					<ShuffledProducts />
				</div>
			</div>
		</div>
	);
};

export default RelatedProduct;
