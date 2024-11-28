import { useTranslations } from "next-intl";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	selectActiveProductDetailsTab,
	setActiveProductDetailsTab,
} from "../../redux/features/product/productDetailsTabsSlice";
import ProductDescription from "./ProductDescription";
import HealthBenifits from "./HealthBenifits";
import UseAbility from "./UseAbility";
import SideEffect from "./SideEffect";
import ProductReivew from "./ProductReivew";
import { selectProductDetailsData } from "../../redux/features/product/productdetailsSlice";
import ProductDescriptionLoader from "./loader/ProductDescriptionLoader";
import ProductCertificates from "./ProductCertificates";

const ProductInfoTab = () => {
	const dispatch = useDispatch();
	const activeProductDetailsTab = useSelector(selectActiveProductDetailsTab);
	const productData = useSelector(selectProductDetailsData);
	const healthBenifitsData = productData?.health_benefits;

	const handleResidentClick = (tabName: string) => {
		dispatch(setActiveProductDetailsTab(tabName));
	};
	// For multi-language
	const t = useTranslations("productDetailsTab");

	const renderProductDetailsTab = () => {
		if (activeProductDetailsTab === "About") {
			return <ProductDescription />;
		} else if (activeProductDetailsTab === "HealthBenifits") {
			return <HealthBenifits />;
		} else if (activeProductDetailsTab === "Useability") {
			return <UseAbility />;
		} else if (activeProductDetailsTab === "SideEffect") {
			return <SideEffect />;
		} else if (activeProductDetailsTab === "Certification") {
			return <ProductCertificates />;
		} else if (activeProductDetailsTab === "Review") {
			return <ProductReivew />;
		} else {
			return;
		}
	};

	//Loading Animation
	if (!productData) {
		return (
			<div>
				<ProductDescriptionLoader />
			</div>
		);
	}

	return (
		<div>
			<div>
				<ul className="w-full capitalize md:ct-flex-start lg:py-4 text-center lg:font-semibold text-xs ct-grid-cols-3 gap-x-0">
					<li
						onClick={() => handleResidentClick("About")}
						className={`w-full py-4 border-b-2 ${
							activeProductDetailsTab === "About"
								? "border-gbPrimaryColor bg-[#FEF3E9]"
								: ""
						} cursor-pointer smooth-animation-mid`}
					>
						{t("about")}
					</li>
					{healthBenifitsData.length > 0 && (
						<li
							onClick={() => handleResidentClick("HealthBenifits")}
							className={`w-full py-4 border-b-2 ${
								activeProductDetailsTab === "HealthBenifits"
									? "border-gbPrimaryColor bg-[#FEF3E9]"
									: ""
							} cursor-pointer smooth-animation-mid`}
						>
							{t("health-benifits")}
						</li>
					)}

					<li
						onClick={() => handleResidentClick("Useability")}
						className={`w-full py-4 border-b-2 ${
							activeProductDetailsTab === "Useability"
								? "border-gbPrimaryColor bg-[#FEF3E9]"
								: ""
						} cursor-pointer smooth-animation-mid`}
					>
						{t("usability")}
					</li>

					<li
						onClick={() => handleResidentClick("SideEffect")}
						className={`w-full py-4 border-b-2 ${
							activeProductDetailsTab === "SideEffect"
								? "border-gbPrimaryColor bg-[#FEF3E9]"
								: ""
						} cursor-pointer smooth-animation-mid`}
					>
						{t("side-effect")}
					</li>

					{productData?.certification_en !== null && (
						<li
							onClick={() => handleResidentClick("Certification")}
							className={`w-full py-4 border-b-2 ${
								activeProductDetailsTab === "Certification"
									? "border-gbPrimaryColor bg-[#FEF3E9]"
									: ""
							} cursor-pointer smooth-animation-mid`}
						>
							{t("certificates")}
						</li>
					)}

					<li
						onClick={() => handleResidentClick("Review")}
						className={`w-full py-4 border-b-2 ${
							activeProductDetailsTab === "Review"
								? "border-gbPrimaryColor bg-[#FEF3E9]"
								: ""
						} cursor-pointer smooth-animation-mid`}
					>
						{t("review")}
					</li>
				</ul>
			</div>
			<div className="w-full">{renderProductDetailsTab()}</div>
		</div>
	);
};

export default ProductInfoTab;
