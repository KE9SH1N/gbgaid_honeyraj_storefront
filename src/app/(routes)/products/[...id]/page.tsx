import BrandService from "../../../components/home/BrandService";
import BreadCrumb from "../../../components/product-details/BreadCrumb";
import SingleProductDetails from "../../../components/product-details/SingleProductDetails";
import WhyChooseUs from "../../../components/product-details/WhyChooseUs";
import React from "react";
import RelatedProduct from "../../../components/util/RelatedProduct";
import FooterMain from "../../../components/footer/FooterMain";
import GlobalLayout from "../../../global-layout/GlobalLayout";
import ProductInfoTabMobile from "../../../components/product-details/ProductInfoTabMobile";

const page = () => {
	return (
		<div>
			<GlobalLayout>
				<div>
					<BreadCrumb />
					<SingleProductDetails />
					<ProductInfoTabMobile />
					<RelatedProduct />
					<WhyChooseUs />
					<BrandService />
					<div className="mb-[100px] lg:mb-0">
						<FooterMain />
					</div>
				</div>
			</GlobalLayout>
		</div>
	);
};

export default page;
