import React from "react";
import FIlterProduct from "../../components/shop/FIlterProduct";
import ShopBanner from "../../components/hero/ShopBanner";
import FilteredProductCard from "../../components/shop/FilteredProductCard";
import FilterProductMobile from "../../components/shop/FilterProductMobile";
import FooterMain from "../../components/footer/FooterMain";
import GlobalLayout from "../../global-layout/GlobalLayout";

const page = () => {
	return (
		<div>
			<GlobalLayout>
				<div className="ct-container mb-5">
					<div className="w-full ct-flex-start lg:gap-x-4 min-h-screen relative">
						<div className="lg:w-[20%] sticky top-[155px] max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gbCustomScrollThumbColor scrollbar-track-[#FEF3E9]">
							<FIlterProduct />
						</div>
						<div className="w-full lg:w-[80%]">
							<ShopBanner />
							<div className="lg:hidden my-4">
								<FilterProductMobile />
							</div>
							<div>
								<FilteredProductCard />
							</div>
						</div>
					</div>
				</div>
				<div className="mb-[50px] lg:mb-0">
					<FooterMain />
				</div>
			</GlobalLayout>
		</div>
	);
};

export default page;
