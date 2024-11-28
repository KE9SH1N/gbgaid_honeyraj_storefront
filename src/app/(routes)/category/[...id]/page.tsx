import ProductCardByCategory from "../../../components/category/ProductCardByCategory";
import FooterMain from "../../../components/footer/FooterMain";
import ShopBanner from "../../../components/hero/ShopBanner";
import React from "react";
import GlobalLayout from "../../../global-layout/GlobalLayout";

const page = () => {
	return (
		<div>
			<GlobalLayout>
				<div className="ct-container">
					<ShopBanner />
				</div>
				<ProductCardByCategory />
				<div className="mb-12 lg:mb-0">
					<FooterMain />
				</div>
			</GlobalLayout>
		</div>
	);
};

export default page;
