import React from "react";
import { useSelector } from "react-redux";
import { selectProductDetailsData } from "../../redux/features/product/productdetailsSlice";

const SideEffect = () => {
	// Product details Selector
	const productDetailsData = useSelector(selectProductDetailsData);
	return (
		<div>
			<div
				className="ql-editor text-sm lg:text-base"
				dangerouslySetInnerHTML={{
					__html: productDetailsData?.Side_effect_en,
				}}
			/>
		</div>
	);
};

export default SideEffect;
